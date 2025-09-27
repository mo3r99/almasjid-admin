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
import { DataViewColumn } from "@/types/dataView";

export default function DataView<T extends { id: string | number }>({
  data,
  columns,
  page,
}: {
  data: T[] | null;
  columns: DataViewColumn[];
  page: string;
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
          {data?.map((data) => {
            return (
              <TableRow
                key={data.id}
                className="hover:bg-muted/50 cursor-pointer"
              >
                {columns.map((column) => {
                  const cellValue = data[column.database_name as keyof T];

                  // Make first name clickable to go to student detail
                  if (
                    column.database_name === "first_name" ||
                    column.database_name == "class_name"
                  ) {
                    return (
                      <TableCell key={`${data.id}${column.database_name}`}>
                        <Link
                          href={`/students/${data.id}`}
                          className="font-medium text-blue-600 hover:text-blue-800 hover:underline"
                        >
                          {String(cellValue || "")}
                        </Link>
                      </TableCell>
                    );
                  }

                  // Format date display
                  if (
                    column.database_name === "dob" ||
                    column.database_name.includes("date")
                  ) {
                    let formattedDate = "Not set";
                    if (cellValue) {
                      try {
                        const dateValue = new Date(cellValue as string);
                        if (!isNaN(dateValue.getTime())) {
                          formattedDate = dateValue.toLocaleDateString(
                            "en-GB",
                            {
                              day: "2-digit",
                              month: "2-digit",
                              year: "numeric",
                            }
                          );
                        }
                      } catch {
                        formattedDate = "Invalid date";
                      }
                    }
                    return (
                      <TableCell key={`${data.id}${column.database_name}`}>
                        {formattedDate}
                      </TableCell>
                    );
                  }

                  return (
                    <TableCell key={`${data.id}${column.database_name}`}>
                      {String(cellValue || "-")}
                    </TableCell>
                  );
                })}
                <TableCell className="text-right">
                  <Link
                    href={`/${page}/${data.id}`}
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
      {!data && "No students found!"}
    </>
  );
}
