import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";

import amlogo from '@/assets/logos/am_logo.png'
import { auth, signIn } from "@/auth";
import { redirect } from "next/navigation";

export default async function LoginForm() {
  const session = await auth();
  if (session) return redirect('/');
  
  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <div className={"flex flex-col gap-6"}>
          <Card>
            <CardHeader>
              <Image alt={'al masjid logo'} src={amlogo} width={100} height={100} className="mx-auto mb-4"/>
              <CardTitle>Login to your account</CardTitle>
              <CardDescription>
                Log in with your Al Masjid Microsoft account to continue
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form action={async () => {
                'use server'
                await signIn('microsoft-entra-id');
              }}>
                <div className="flex flex-col gap-6">
                  <div className="flex flex-col gap-3">
                    <Button variant="outline" className="w-full" type="submit">
                      Login with Microsoft
                    </Button>
                  </div>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
