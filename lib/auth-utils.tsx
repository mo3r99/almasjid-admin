import React from "react";
import { auth } from "@/auth";
import { UserRole } from "@/types/auth";
import { redirect } from "next/navigation";

/**
 * Check if user has any of the required roles
 */
export function hasRole(userRoles: string[], requiredRoles: UserRole | UserRole[]): boolean {
  const required = Array.isArray(requiredRoles) ? requiredRoles : [requiredRoles];
  return required.some(role => userRoles.includes(role));
}

/**
 * Check if user has all required roles
 */
export function hasAllRoles(userRoles: string[], requiredRoles: UserRole[]): boolean {
  return requiredRoles.every(role => userRoles.includes(role));
}

/**
 * Server-side role checking function
 */
export async function requireRole(requiredRoles: UserRole | UserRole[]) {
  const session = await auth();
  
  if (!session?.user) {
    redirect('/login');
  }
  
  const userRoles = session.user.roles || [];
  
  if (!hasRole(userRoles, requiredRoles)) {
    redirect('/unauthorized');
  }
  
  return session;
}

/**
 * Higher-order component for client-side role protection
 */
export function withRoles<T extends object>(
  Component: React.ComponentType<T>,
  requiredRoles: UserRole | UserRole[]
) {
  return function ProtectedComponent(props: T) {
    // This would need to be implemented with client-side session handling
    // You might use useSession from next-auth/react
    return <Component {...props} />;
  };
}

/**
 * Role-based conditional rendering
 */
export function RoleGuard({ 
  roles, 
  children, 
  fallback = null,
  userRoles 
}: {
  roles: UserRole | UserRole[];
  children: React.ReactNode;
  fallback?: React.ReactNode;
  userRoles: string[];
}) {
  if (hasRole(userRoles, roles)) {
    return <>{children}</>;
  }
  
  return <>{fallback}</>;
}

/**
 * Navigation guard for role-based menu items
 */
export function canAccessRoute(userRoles: string[], route: string): boolean {
  const routePermissions: Record<string, UserRole[]> = {
    '/admin': ['admin'],
    '/teacher': ['admin', 'teacher'],
    '/attendance': ['admin', 'teacher'],
    '/students': ['admin', 'teacher'],
    '/classes': ['admin', 'teacher'],
    '/reports': ['admin', 'teacher'],
    '/profile': ['admin', 'teacher', 'student', 'parent'],
  };
  
  const requiredRoles = routePermissions[route];
  if (!requiredRoles) return true; // Public route
  
  return hasRole(userRoles, requiredRoles);
}