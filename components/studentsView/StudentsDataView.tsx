import { Student } from "@/types/students";
import Link from "next/link";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { StudentDataViewColumn } from "@/types/studentView";

export default function StudentsDataView({
  students,
  columns,
}: {
  students: Student[] | null;
  columns: StudentDataViewColumn[];
}) {
  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            {columns.map((column) => (
              <TableHead key={column.database_name} className="font-bold">
                {column.name}
              </TableHead>
            ))}
            <TableHead className="font-bold text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {students?.map((student) => {
            return (
              <TableRow key={student.id} className="hover:bg-muted/50 cursor-pointer">
                {columns.map((column) => {
                  const cellValue = student[column.database_name as keyof Student];
                  
                  // Make first name clickable to go to student detail
                  if (column.database_name === 'first_name') {
                    return (
                      <TableCell key={`${student.id}${column.database_name}`}>
                        <Link 
                          href={`/students/${student.id}`}
                          className="font-medium text-blue-600 hover:text-blue-800 hover:underline"
                        >
                          {String(cellValue || '')}
                        </Link>
                      </TableCell>
                    );
                  }
                  
                  // Format gender display
                  if (column.database_name === 'gender') {
                    const genderStr = String(cellValue || '');
                    return (
                      <TableCell key={`${student.id}${column.database_name}`}>
                        {genderStr === 'M' ? 'Male' : genderStr === 'F' ? 'Female' : genderStr || '-'}
                      </TableCell>
                    );
                  }
                  
                  // Format date display
                  if (column.database_name === 'dob' || column.database_name === 'date_started') {
                    let formattedDate = 'Not set';
                    if (cellValue) {
                      try {
                        const dateValue = new Date(cellValue as string);
                        if (!isNaN(dateValue.getTime())) {
                          formattedDate = dateValue.toLocaleDateString("en-GB", {
                            day: "2-digit",
                            month: "2-digit",
                            year: "numeric"
                          });
                        }
                      } catch {
                        formattedDate = 'Invalid date';
                      }
                    }
                    return (
                      <TableCell key={`${student.id}${column.database_name}`}>
                        {formattedDate}
                      </TableCell>
                    );
                  }
                  
                  return (
                    <TableCell key={`${student.id}${column.database_name}`}>
                      {String(cellValue || '-')}
                    </TableCell>
                  );
                })}
                <TableCell className="text-right">
                  <Link 
                    href={`/students/${student.id}`}
                    className="text-sm bg-blue-100 hover:bg-blue-200 text-blue-700 px-3 py-1 rounded transition-colors"
                  >
                    View Details
                  </Link>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
      {!students && "No students found!"}
    </>
  );
}

/*
{students.map((student) => {
          return (
            <TableRow key={student.id}>
              <TableCell className="font-medium">
                {student.first_name}
              </TableCell>
              <TableCell>{student.surname}</TableCell>
              <TableCell>{student.gender}</TableCell>
              <TableCell>
                {student.dob ?? ''}
              </TableCell>
              <TableCell>
                {student.date_started ?? ''}
              </TableCell>
              <TableCell>{student.class_name}</TableCell>
            </TableRow>
          );
        })}
*/
