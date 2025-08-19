"use client";

import type React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { signIn } from "next-auth/react";
import { useState } from "react";

export default function LoginForm() {
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null); // Clear previous errors

    const formData = new FormData(e.target as HTMLFormElement);
    const data = Object.fromEntries(formData) as {
      email: string;
      password: string;
    };

    try {
      const response = await signIn("credentials", {
        
        email: data.email,
        password: data.password,
        redirect: false,
        // callbackUrl:
        //   new URLSearchParams(location.search).get("callbackUrl") ||
        //   "/diplomas",
      });

      if (response?.error) {
        setError(response.error); // Display specific error
      } else if (response?.ok) {
        // Redirect to desired page after successful login
        // In authentication use location.href to make a full page refresh be ensure the session has been saved and avoid the use of nextjs router
        location.href = "/diplomas"; // Or use Next.js router
      }
    } catch (error) {
      setError("An unexpected error occurred");
      console.error("Login error:", error);
    }
  };

  return (
    <Card className="w-full max-w-md">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl font-bold text-center">
          Sign In
        </CardTitle>
        <CardDescription className="text-center">
          Enter your credentials to access your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="email" className="text-sm font-medium">
              Email
            </label>
            <Input
              id="email"
              type="email"
              name="email"
              placeholder="Enter your email"
              className="w-full"
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="password" className="text-sm font-medium">
              Password
            </label>
            <Input
              id="password"
              type="password"
              name="password"
              placeholder="Enter your password"
              className="w-full"
            />
          </div>
          <div className="flex flex-col gap-2">
            {error && <p className="text-red-500">{error}</p>}
            <Button type="submit" className="w-full">
              Sign In
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
