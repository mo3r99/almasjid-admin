"use server";

import { Student } from "@/types/students";
import { neon } from "@neondatabase/serverless";
import { formatDateMonthYear, formatDateShort, formatPhoneNumber } from "./utils";

/**
 * Get admins from DB
 */
export async function getAdminEmailsFromDb(): Promise<string[]> {
  const sql = neon(process.env.DATABASE_URL ?? " ");

  const response = await sql`SELECT almasjid_login FROM admins;`;
  const responseArray: string[] = response.map((row) => row.almasjid_login);
  return responseArray;
}

/**
 * Get teacher's ID from their email
 */
export async function getTeacherIdFromEmail(teacher_email: string) {
  const sql = neon(process.env.DATABASE_URL ?? "");

  const username = teacher_email.split("@")[0];
  const email1 = `${username}@almasjid.co.uk`;
  const email2 = `${username}@almasjidedu.co.uk`;
  const response =
    await sql`SELECT id FROM teachers WHERE almasjid_login = ${email1} OR almasjid_login = ${email2};`;

  return response[0].id;
}

/**
 * Get all students from DB - Admin only
 */
export async function getAllStudentsFromDb() {
  const sql = neon(process.env.DATABASE_URL ?? "");

  const response =
    await sql`SELECT students.id, first_name, surname, gender, dob, date_started, phone_number, classes.display_name FROM students JOIN classes ON students.class_id = classes.id;`;

  const students: Student[] = response.map((row) => {
    return {
      id: row.id,
      first_name: row.first_name,
      surname: row.surname,
      gender: row.gender == "M" ? "Male" : "Female",
      phone_number: row.phone_number && formatPhoneNumber(row.phone_number),
      dob: row.dob?.toLocaleDateString("en-gb", {
        day: "numeric",
        year: "numeric",
        month: "numeric",
      }),
      date_started: row.date_started?.toLocaleDateString("en-gb", {
        year: "numeric",
        month: "short",
      }),
      class_name: row.display_name,
    };
  });
  return students;
}

/**
 * Get teacher's students from DB
 */
export async function getTeacherStudentsFromDb(teacher_id: number) {
  const sql = neon(process.env.DATABASE_URL ?? "");

  const response =
    await sql`SELECT students.id, first_name, surname, gender, dob, date_started, classes.display_name, phone_number FROM students JOIN classes ON students.class_id = classes.id JOIN teacher_classes ON classes.id = teacher_classes.class_id WHERE teacher_classes.teacher_id = ${teacher_id}`;

  const students: Student[] = response.map((row) => {
    return {
      id: row.id,
      first_name: row.first_name,
      surname: row.surname,
      gender: row.gender == "M" ? "Male" : "Female",
      phone_number: row.phone_number && formatPhoneNumber(row.phone_number),
      dob: row.dob?.toLocaleDateString("en-gb", {
        day: "numeric",
        year: "numeric",
        month: "numeric",
      }),
      date_started: row.date_started?.toLocaleDateString("en-gb", {
        year: "numeric",
        month: "short",
      }),
      class_name: row.display_name,
    };
  });
  return students;
}

/**
 * Get details of a student with class information
 */
export async function getStudentDetailsFromDb(id: number): Promise<Student> {
  const sql = neon(process.env.DATABASE_URL ?? "");

  const response = await sql`
        SELECT 
            students.*,
            classes.display_name as class_name
        FROM students 
        LEFT JOIN classes ON students.class_id = classes.id 
        WHERE students.id = ${id}
    `;

  if (response.length === 0) {
    throw new Error(`Student with id ${id} not found`);
  }

  const studentDetails: Student = {
    id: response[0].id,
    first_name: response[0].first_name,
    surname: response[0].surname,
    gender: response[0].gender == 'M' ? 'Male' : 'Female',
    dob: response[0].dob && formatDateShort(response[0].dob),
    date_started: response[0].date_started && formatDateMonthYear(response[0].date_started),
    class_name: response[0].class_name, // From JOIN with classes table
    student_phone: response[0].student_phone && formatPhoneNumber(response[0].student_phone),
    student_email: response[0].student_email,
    student_login: response[0].student_login,
    parent_name: response[0].parent_name,
    parent_phone: response[0].parent_phone,
    parent_email: response[0].parent_email,
    comments: response[0].comments,
  };

  return studentDetails;
}
