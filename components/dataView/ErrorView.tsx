import React from 'react'

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  ArrowLeft,
} from "lucide-react";


export default function ErrorView({
    name,
    backLink
}: {
    name: string;
    backLink: string;
}) {
  return (
      <div className="max-w-4xl md:mx-auto px-8 my-12">
        {/* Header */}
        <div className="mb-6">
          <Button variant="ghost" size="sm" asChild className="mb-4">
            <Link href={backLink}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to {name}s
            </Link>
          </Button>
          <h1 className="text-3xl font-bold">{name.substring(0,1).toUpperCase()}{name.substring(1)} Not Found</h1>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Could not find {name}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="">
              This {name} could not be found or you may not have
              permission to view their details.
            </p>
          </CardContent>
        </Card>
      </div>
    );
}
