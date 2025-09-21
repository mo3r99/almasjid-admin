export type StudentDataColumns =
  | "first_name"
  | "surname"
  | "address_line1"
  | "address_line1"
  | "city"
  | "postcode"
  | "phone_number"
  | "parent_guardian_name"
  | "parent_contact_no"
  | "parent_email"
  | "student_email"
  | "almasjid_email"
  | "class_name"
  | "comments"
  | "date_started"
  | "gender"
  | "parent_alt_contact"
  | "date_added"
  | "date_updated" | 'dob';

export type StudentDataColumnsDisplay = "First Name"
  | "Surname"
  | "Date of Birth"
  | "Address Line 1"
  | "City"
  | "Postcode"
  | "Phone Number"
  | "Parent/Guardian Name"
  | "Parent Contact Number"
  | "Parent Email"
  | "Student Email"
  | "Almasjid Email"
  | "Class Name"
  | "Comments"
  | "Date Started"
  | "Gender"
  | "Parent Alt Contact"
  | "Date Added"
  | "Date Updated";

export interface StudentDataViewColumn {
  name: StudentDataColumnsDisplay;
  database_name: StudentDataColumns;
}
