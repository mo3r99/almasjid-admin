import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  ArrowLeft,
  Mail,
  Phone,
  User,
  GraduationCap,
  MessageSquare,
} from "lucide-react";
import React from "react";
import { Student } from "@/types/students";

export default function SingleStudentView({
  studentData,
  isAdmin,
}: {
  studentData: Student;
  isAdmin: Boolean;
}) {
  return (
    <div className="max-w-4xl md:mx-auto px-8 my-12">
      {/* Header */}
      <div className="mb-6">
        <Button variant="ghost" size="sm" asChild className="mb-4">
          <Link href="/students">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Students
          </Link>
        </Button>
        <div>
          <h1 className="text-3xl font-bold">
            {studentData.first_name} {studentData.surname}
          </h1>
          <p className="text-muted-foreground">Student ID: {studentData.id}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Personal Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5" />
              Personal Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-muted-foreground">
                  First Name
                </label>
                <p className="font-medium">{studentData.first_name}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground">
                  Surname
                </label>
                <p className="font-medium">{studentData.surname}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-muted-foreground">
                  Gender
                </label>
                <div className="flex items-center gap-2">
                  <p>{studentData.gender}</p>
                </div>
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground">
                  Date of Birth
                </label>
                <p className="font-medium">
                  {studentData.dob ?? "Not Provided"}
                </p>
              </div>
            </div>

            <div>
              <label className="text-sm font-medium text-muted-foreground">
                Date Started
              </label>
              <p className="font-medium">
                {studentData.date_started ?? "Not Provided"}
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Academic Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <GraduationCap className="h-5 w-5" />
              Academic Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm font-medium text-muted-foreground">
                Class
              </label>
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="text-base">
                  {studentData.class_name || "Not assigned"}
                </Badge>
              </div>
            </div>

            <div>
              <label className="text-sm font-medium text-muted-foreground">
                Student Login
              </label>
              <p className="font-medium">
                {studentData.student_login || "Not set"}
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Contact Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Phone className="h-5 w-5" />
              Student Contact
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm font-medium text-muted-foreground">
                Phone
              </label>
              <div className="flex items-center gap-2">
                {studentData.student_phone ? (
                  <a
                    href={`tel:${studentData.student_phone}`}
                    className="font-medium text-blue-600 hover:underline"
                  >
                    {studentData.student_phone}
                  </a>
                ) : (
                  <span className="text-muted-foreground">Not provided</span>
                )}
              </div>
            </div>

            <div>
              <label className="text-sm font-medium text-muted-foreground">
                Email
              </label>
              <div className="flex items-center gap-2">
                {studentData.student_email ? (
                  <a
                    href={`mailto:${studentData.student_email}`}
                    className="font-medium text-blue-600 hover:underline flex items-center gap-1"
                  >
                    <Mail className="h-4 w-4" />
                    {studentData.student_email}
                  </a>
                ) : (
                  <span className="text-muted-foreground">Not provided</span>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Parent Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5" />
              Parent/Guardian Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm font-medium text-muted-foreground">
                Parent Name
              </label>
              <p className="font-medium">
                {studentData.parent_name || "Not provided"}
              </p>
            </div>

            <div>
              <label className="text-sm font-medium text-muted-foreground">
                Parent Phone
              </label>
              <div className="flex items-center gap-2">
                {studentData.parent_phone ? (
                  <a
                    href={`tel:${studentData.parent_phone}`}
                    className="font-medium text-blue-600 hover:underline"
                  >
                    {studentData.parent_phone}
                  </a>
                ) : (
                  <span className="text-muted-foreground">Not provided</span>
                )}
              </div>
            </div>

            <div>
              <label className="text-sm font-medium text-muted-foreground">
                Parent Email
              </label>
              <div className="flex items-center gap-2">
                {studentData.parent_email ? (
                  <a
                    href={`mailto:${studentData.parent_email}`}
                    className="font-medium text-blue-600 hover:underline flex items-center gap-1"
                  >
                    <Mail className="h-4 w-4" />
                    {studentData.parent_email}
                  </a>
                ) : (
                  <span className="text-muted-foreground">Not provided</span>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Comments */}
        {studentData.comments && (
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageSquare className="h-5 w-5" />
                Comments
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-muted/50 rounded-lg p-4">
                <p className="whitespace-pre-wrap">{studentData.comments}</p>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Quick Actions */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {isAdmin && (
                <Button variant="outline" asChild>
                  <Link href={`/students/${studentData.id}/edit`}>
                    Edit Student
                  </Link>
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
