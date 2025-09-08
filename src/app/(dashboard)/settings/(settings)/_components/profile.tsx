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
import { PhoneInput } from "@/app/(authentication)/_components/phone-input";
import { useUserInfo } from "../_hooks/use-user-info";
import { useEffect } from "react";
import { useEditUserInfo } from "../_hooks/use-edit-user-info";
import { useQueryClient } from "@tanstack/react-query";

type UserInfoType = {
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
};

export default function Profile() {
  const { data, isLoading } = useUserInfo();
  const userInfoMutation = useEditUserInfo();
  const queryClient = useQueryClient();

  // Initialize form
  const form = useForm<UserInfoType>({
    defaultValues: {
      username: "",
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
    },
  });

  // Populate form with user data when available
  useEffect(() => {
    if (data?.user) {
      form.reset({
        username: data?.user.username || "",
        firstName: data?.user.firstName || "",
        lastName: data?.user.lastName || "",
        email: data?.user.email || "",
        phone: data?.user.phone || "",
      });
    }
  }, [form, data]);

  // Show loading state
  if (isLoading) {
    return <p className="p-4 text-center">Loading...</p>;
  }

  // If no data is available
  if (!data || !data.user) {
    return <Card className="p-4">Failed to load user data.</Card>;
  }

  console.log(data.user);

  // Handle form submission
  const onSubmit: SubmitHandler<UserInfoType> = async (data: UserInfoType) => {
    console.log(data);
    userInfoMutation.mutate(data, {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["userInfo"] });
        // Optional: Show success message (e.g., toast)
      },
      onError: (error) => {
        console.error("Update failed:", error);
        // Optional: Show error message to user
      },
    });
  };

  return (
    <Card className="max-h-screen w-full border-0 py-2 pt-4 shadow-none [&_*]:rounded-none">
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
                rules={{ required: "First Name is required" }}
                render={({ field, fieldState }) => (
                  <FormItem>
                    <FormLabel>First Name</FormLabel>
                    <FormControl>
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
                rules={{ required: "Last Name is required" }}
                render={({ field, fieldState }) => (
                  <FormItem>
                    <FormLabel>Last Name</FormLabel>
                    <FormControl>
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
              rules={{ required: "Username is required" }}
              name="username"
              render={({ field, fieldState }) => (
                <FormItem>
                  <FormLabel>User Name</FormLabel>
                  <FormControl>
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
              rules={{ required: "Email is required" }}
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

            {/* Phone */}
            <FormField
              control={form.control}
              name="phone"
              rules={{
                required: "Your phone number is required",
              }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone</FormLabel>
                  <FormControl>
                    <PhoneInput
                      defaultCountry="EG"
                      placeholder="Enter phone number"
                      {...field}
                      // error={!!fieldState.error}
                      onChange={(val) => field.onChange(val || "")}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="flex items-center gap-4">
            <Button
              type="button"
              variant="danger"

              // disabled={registerMutation.status === "pending"}
            >
              Delete My Account
            </Button>

            <Button
              type="submit"

              // disabled={registerMutation.status === "pending"}
            >
              Save Changes
            </Button>
          </div>
        </form>
      </Form>
    </Card>
  );
}
