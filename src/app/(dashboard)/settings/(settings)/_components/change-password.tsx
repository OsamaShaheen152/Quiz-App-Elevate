"use client";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  ChangePasswordInput,
  changePasswordSchema,
} from "@/lib/schemes/auth.schema";
import { Check, Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useChangePassword } from "../_hooks/use-change-password";
import { toast } from "@/hooks/use-toast";
import { Toaster } from "@/components/ui/toaster";

export default function ChangePassword() {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showNewPassword, setShowNewPassword] = useState<boolean>(false);

  const form = useForm<ChangePasswordInput>({
    defaultValues: {
      oldPassword: "",
      password: "",
      rePassword: "",
    },
    resolver: zodResolver(changePasswordSchema),
  });

  const changePasswordMutaion = useChangePassword();

  const onSubmit: SubmitHandler<ChangePasswordInput> = (
    data: ChangePasswordInput,
  ) => {
    changePasswordMutaion.mutate(data, {
      onSuccess: () => {
        toast({
          description: (
            <span className="flex items-center gap-2">
              <Check className="h-4 w-4 text-green-500" />
              Your password has been updated.
            </span>
          ),
          className:
            "bg-[#1b2733] text-white border-0 rounded-md shadow-md flex items-center gap-2 px-4 py-3",
        });
      },
    });
  };
  return (
    <Form {...form}>
      <div className="flex gap-2">
        <Toaster />
      </div>
      <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
        {/* Current Password */}
        <FormField
          control={form.control}
          rules={{ required: "Current Password is required" }}
          name="oldPassword"
          render={({ field, fieldState }) => (
            <FormItem>
              <FormLabel>Current Password</FormLabel>
              <FormControl>
                <div className="relative">
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

        {/* New Password */}
        <FormField
          control={form.control}
          rules={{ required: "New Password is required" }}
          name="password"
          render={({ field, fieldState }) => (
            <FormItem>
              <FormLabel>New Password</FormLabel>
              <FormControl>
                <div className="relative">
                  <Input
                    type={showNewPassword ? "text" : "password"}
                    placeholder="*********"
                    {...field}
                    error={!!fieldState.error}
                  />

                  {/* ShowPassword */}
                  <button
                    type="button"
                    className="absolute inset-y-0 right-2 flex items-center text-gray-500 hover:text-gray-700"
                    onClick={() => setShowNewPassword((prev) => !prev)}
                  >
                    {showNewPassword ? (
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

        {/* Confirm New Password */}
        <FormField
          control={form.control}
          rules={{ required: "Confirm New Password is required" }}
          name="rePassword"
          render={({ field, fieldState }) => (
            <FormItem>
              <FormLabel>Confirm New Password</FormLabel>
              <FormControl>
                <div className="relative">
                  <Input
                    type={showNewPassword ? "text" : "password"}
                    placeholder="*********"
                    {...field}
                    error={!!fieldState.error}
                  />

                  {/* ShowPassword */}
                  <button
                    type="button"
                    className="absolute inset-y-0 right-2 flex items-center text-gray-500 hover:text-gray-700"
                    onClick={() => setShowNewPassword((prev) => !prev)}
                  >
                    {showNewPassword ? (
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

        <Button>Update Password</Button>
      </form>
    </Form>
  );
}
