import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/auth';
import { hasRole } from '@/lib/auth-utils';

// GET /api/users/[userId]/roles - Get user roles
export async function GET(
  request: NextRequest,
  { params }: { params: { userId: string } }
) {
  try {
    const session = await auth();
    
    // Only admins can view other users' roles
    if (!session?.user || !hasRole(session.user.roles, 'admin')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
    }

    const { userId } = params;

    // TODO: Implement with your database
    // const userRoles = await RoleService.getUserRoles(userId);
    
    return NextResponse.json({ 
      userId,
      roles: [], // Replace with actual roles from database
      message: 'Implement with your database service'
    });
  } catch (error) {
    console.error('Error fetching user roles:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// POST /api/users/[userId]/roles - Assign role to user
export async function POST(
  request: NextRequest,
  { params }: { params: { userId: string } }
) {
  try {
    const session = await auth();
    
    // Only admins can assign roles
    if (!session?.user || !hasRole(session.user.roles, 'admin')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
    }

    const { userId } = params;
    const { roleId } = await request.json();

    if (!roleId) {
      return NextResponse.json(
        { error: 'Role ID is required' },
        { status: 400 }
      );
    }

    // TODO: Implement with your database
    // await RoleService.assignRole(userId, roleId, session.user.id);

    return NextResponse.json({ 
      message: 'Role assigned successfully',
      userId,
      roleId
    });
  } catch (error) {
    console.error('Error assigning role:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// DELETE /api/users/[userId]/roles/[roleId] - Remove role from user
export async function DELETE(
  request: NextRequest,
  { params }: { params: { userId: string; roleId: string } }
) {
  try {
    const session = await auth();
    
    // Only admins can remove roles
    if (!session?.user || !hasRole(session.user.roles, 'admin')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
    }

    const { userId, roleId } = params;

    // TODO: Implement with your database
    // await RoleService.removeRole(userId, parseInt(roleId));

    return NextResponse.json({ 
      message: 'Role removed successfully',
      userId,
      roleId
    });
  } catch (error) {
    console.error('Error removing role:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
