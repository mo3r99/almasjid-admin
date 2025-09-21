// Database schema for role management
// This would be implemented with your chosen ORM (Prisma, Drizzle, etc.)

/*
-- Users table (synced with Entra ID)
users (
  id VARCHAR PRIMARY KEY, -- Entra ID object ID
  email VARCHAR UNIQUE NOT NULL,
  name VARCHAR NOT NULL,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
)

-- Roles table
roles (
  id INTEGER PRIMARY KEY,
  name VARCHAR UNIQUE NOT NULL, -- 'admin', 'teacher', 'student', 'parent'
  description TEXT,
  permissions JSON, -- Optional: fine-grained permissions
  created_at TIMESTAMP DEFAULT NOW()
)

-- User roles linking table
user_roles (
  user_id VARCHAR REFERENCES users(id),
  role_id INTEGER REFERENCES roles(id),
  assigned_at TIMESTAMP DEFAULT NOW(),
  assigned_by VARCHAR REFERENCES users(id),
  is_active BOOLEAN DEFAULT true,
  PRIMARY KEY (user_id, role_id)
)

-- For parent-student relationships
parent_student_relationships (
  parent_user_id VARCHAR REFERENCES users(id),
  student_id INTEGER REFERENCES students(id),
  relationship_type VARCHAR DEFAULT 'parent', -- 'parent', 'guardian', etc.
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT NOW()
)
*/

export interface Role {
  id: number;
  name: string;
  description?: string;
  permissions?: Record<string, boolean>;
}

export interface UserRole {
  userId: string;
  roleId: number;
  role: Role;
  assignedAt: Date;
  isActive: boolean;
}

// Database operations (implement with your ORM)
export class RoleService {
  static async getUserRoles(userId: string): Promise<Role[]> {
    // Query user_roles joined with roles table
    // Return active roles for the user
    throw new Error("Implement with your database");
  }

  static async assignRole(userId: string, roleId: number, assignedBy: string): Promise<void> {
    // Insert into user_roles table
    throw new Error("Implement with your database");
  }

  static async removeRole(userId: string, roleId: number): Promise<void> {
    // Soft delete or remove from user_roles table
    throw new Error("Implement with your database");
  }

  static async syncUserFromEntraId(entraUser: any): Promise<void> {
    // Upsert user from Entra ID profile
    // This would be called in the JWT callback
    throw new Error("Implement with your database");
  }
}
