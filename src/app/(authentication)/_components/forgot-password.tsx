"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { REGEXP_ONLY_DIGITS_AND_CHARS } from "input-otp";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { Eye, EyeOff, MoveLeft, MoveRight } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useForgotPassword } from "../_hooks/use-forgot-password";
import { useVerifyResetCode } from "../_hooks/use-verify-reset-code";

type ForgotPasswordFormValues = {
  email: string;
  password: string;
  rePassword: string;
  code: string;
};

export default function ForgotPassword() {
  const [currentStep, setCurrentStep] = useState(1);
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const handleNextStep = () => {
    setCurrentStep((prev) => prev + 1);
  };

  const handlePrevStep = () => {
    setCurrentStep((prev) => prev - 1);
  };

  const form = useForm<ForgotPasswordFormValues>({
    defaultValues: {
      email: "",
      password: "",
      rePassword: "",
      code: "",
    },
  });

  const forgotPasswordMutation = useForgotPassword();
  const verifyResetCodeMutation = useVerifyResetCode();

  const emailMutationHandler = (email: string) => {
    forgotPasswordMutation.mutate(email);
    console.log(email);
  };

  // Submit handler
  const onSubmit: SubmitHandler<ForgotPasswordFormValues> = (
    data: ForgotPasswordFormValues,
  ) => {
    if (currentStep === 1) {
      forgotPasswordMutation.mutate(data.email, {
        onSuccess: () => {
          handleNextStep();
        },
      });
    } else if (currentStep === 2) {
      verifyResetCodeMutation.mutate(data.code, {
        onSuccess: () => {
          handleNextStep();
        },
        onError: (error) => {
          console.error("OTP verification failed:", error);
          form.setError("code", { message: "Invalid otp code" });
        },
      });
    }
  };

  return (
    <div className="mt-24 h-authForms w-authForms space-y-4">
      {/* Forgot password */}
      {currentStep === 1 && (
        <div className="flex flex-col gap-10">
          <div className="flex flex-col gap-2">
            <h1 className="text-3xl font-bold">Forgot Password</h1>
            <p className="text-base font-normal text-gray-500">
              Don’t worry, we will help you recover your account.
            </p>
          </div>

          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="flex flex-col gap-4"
            >
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
                render={({ field }) => (
                  <FormItem className="flex flex-col gap-2">
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="Enter your email"
                        {...field}
                      />
                      {/* Your form field */}
                    </FormControl>
                    <FormDescription />
                    <FormMessage className="translate-y-[-20px] transform" />
                  </FormItem>
                )}
              />

              {/* Send email  */}
              <Button
                type="submit"
                onClick={() => {
                  emailMutationHandler(form.watch("email"));
                }}
              >
                <span>Continue</span> <MoveRight />
              </Button>
            </form>
          </Form>

          {/* Register */}
          <div className="flex items-center justify-center gap-2">
            <p>Don’t have an account? </p>
            <Link
              href="/register"
              className="text-sm text-blue-600 hover:underline"
            >
              Create yours
            </Link>
          </div>
        </div>
      )}

      {/* Verify OTP */}
      {currentStep === 2 && (
        <div className="flex flex-col gap-8">
          <Button
            className="h-10 w-10 border border-gray-200 bg-transparent text-black hover:text-white"
            onClick={handlePrevStep}
          >
            <MoveLeft />
          </Button>

          <div className="flex flex-col gap-2">
            <h1 className="text-3xl font-bold">Verify OTP</h1>
            <p className="text-base font-normal text-gray-500">
              Please enter the 6-digit code we sent to: {form.watch("email")}
            </p>
          </div>

          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="flex flex-col gap-4"
            >
              <FormField
                control={form.control}
                name="code"
                rules={{
                  required: "OTP code is required",
                  minLength: {
                    value: 6,
                    message: "OTP must be 6 digits",
                  },
                }}
                render={({ field }) => (
                  <FormItem className="flex flex-col items-center gap-6">
                    <FormControl>
                      <InputOTP
                        maxLength={6}
                        pattern={REGEXP_ONLY_DIGITS_AND_CHARS}
                        value={field.value}
                        onChange={(value) => field.onChange(value)}
                      >
                        <InputOTPGroup>
                          <InputOTPSlot index={0} />
                          <InputOTPSlot index={1} />
                          <InputOTPSlot index={2} />
                          <InputOTPSlot index={3} />
                          <InputOTPSlot index={4} />
                          <InputOTPSlot index={5} />
                        </InputOTPGroup>
                      </InputOTP>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex items-center justify-center gap-2">
                <p className="text-base font-normal text-gray-500">
                  Didn’t receive the code?{" "}
                </p>
                <button
                  type="button"
                  className="text-sm text-blue-600 hover:underline"
                  onClick={() =>
                    forgotPasswordMutation.mutate(form.watch("email"))
                  }
                >
                  Resend
                </button>
              </div>

              <Button type="submit">
                <span>Verify Code</span>
                <MoveRight />
              </Button>

              <div className="flex items-center justify-center gap-2">
                <p>Don’t have an account? </p>
                <Link
                  href="/register"
                  className="text-sm text-blue-600 hover:underline"
                >
                  Create yours
                </Link>
              </div>
            </form>
          </Form>
        </div>
      )}

      {/* Create a New Password */}
      {currentStep === 3 && (
        <div className="flex flex-col gap-6">
          <Button
            className="h-10 w-10 border border-gray-200 bg-transparent text-black hover:text-white"
            onClick={handlePrevStep}
          >
            <MoveLeft />
          </Button>
          <div className="flex flex-col gap-2">
            <h1 className="text-3xl font-bold">Forgot Password</h1>
            <p className="text-base font-normal text-gray-500">
              Create a new strong password for your account.
            </p>
          </div>

          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="flex flex-col gap-4"
            >
              {/* New Password */}
              <FormField
                control={form.control}
                name="password"
                rules={{
                  required: "Your password is required",
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters",
                  },
                }}
                render={({ field, fieldState }) => (
                  <FormItem className="flex flex-col gap-2">
                    <FormLabel>New Password</FormLabel>
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
                      {/* Your form field */}
                    </FormControl>
                    <FormDescription />
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Confirm Password */}
              <FormField
                control={form.control}
                name="rePassword"
                rules={{
                  required: "Your password is required",
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters",
                  },
                }}
                render={({ field, fieldState }) => (
                  <FormItem className="flex flex-col gap-2">
                    <FormLabel>Confirm New Password</FormLabel>
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
                      {/* Your form field */}
                    </FormControl>
                    <FormDescription />
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit">Update Password</Button>
            </form>
          </Form>
        </div>
      )}
    </div>
  );
}
