import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectValue,
  SelectItem,
} from "@/components/ui/select";
import { Dispatch, SetStateAction, useState } from "react";

interface StudentFilterProps {
  value: string | undefined;
  updateFunction: Dispatch<SetStateAction<string | undefined>>;
  allValue: string;
  itemsList: string[];
  placeholder: string;
}

export default function StudentsFilter({
  value,
  updateFunction,
  allValue,
  itemsList,
  placeholder,
  className
}: React.ComponentProps<'select'> & StudentFilterProps) {
  return (
    <Select value={value} onValueChange={(v) => updateFunction(v)}>
      <SelectTrigger className={className}>
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="all">{allValue}</SelectItem>
        {itemsList.map((item) => (
          <SelectItem key={item} value={item}>
            {item}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
