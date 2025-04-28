import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import RegisterForm from "@/components/forms/registerForm";
import Link from "next/link";
export default function Register() {
  return (
    <React.Fragment>
      <div className="min-h-screen flex items-center justify-center">
        <Card className="w-full max-w-md shadow-xl">
          <CardHeader>
            <CardTitle>Register</CardTitle>
          </CardHeader>
          <CardContent>
            <RegisterForm />
          </CardContent>
          <CardFooter>
            <p className="text-sm text-muted-foreground mr-2">
              Already have an account?
            </p>
            <Link
              href="/login"
              className="text-sm font-medium text-primary hover:underline"
            >
              Login
            </Link>
          </CardFooter>
        </Card>
      </div>
    </React.Fragment>
  );
}
