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
import { RegisterFormValues } from "@/lib/types/auth";
import { useRegister } from "./_hooks/use-register";

export default function RegisterFormPage() {
  const [showPassword, setShowPassword] = useState<boolean>(false);

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
  });

  const registerMutation = useRegister();

  // Handle form submission
  const onSubmit: SubmitHandler<RegisterFormValues> = async (
    data: RegisterFormValues
  ) => {
    registerMutation.mutate(data, {
      onSuccess: () => {
        console.log(data);
        location.href = "/login";
      },
    });
  };

  return (
    <Card className="w-[450px] max-h-screen [&_*]:rounded-none shadow-none border-0  ">
      <h1 className="text-3xl font-bold mb-6">Create Account</h1>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="[&_*]:text-sm [&_*]:font-medium space-y-4"
        >
          <div className="space-y-4 *:font-medium *:text-sm ">
            {/* Name */}
            <div className="grid grid-cols-2 gap-4">
              {/* FirstName */}
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>First Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Osama" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* LastName */}
              <FormField
                control={form.control}
                name="lastName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Last Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Shaheen" {...field} />
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
              render={({ field }) => (
                <FormItem>
                  <FormLabel>User Name</FormLabel>
                  <FormControl>
                    <Input placeholder="your_username" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

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

            {/* Phone */}
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="(123) 456-7890"
                      {...field}
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
                </FormItem>
              )}
            />

            {/* Confirm Password */}
            <FormField
              control={form.control}
              name="rePassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm Password</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        type={showPassword ? "text" : "password"}
                        placeholder="*********"
                        {...field}
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
                </FormItem>
              )}
            />
          </div>

          <div className="flex flex-col gap-4 items-center">
            <Button
              type="submit"
              className="w-full h-12 bg-blue-600 hover:bg-blue-700  text-white font-medium text-sm "
            >
              Create Account
            </Button>

            <p>
              Already have an account?{" "}
              <Link
                href="/login"
                className="text-sm text-blue-600 hover:underline font-medium "
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
