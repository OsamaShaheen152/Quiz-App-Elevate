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
import { SubmitHandler, useForm } from "react-hook-form";
import { Card } from "@/components/ui/card";
import Link from "next/link";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { useRegister } from "../_hooks/use-register";
import { RegisterFormValues, registerSchema } from "@/lib/schemes/auth.schema";
import { zodResolver } from "@hookform/resolvers/zod";
// import { validatePhoneNumber } from "../_utils/validate-phone";

export default function RegisterForm() {
  // States
  const [showPassword, setShowPassword] = useState<boolean>(false);

  // Form
  const form = useForm<RegisterFormValues>({
    defaultValues: {
      username: "",
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      rePassword: "",
      phone: "",
    },
    resolver: zodResolver(registerSchema),
  });

  // Mutations
  const registerMutation = useRegister();

  // Handle form submission
  const onSubmit: SubmitHandler<RegisterFormValues> = async (
    data: RegisterFormValues,
  ) => {
    registerMutation.mutate(data, {
      onSuccess: () => {
        form.reset();
        location.href = "/login";
      },
    });
  };

  return (
    <Card className="m-auto min-h-screen w-80 border-0 py-6 shadow-none md:w-96 xl:m-0 xl:w-authForms [&_*]:rounded-none">
      <h1 className="mb-6 text-3xl font-bold">Create Account</h1>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-3 [&_*]:text-sm [&_*]:font-medium"
        >
          <div className="space-y-3 *:text-sm *:font-medium">
            {/* Name */}
            <div className="grid grid-cols-2 gap-4">
              {/* FirstName */}
              <FormField
                control={form.control}
                name="firstName"
                render={({ field, fieldState }) => (
                  <FormItem>
                    {/* Label */}
                    <FormLabel>First Name</FormLabel>
                    <FormControl>
                      {/* Input */}
                      <Input
                        placeholder="Osama"
                        {...field}
                        error={!!fieldState.error}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* LastName */}
              <FormField
                control={form.control}
                name="lastName"
                render={({ field, fieldState }) => (
                  <FormItem>
                    {/* Label */}
                    <FormLabel>Last Name</FormLabel>
                    <FormControl>
                      {/* Input */}
                      <Input
                        placeholder="Shaheen"
                        {...field}
                        error={!!fieldState.error}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* UserName */}
            <FormField
              control={form.control}
              name="username"
              render={({ field, fieldState }) => (
                <FormItem>
                  {/* Label */}
                  <FormLabel>User Name</FormLabel>
                  <FormControl>
                    {/* Input */}
                    <Input
                      placeholder="your_username"
                      {...field}
                      error={!!fieldState.error}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Email */}
            <FormField
              control={form.control}
              name="email"
              render={({ field, fieldState }) => (
                <FormItem>
                  {/* Label */}
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    {/* Input */}
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

            {/* Phone */}
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  {/* Label */}
                  <FormLabel>Phone</FormLabel>
                  <FormControl>
                    {/* Input */}
                    <Input placeholder="01020304050" {...field} />
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
                  {/* Label */}
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <div className="relative">
                      {/* Input */}
                      <Input
                        type={showPassword ? "text" : "password"}
                        placeholder="*********"
                        {...field}
                        error={!!fieldState.error}
                      />

                      {/* ShowPassword */}
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

            {/* Confirm Password */}
            <FormField
              control={form.control}
              name="rePassword"
              render={({ field, fieldState }) => (
                <FormItem>
                  {/* Label */}
                  <FormLabel>Confirm Password</FormLabel>
                  <FormControl>
                    <div className="relative">
                      {/* Input */}
                      <Input
                        type={showPassword ? "text" : "password"}
                        placeholder="*********"
                        {...field}
                        error={!!fieldState.error}
                      />

                      {/* ShowPassword */}
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

          <div className="flex flex-col items-center gap-4">
            <Button
              type="submit"
              disabled={registerMutation.status === "pending"}
            >
              Create Account
            </Button>

            {/* Login */}
            <p>
              Already have an account?{" "}
              <Link
                href="/login"
                className="text-sm font-medium text-blue-600 hover:underline"
              >
                Login
              </Link>{" "}
            </p>
          </div>
        </form>
      </Form>
    </Card>
  );
}
