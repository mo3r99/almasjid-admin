export interface Student {
  id: number;
  first_name: string;
  surname: string;
  gender: string;
  dob?: string;
  date_started?: string;
  class_name: string; // From JOIN with classes table
  student_phone?: string;
  student_email?: string;
  student_login?: string;
  parent_name?: string;
  parent_phone?: string;
  parent_email?: string;
  comments?: string;
};