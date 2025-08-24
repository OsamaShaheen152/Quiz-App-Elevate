"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { signIn } from "next-auth/react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Card } from "@/components/ui/card";
import Link from "next/link";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { LoginFormValues } from "@/lib/types/auth";

export default function LoginForm() {
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const form = useForm<LoginFormValues>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<LoginFormValues> = async (
    data: LoginFormValues
  ) => {
    try {
      const response = await signIn("credentials", {
        email: data.email,
        password: data.password,
        redirect: false,
      });

      if (response?.ok) {
        // Redirect to desired page after successful login
        // In authentication use location.href to make a full page refresh be ensure the session has been saved and avoid the use of nextjs router
        location.href = "/diplomas"; // Or use Next.js router
      }

      void response; // Placeholder to avoid unused variable warning
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  return (
    <Card className="w-[450px] h-[406px] [&_*]:rounded-none shadow-none border-0 mt-10 ">
      <h1 className="text-3xl font-bold mb-6">Login</h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="space-y-4 *:font-medium *:text-sm ">
            {/* Email */}
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="you@example.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Password */}
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        type={showPassword ? "text" : "password"}
                        placeholder="*********"
                        {...field}
                      />

                      <button
                        type="button"
                        className="absolute inset-y-0 right-2 flex items-center text-gray-500 hover:text-gray-700"
                        onClick={() => setShowPassword((prev) => !prev)}
                      >
                        {showPassword ? (
                          <Eye className="h-4 w-4" />
                        ) : (
                          <EyeOff className="h-4 w-4" />
                        )}
                      </button>
                    </div>
                  </FormControl>
                </FormItem>
              )}
            />
          </div>

          {/* Forgot Password */}
          <div className="space-y-6 flex flex-col items-center">
            <div className=" mt-2 transform translate-x-36  ">
              <Link
                href="/forgot-password"
                className="text-sm text-blue-600 hover:underline "
              >
                Forgot your password?
              </Link>
            </div>

            <Button
              type="submit"
              className="w-full h-12 bg-blue-600 hover:bg-blue-700  text-white font-medium text-sm "
            >
              login
            </Button>

            <p>
              Don’t have an account?{" "}
              <Link
                href="/register"
                className="text-sm text-blue-600 hover:underline font-medium "
              >
                Create yours
              </Link>{" "}
            </p>
          </div>
        </form>
      </Form>
    </Card>
  );
}

/**  try {
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
    } */
