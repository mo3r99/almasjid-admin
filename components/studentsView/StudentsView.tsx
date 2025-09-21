"use client";

import { useState, useEffect, useCallback } from "react";

import { Input } from "@/components/ui/input";

import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Student } from "@/types/students";
import StudentsDataView from "./StudentsDataView";
import { StudentDataViewColumn } from "@/types/studentView";

export default function StudentsView({
  students,
  isAdmin,
}: {
  students: Student[];
  isAdmin: Boolean;
}) {
  const [searchParam, setSearchParam] = useState("");
  const [studentList, setStudentList] = useState(students as Student[] | null);

const searchStudents = useCallback((query: string) => {
    if (!query.trim()) {
        setStudentList(students);
        return;
    }
    
    const lowercaseQuery = query.toLowerCase();
    const filteredStudents = students.filter((student) => 
        student.first_name?.toLowerCase().includes(lowercaseQuery) ||
        student.surname?.toLowerCase().includes(lowercaseQuery) ||
        student.class_name?.toLowerCase().includes(lowercaseQuery)
    );
    
    setStudentList(filteredStudents.length > 0 ? filteredStudents : []);
}, [students]);

useEffect(() => {
    searchStudents(searchParam);
}, [searchParam, searchStudents]);

  const columnsToShow: StudentDataViewColumn[] = isAdmin
    ? [
        {
          name: "First Name",
          database_name: "first_name",
        },
        {
          name: "Surname",
          database_name: "surname",
        },
        {
          name: "Date of Birth",
          database_name: "dob",
        },
        {
          name: "Gender",
          database_name: "gender",
        },
        {
          name: "Class Name",
          database_name: "class_name",
        },
        {
          name: "Phone Number",
          database_name: "phone_number",
        },
        {
          name: "Comments",
          database_name: "comments",
        },
      ]
    : [
        {
          name: "First Name",
          database_name: "first_name",
        },
        {
          name: "Surname",
          database_name: "surname",
        },
        {
          name: "Date of Birth",
          database_name: "dob",
        },
        {
          name: "Gender",
          database_name: "gender",
        },
        {
          name: "Class Name",
          database_name: "class_name",
        },
        {
          name: "Phone Number",
          database_name: "phone_number",
        },
      ];
  return (
    <>
      <div className="flex gap-4 mb-6">
        <Input
          placeholder="Search"
          value={searchParam}
          onChange={(e) => setSearchParam(e.target.value)}
          className="flex-1"
        />
        <Select>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by class" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Classes</SelectItem>
            {[
              ...new Set(
                students.map((student) => student.class_name).filter(Boolean)
              ),
            ].map((className) => (
              <SelectItem key={className} value={className}>
                {className}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <StudentsDataView columns={columnsToShow} students={studentList} />
    </>
  );
}
