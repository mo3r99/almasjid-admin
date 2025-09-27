"use client";

import { useState, useEffect, useCallback } from "react";

import { Input } from "@/components/ui/input";

import { Student } from "@/types/students";
import StudentsDataView from "./StudentsDataView";
import { StudentDataViewColumn } from "@/types/studentView";
import StudentsFilter from "./StudentsFilter";

export default function StudentsView({
  students,
  isAdmin,
}: {
  students: Student[];
  isAdmin: Boolean;
}) {
  const [searchParam, setSearchParam] = useState("");
  const [studentList, setStudentList] = useState(students as Student[] | null);

  const [classFilter, setClassFilter] = useState(
    undefined as string | undefined
  );
  const [genderFilter, setGenderFilter] = useState(
    undefined as string | undefined
  );

  const searchStudents = useCallback(
    (
      query: string,
      classFilter: string | undefined,
      genderFilter: string | undefined
    ) => {
      let searchedStudents = studentList;

      if (!query.trim()) {
        setStudentList(students);
      } else {
        const lowercaseQuery = query.toLowerCase();
        searchedStudents = students.filter(
          (student) =>
            student.first_name?.toLowerCase().includes(lowercaseQuery) ||
            student.surname?.toLowerCase().includes(lowercaseQuery) ||
            student.class_name?.toLowerCase().includes(lowercaseQuery)
        );
      }

      const filteredStudents =
        searchedStudents &&
        searchedStudents
          .filter((student) => {
            if (classFilter == null || classFilter == "all") {
              return true;
            } else {
              return (
                student.class_name.toLowerCase() == classFilter?.toLowerCase()
              );
            }
          })
          .filter((student) => {
            if (genderFilter == null || genderFilter == "all") {
              return true;
            } else {
              return (
                student.gender.toLowerCase() == genderFilter?.toLowerCase()
              );
            }
          });

      setStudentList(
        filteredStudents?.length && filteredStudents.length > 0
          ? filteredStudents
          : []
      );
    },
    [students]
  );

  useEffect(() => {
    searchStudents(searchParam, classFilter, genderFilter);
  }, [searchParam, searchStudents, classFilter, genderFilter]);

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
        <StudentsFilter
          placeholder="Filter by Class"
          className="w-[180px]"
          value={classFilter}
          updateFunction={setClassFilter}
          allValue="All Classes"
          itemsList={[
            ...new Set(
              students.map((student) => student.class_name).filter(Boolean)
            ),
          ]}
        />

        <StudentsFilter
          placeholder="Filter by Gender"
          className="w-[180px]"
          value={genderFilter}
          updateFunction={setGenderFilter}
          allValue="Male and Female"
          itemsList={["Male", "Female"]}
        />
      </div>
      <StudentsDataView columns={columnsToShow} students={studentList} />
    </>
  );
}
