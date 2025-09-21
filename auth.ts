import NextAuth from "next-auth";
import MicrosoftEntraID from "next-auth/providers/microsoft-entra-id";
import { Provider } from "next-auth/providers";
import "./types/auth";
import { getAdminEmailsFromDb, getTeacherIdFromEmail } from "./lib/db";

// export const { handlers, signIn, signOut, auth } = NextAuth({
//   providers: [
//     MicrosoftEntraID({
//       clientId: process.env.AUTH_MICROSOFT_ENTRA_ID_ID,
//       clientSecret: process.env.AUTH_MICROSOFT_ENTRA_ID_SECRET,
//       issuer: process.env.AUTH_MICROSOFT_ENTRA_ID_ISSUER,
//     }),
//   ],

// });

const providers: Provider[] = [
  MicrosoftEntraID({
    clientId: process.env.AUTH_MICROSOFT_ENTRA_ID_ID,
    clientSecret: process.env.AUTH_MICROSOFT_ENTRA_ID_SECRET,
    issuer: process.env.AUTH_MICROSOFT_ENTRA_ID_ISSUER,
  }),
];

export const providerMap = providers
  .map((provider) => {
    if (typeof provider === "function") {
      const providerData = provider();
      return { id: providerData.id, name: providerData.name };
    } else {
      return { id: provider.id, name: provider.name };
    }
  })
  .filter((provider) => provider.id !== "credentials");

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers,
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async jwt({ token, account, profile }) {
      // Add roles to token when user signs in
      if (account && profile) {
        // Get admins from DB and check if user is admin, otherwise they are a teacher
        const admins = await getAdminEmailsFromDb();
        const adminUsernames = admins.map(email => email.split('@')[0]);
        
        if (profile.email && adminUsernames.includes(profile.email?.split('@')[0])) {
          token.roles = ['admin'];
          // Admins might also have a teacher_id if they teach classes
          try {
            const teacher_id = await getTeacherIdFromEmail(profile.email ?? '');
            token.teacher_id = teacher_id;
          } catch (error) {
            // Admin might not be in teachers table, that's okay
            console.log('Admin not found in teachers table:', profile.email);
          }
        } else {
          token.roles = ['teacher'];
          const teacher_id = await getTeacherIdFromEmail(profile.email ?? '');
          token.teacher_id = teacher_id;
        }
        
        token.email = profile.email;
        token.name = profile.name;
      }
      return token;
    },
    async session({ session, token }) {
      // Add roles and teacher_id to session
      if (token.roles) {
        session.user.roles = token.roles as string[];
      }
      if (token.teacher_id) {
        session.user.teacher_id = token.teacher_id as number;
      }
      return session;
    },
    authorized: async ({ auth, request }) => {
      //const { pathname } = request.nextUrl;
      
      // Logged in users are authenticated, otherwise redirect to login page
      if (!auth) return false; else return true;
      
      // // Role-based route protection
      // const userRoles = auth.user?.roles || [];
      
      // // Admin routes
      // if (pathname.startsWith('/admin')) {
      //   return userRoles.includes('admin');
      // }
      
      // // Teacher routes
      // if (pathname.startsWith('/teacher') || pathname.startsWith('/attendance')) {
      //   return userRoles.includes('admin') || userRoles.includes('teacher');
      // }
      
      // // Student routes
      // if (pathname.startsWith('/student')) {
      //   return userRoles.includes('admin') || 
      //          userRoles.includes('teacher') || 
      //          userRoles.includes('student');
      // }
      
      // Default: allow authenticated users
      return true;
    },
  },
});
