import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { BanIcon } from "lucide-react";

export default function UnauthorizedPage() {
  return (
    <Card className="max-w-md mx-auto my-[25vh]">
      <CardHeader>
        <CardTitle className="flex flex-row gap-2 items-center"><BanIcon width={20}/> Access Denied</CardTitle>
      </CardHeader>
      <CardContent>
        <p>You do not have permission to view this page. If you believe this is an error, please contact your administrator.</p>
      </CardContent>
      <CardFooter className="flex flex-row gap-4 w-full">
        <Link href={"/"} className="w-full">
          <Button className="w-full">Return to dashboard</Button>
        </Link>
      </CardFooter>
    </Card>
  );
}
