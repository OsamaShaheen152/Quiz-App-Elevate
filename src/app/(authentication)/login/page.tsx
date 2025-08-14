import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";

export default function LoginPage() {
  return (
    <div className="w-[450px] flex flex-col  justify-center gap-4 min-h-screen p-4">
      <h1 className="text-3xl font-bold">Login</h1>
      <form action="" method="get" className="flex flex-col gap-4 relative">
        <Label htmlFor="email" className="text-base font-medium">
          Email
        </Label>
        <Input id="email" type="email" className="outline-none" />
        <Label htmlFor="password" className="text-base font-medium">
          Password
        </Label>
        <Input id="password" type="password" className="outline-none" />
        <Link
          href="/forgot-password"
          className="absolute right-0 bottom-24 text-blue-600"
        >
          Forgot Your Password?
        </Link>
        <div className="flex flex-col items-center mt-8 gap-4 w-full ">
          <Button className="bg-blue-600 hover:bg-blue-700 w-full">
            Login
          </Button>
          <span>
            Don&apos;t have an account?{" "}
            <Link href="/register" className="text-blue-600">
              Create Yours
            </Link>
          </span>
        </div>
      </form>
    </div>
  );
}
