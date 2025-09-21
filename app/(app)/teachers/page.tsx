import { auth } from "@/auth";
import { redirect } from "next/navigation";
import React from "react";

async function TeachersPage() {
  const session = await auth();
  if (!session || !session?.user.roles.includes("admin"))
    return redirect("/unauthorised");

  
  return <div>Teachers Page</div>;
}

export default TeachersPage;
