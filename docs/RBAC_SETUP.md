# Role-Based Access Control with Auth.js and Microsoft Entra ID

## Overview
This implementation provides role-based access control (RBAC) for your attendance marking web app using Auth.js with Microsoft Entra ID.

## Setup Instructions

### Option 1: Using Microsoft Entra ID App Roles (Recommended)

#### 1. Configure App Roles in Azure Portal
1. Go to [Azure Portal](https://portal.azure.com) → App Registrations → Your App
2. Navigate to "App roles"
3. Create the following app roles:

```json
{
  "allowedMemberTypes": ["User"],
  "description": "Administrator with full system access",
  "displayName": "Admin",
  "id": "unique-guid-1",
  "isEnabled": true,
  "value": "admin"
}

{
  "allowedMemberTypes": ["User"],
  "description": "Teacher who can mark attendance and view reports",
  "displayName": "Teacher",
  "id": "unique-guid-2",
  "isEnabled": true,
  "value": "teacher"
}

{
  "allowedMemberTypes": ["User"],
  "description": "Student who can view their own attendance",
  "displayName": "Student",
  "id": "unique-guid-3",
  "isEnabled": true,
  "value": "student"
}

{
  "allowedMemberTypes": ["User"],
  "description": "Parent who can view their child's attendance",
  "displayName": "Parent",
  "id": "unique-guid-4",
  "isEnabled": true,
  "value": "parent"
}
```

#### 2. Assign Users to Roles
1. Go to Enterprise Applications → Your App → Users and groups
2. Add users and assign them appropriate roles

#### 3. Update Token Configuration
In your app registration:
1. Go to "Token configuration"
2. Add optional claim for "roles"
3. Ensure roles are included in ID tokens

### Option 2: Database-Based Role Management

If you prefer to manage roles in your database:

1. Implement the database schema from `lib/roles.ts`
2. Update the JWT callback to fetch roles from your database
3. Create admin interface for role assignment

## Environment Variables

Add these to your `.env.local`:

```env
# Microsoft Entra ID
AUTH_MICROSOFT_ENTRA_ID_ID=your-client-id
AUTH_MICROSOFT_ENTRA_ID_SECRET=your-client-secret
AUTH_MICROSOFT_ENTRA_ID_ISSUER=https://login.microsoftonline.com/your-tenant-id/v2.0

# NextAuth
NEXTAUTH_SECRET=your-secret-key
NEXTAUTH_URL=http://localhost:3000
```

## Usage Examples

### Server-Side Role Protection
```tsx
import { requireRole } from '@/lib/auth-utils';

export default async function AdminPage() {
  const session = await requireRole('admin');
  return <div>Admin only content</div>;
}
```

### Client-Side Role-Based Rendering
```tsx
import { useSession } from 'next-auth/react';
import { RoleGuard } from '@/lib/auth-utils';

export default function Dashboard() {
  const { data: session } = useSession();
  
  return (
    <div>
      <RoleGuard 
        roles={['admin', 'teacher']} 
        userRoles={session?.user?.roles || []}
      >
        <TeacherOnlyComponent />
      </RoleGuard>
    </div>
  );
}
```

### Route Protection in Middleware
The middleware automatically protects routes based on the configuration in `auth.ts`.

### API Route Protection
```tsx
import { auth } from '@/auth';
import { hasRole } from '@/lib/auth-utils';

export async function POST(request: Request) {
  const session = await auth();
  
  if (!session || !hasRole(session.user.roles, 'admin')) {
    return Response.json({ error: 'Unauthorized' }, { status: 403 });
  }
  
  // Admin-only logic here
}
```

## Role Hierarchy

```
admin
├── Full system access
├── User management
├── Role assignment
└── All teacher/student/parent permissions

teacher
├── Mark attendance
├── View reports
├── Manage assigned classes
└── View student information

student
├── View own attendance
├── View own profile
└── Access student portal

parent
├── View child's attendance
├── View child's reports
└── Communication with teachers
```

## Testing Roles

1. **Development**: Create test users in your Entra ID tenant with different roles
2. **Automated Testing**: Mock the session object with different role combinations
3. **Manual Testing**: Use different user accounts to verify access controls

## Security Considerations

1. **Token Validation**: Roles are validated on every request
2. **Role Changes**: Users need to re-authenticate to see new roles
3. **Principle of Least Privilege**: Grant minimum necessary permissions
4. **Audit Logging**: Consider logging role-based access attempts

## Troubleshooting

### Roles not appearing in token
- Check token configuration in Azure Portal
- Verify users are assigned to app roles
- Ensure roles claim is included in ID tokens

### TypeScript errors
- Import type definitions from `types/auth.ts`
- Ensure JSX files use `.tsx` extension

### Middleware issues
- Check route patterns in `config.matcher`
- Verify callback order in auth configuration

## Next Steps

1. Implement database schema for additional user data
2. Create admin interface for role management  
3. Add fine-grained permissions within roles
4. Implement parent-student relationship management
5. Add audit logging for security monitoring
