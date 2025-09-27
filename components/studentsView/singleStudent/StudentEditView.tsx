"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Link from "next/link";
import {
  ArrowLeft,
  Mail,
  Phone,
  User,
  GraduationCap,
  MessageSquare,
  Save,
} from "lucide-react";
import React, { useActionState, useState } from "react";
import { Student } from "@/types/students";
import { saveStudentToDb } from "@/lib/db";

export default function StudentEditView({
  studentData,
}: {
  studentData: Student;
}) {
  const [actionState, saveStudentAction, isPending] = useActionState(
    saveStudentToDb,
    null
  );

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
            Edit Student: {studentData.first_name} {studentData.surname}
          </h1>
          <p className="text-muted-foreground">Student ID: {studentData.id}</p>
        </div>
      </div>

      <form action={saveStudentAction}>
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
                  <Input
                    defaultValue={studentData.first_name}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">
                    Surname
                  </label>
                  <Input
                    placeholder="Enter surname"
                    defaultValue={studentData.surname}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-muted-foreground">
                    Gender
                  </label>
                  <Select
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select gender" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Male">Male</SelectItem>
                      <SelectItem value="Female">Female</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">
                    Date of Birth
                  </label>
                  <Input
                    type="date"
                    defaultValue={studentData.dob}
                  />
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-muted-foreground">
                  Date Started
                </label>
                <Input
                  type="date"
                />
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
                <Input
                  placeholder="Enter class name"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-muted-foreground">
                  Student Login
                </label>
                <Input
                  placeholder="Enter student login"
                />
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
                <Input
                  type="tel"
                  placeholder="Enter phone number"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-muted-foreground">
                  Email
                </label>
                <Input
                  type="email"
                  placeholder="Enter email address"
                />
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
                <Input
                  placeholder="Enter parent name"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-muted-foreground">
                  Parent Phone
                </label>
                <Input
                  type="tel"
                  placeholder="Enter parent phone"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-muted-foreground">
                  Parent Email
                </label>
                <Input
                  type="email"
                  placeholder="Enter parent email"
                />
              </div>
            </CardContent>
          </Card>

          {/* Comments */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageSquare className="h-5 w-5" />
                Comments
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Textarea
                placeholder={studentData.comments ?? "Enter comments about the student"}
                rows={4}
              />
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Actions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                <Button type="submit" className="flex items-center gap-2">
                  <Save className="h-4 w-4" />
                  Save Changes
                </Button>
                <Button variant="outline" asChild>
                  <Link href={`/students/${studentData.id}`}>Cancel</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </form>
    </div>
  );
}
