import React from 'react';
import Link from 'next/link';
import { auth } from '@/auth';
import { canAccessRoute } from '@/lib/auth-utils';

interface NavItem {
  href: string;
  label: string;
  icon?: React.ReactNode;
  requiredRoles?: string[];
}

const navigationItems: NavItem[] = [
  {
    href: '/',
    label: 'Dashboard',
    requiredRoles: ['admin', 'teacher', 'student', 'parent'],
  },
  {
    href: '/students',
    label: 'Students',
    requiredRoles: ['admin', 'teacher'],
  },
  {
    href: '/classes',
    label: 'Classes',
    requiredRoles: ['admin', 'teacher'],
  },
  {
    href: '/attendance',
    label: 'Attendance',
    requiredRoles: ['admin', 'teacher'],
  },
  {
    href: '/reports',
    label: 'Reports',
    requiredRoles: ['admin', 'teacher'],
  },
  {
    href: '/admin',
    label: 'Administration',
    requiredRoles: ['admin'],
  },
];

export default async function RoleBasedNavigation() {
  const session = await auth();
  const userRoles = session?.user?.roles || [];

  // Filter navigation items based on user roles
  const visibleItems = navigationItems.filter(item => {
    if (!item.requiredRoles) return true;
    return item.requiredRoles.some(role => userRoles.includes(role));
  });

  return (
    <nav className="space-y-1">
      {visibleItems.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className="flex items-center px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-md transition-colors"
        >
          {item.icon && <span className="mr-3">{item.icon}</span>}
          {item.label}
        </Link>
      ))}
    </nav>
  );
}

// Client-side version using useSession
export function ClientRoleBasedNavigation() {
  // This would use useSession from next-auth/react
  // Implementation depends on your client-side needs
  return (
    <div>
      <p>Client-side navigation would go here using useSession hook</p>
    </div>
  );
}
