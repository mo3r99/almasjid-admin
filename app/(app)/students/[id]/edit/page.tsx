import { getStudentDetailsFromDb } from "@/lib/db";
import React from "react";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import ErrorView from "@/components/dataView/ErrorView";
import StudentEditView from "@/components/studentsView/singleStudent/StudentEditView";

export default async function StudentEditPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const id = (await params).id;

  // Ensure user has permissions
  const session = await auth();
  if (!session) return redirect("/login");
  const isAdmin = session.user.roles.includes("admin");
  if (!isAdmin) return redirect("/unauthorised");

  try {
    const studentData = await getStudentDetailsFromDb(
      parseInt(id),
      isAdmin,
      !isAdmin && session.user.teacher_id ? session.user.teacher_id : -1
    );

    return (
      <StudentEditView
        studentData={studentData}
      />
    );
  } catch (error) {
    return <ErrorView backLink="/students" name="student" />;
  }
}
