import { auth } from "@/auth";
import { redirect } from "next/navigation";
import React from "react";

async function FeesPage() {
  const session = await auth();
  if (!session || !session?.user.roles.includes("admin"))
    return redirect("/unauthorised");

  return <div>Fees Page</div>;
}

export default FeesPage;
