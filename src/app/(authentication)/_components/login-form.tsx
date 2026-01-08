"use client";
import { useEffect, useState } from "react";
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
import { Card } from "@/components/ui/card";
import { Eye, EyeOff, XCircle } from "lucide-react";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { SubmitHandler, useForm } from "react-hook-form";
import { LoginFormInput, loginSchema } from "@/lib/schemes/auth.schema";
import { zodResolver } from "@hookform/resolvers/zod";

export default function LoginForm() {
  // State to toggle password visibility
  const [showPassword, setShowPassword] = useState<boolean>(false);

  // Initialize the form
  const form = useForm<LoginFormInput>({
    mode: "onSubmit",
    reValidateMode: "onChange",
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: zodResolver(loginSchema),
  });

  // Form submit handler
  const onSubmit: SubmitHandler<LoginFormInput> = async (
    data: LoginFormInput,
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
        location.href = "/exams"; // Or use Next.js router
      }
    } catch (error) {
      void error;
    }
  };

  // Auto focus email input on mount
  useEffect(() => {
    setTimeout(() => form.setFocus("email"), 0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Card className="m-auto h-authForms w-80 border-0 p-4 shadow-none md:w-96 xl:m-0 xl:mt-10 xl:w-authForms [&_*]:rounded-none">
      <h1 className="mb-6 text-3xl font-bold">Login</h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="space-y-4 *:text-sm *:font-medium">
            {/* Email */}
            <FormField
              control={form.control}
              name="email"
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
            <div className="mt-2 translate-x-16 xl:translate-x-36">
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
