import AuthText from "./_components/auth-text";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="m-auto flex min-h-screen gap-x-32 bg-white">
      <AuthText />
      <main className="m-auto flex w-full items-center justify-center sm:w-96 lg:w-[27rem] xl:m-0 xl:w-fit">
        {children}
      </main>
    </div>
  );
}
