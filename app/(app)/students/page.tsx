import React from "react";
import { requireRole } from "@/lib/auth-utils";
import { getAllStudentsFromDb, getTeacherStudentsFromDb } from "@/lib/db";
import StudentsView from "@/components/studentsView/StudentsView";

export default async function StudentsPage() {
  // Ensure user has teacher or admin role
  const session = await requireRole(["admin", "teacher"]);
  const isAdmin = session.user.roles.includes("admin");
  
  // Get students based on role
  const students = isAdmin 
    ? await getAllStudentsFromDb() 
    : await getTeacherStudentsFromDb(session.user.teacher_id!);

  return (
    <div className="max-w-3xl md:mx-auto px-8 my-12">
      <h1 className="text-3xl font-bold mb-6">
        {isAdmin ? "Student Management" : "My Students"}
      </h1>

      <StudentsView students={students} isAdmin={isAdmin} />
    </div>
  );
}
