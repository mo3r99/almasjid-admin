import { auth } from "@/auth";
import NavMenuItem from "@/components/navmenu/NavMenuItem";
import NavMenuAvatar from "./NavMenuAvatar";

export default async function NavMenu() {
  const session = await auth();

  if (!session?.user) return null;

  const isAdmin:boolean = session.user.roles.includes('admin');

  return (
    <nav
      className="fixed bottom-0 left-0 w-screen
        md:fixed md:top-0 md:left-0 md:h-screen md:w-20
        backdrop-blur-xl
        border-t md:border-t-0 md:border-r border-gray-200 
        font-[family-name:var(--font-figtree)]
        z-50"
      style={{
        paddingBottom: "calc(env(safe-area-inset-bottom) - 1rem)",
      }}
    >
      <ul className="flex md:flex-col justify-around md:justify-between items-center py-2 md:py-4 md:h-full">
        <div className="flex md:flex-col justify-around md:justify-start gap-4 md:gap-8">
          <NavMenuItem icon="home" />
          <NavMenuItem icon="attendance" />
          <NavMenuItem icon="students" />
          <NavMenuItem icon="classes" />
          {isAdmin && <NavMenuItem icon="teachers" />}
          {isAdmin && <NavMenuItem icon="fees" />}
          {isAdmin && <NavMenuItem icon="admin" />}
        </div>

        <NavMenuAvatar user={{name: session.user.name, email: session.user.email, avatar: session.user.image}} />
      </ul>
    </nav>
  );
}
