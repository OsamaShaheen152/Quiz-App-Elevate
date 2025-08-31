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
import { useEffect, useState } from "react";
import { Eye, EyeOff, XCircle } from "lucide-react";
import { LoginFormValues } from "@/lib/types/auth";

export default function LoginForm() {
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const form = useForm<LoginFormValues>({
    mode: "onSubmit",
    reValidateMode: "onChange",
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<LoginFormValues> = async (
    data: LoginFormValues,
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

  useEffect(() => {
    setTimeout(() => form.setFocus("email"), 0);
  }, []);

  return (
    <Card className="w-authForms h-authFroms mt-10 border-0 shadow-none [&_*]:rounded-none">
      <h1 className="mb-6 text-3xl font-bold">Login</h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="space-y-4 *:text-sm *:font-medium">
            {/* Email */}
            <FormField
              control={form.control}
              name="email"
              rules={{
                required: "Your email is required",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Please enter a valid email address",
                },
              }}
              render={({ field, fieldState }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="you@example.com"
                      {...field}
                      error={!!fieldState.error}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Password */}
            <FormField
              control={form.control}
              name="password"
              rules={{
                required: "Your password is required",
              }}
              render={({ field, fieldState }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        type={showPassword ? "text" : "password"}
                        placeholder="*********"
                        {...field}
                        error={!!fieldState.error}
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
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Forgot Password */}
          <div className="flex flex-col items-center space-y-6">
            <div className="mt-2 translate-x-36 transform">
              <Link
                href="/forgot-password"
                className="text-sm text-blue-600 hover:underline"
              >
                Forgot your password?
              </Link>
            </div>

            {Object.keys(form.formState.errors).length > 0 && (
              <FormMessage className="relative w-full border border-red-600 bg-red-50 py-2 text-center text-sm font-normal">
                <div className="absolute -top-2 left-1/2 -translate-x-1/2 transform bg-white">
                  <XCircle className="h-4 w-4" />
                </div>
                Something Went Wrong
              </FormMessage>
            )}

            <Button type="submit">login</Button>

            <p>
              Don’t have an account?{" "}
              <Link
                href="/register"
                className="text-sm font-medium text-blue-600 hover:underline"
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
