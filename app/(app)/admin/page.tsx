import { auth } from "@/auth";
import { redirect } from "next/navigation";
import React from "react";

async function AdminPage() {
  const session = await auth();
  if (!session || !session?.user.roles.includes("admin"))
    return redirect("/unauthorised");

  return <div>Admin Page</div>;
}

export default AdminPage;
