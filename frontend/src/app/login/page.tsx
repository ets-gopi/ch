import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import LoginForm from "@/components/forms/loginForm";
import Link from "next/link";
export default function Login() {
  return (
    <React.Fragment>
      <div className="min-h-screen flex items-center justify-center">
        <Card className="w-full max-w-md shadow-xl">
          <CardHeader>
            <CardTitle>Login</CardTitle>
          </CardHeader>
          <CardContent>
            <LoginForm />
          </CardContent>
          <CardFooter>
            <p className="text-sm text-muted-foreground mr-2">
              Don&apos;t have an account?
            </p>
            <Link
              href="/register"
              className="text-sm font-medium text-primary hover:underline"
            >
              Register
            </Link>
          </CardFooter>
        </Card>
      </div>
    </React.Fragment>
  );
}
