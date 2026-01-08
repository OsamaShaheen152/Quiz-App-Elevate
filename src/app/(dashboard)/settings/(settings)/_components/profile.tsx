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
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { SubmitHandler, useForm } from "react-hook-form";
import { Card } from "@/components/ui/card";
import { useUserInfo } from "../_hooks/use-user-info";
import { useEffect } from "react";
import { useEditUserInfo } from "../_hooks/use-edit-user-info";
import { useQueryClient } from "@tanstack/react-query";
import { deleteAccount } from "../_actions/delete-account.action";
import { Toaster } from "@/components/ui/toaster";
import { toast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { TriangleAlert } from "lucide-react";
import { signOut } from "next-auth/react";

type UserInfoType = {
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
};

export default function Profile() {
  // Router
  const router = useRouter();

  // Mutations and Queries
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

  // Handlers

  // Handle form submission
  const onSubmit: SubmitHandler<UserInfoType> = async (data: UserInfoType) => {
    userInfoMutation.mutate(data, {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["userInfo"] });
      },
      onError: (error) => {
        void error;
        toast({
          title: "Error",
          description: "Failed to update user information.",
        });
      },
    });
  };

  // Handle delete account
  const deleteAccountHandler = async () => {
    const result = await deleteAccount();

    // If deletion is successful
    if (result.success) {
      toast({
        description: (
          <span className="flex items-center gap-2">
            Your account has been deleted.
          </span>
        ),
        className:
          "bg-[#1b2733] text-white border-0 rounded-md shadow-md flex items-center gap-2 px-4 py-3",
      });

      queryClient.invalidateQueries({ queryKey: ["userInfo"] });

      // Remove the token from cookies
      await signOut({ redirect: false });
      router.push("/register");
    } else {
      toast({ title: "Error", description: result.message });
    }
  };

  return (
    <Card className="max-h-screen w-full border-0 p-2 pt-4 shadow-none xl:px-4 [&_*]:rounded-none">
      {/* Toaster */}
      <Toaster />

      {/* Form */}
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
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="flex items-center gap-4">
            {/* Dialog */}
            <Dialog>
              <DialogTrigger asChild>
                <Button
                  type="button"
                  className="text-sm xl:text-lg"
                  variant="danger"
                >
                  Delete My Account
                </Button>
              </DialogTrigger>

              {/* Content */}
              <DialogContent className="mx-auto flex min-h-[27rem] w-80 max-w-xl flex-col justify-between rounded-lg border border-gray-300 p-4 md:max-h-80 md:w-[32rem]">
                <DialogHeader>
                  {/* Title */}
                  <DialogTitle className="mb-4 translate-y-5">
                    <div className="flex justify-center">
                      <div className="flex h-20 w-20 items-center justify-center rounded-full bg-red-50">
                        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-red-100">
                          <TriangleAlert className="h-8 w-8 text-red-600" />
                        </div>
                      </div>
                    </div>
                  </DialogTitle>

                  {/* Description */}
                  <DialogDescription className="translate-y-12 text-center text-lg font-medium">
                    <p className="text-red-600">
                      Are you sure you want to delete your account?
                    </p>
                    <p className="text-gray-500">
                      This action is permanent and cannot be undone.
                    </p>
                  </DialogDescription>
                </DialogHeader>

                {/* Footer */}
                <DialogFooter className="gap-2 border-t-2 border-gray-100 bg-gray-50 py-4 sm:justify-around [&_*]:rounded-none">
                  <DialogClose asChild>
                    <Button
                      type="button"
                      variant="secondary"
                      className="bg-gray-200 text-black"
                    >
                      Cancel
                    </Button>
                  </DialogClose>

                  <Button
                    type="button"
                    variant="destructive"
                    onClick={deleteAccountHandler}
                    className="bg-red-600 text-white"
                  >
                    Yes, delete
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>

            <Button type="submit" className="text-sm xl:text-lg">
              Save Changes
            </Button>
          </div>
        </form>
      </Form>
    </Card>
  );
}
