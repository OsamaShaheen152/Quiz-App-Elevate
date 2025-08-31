import AuthText from "./_components/auth-text";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex max-h-screen items-center gap-x-32 m-auto">
      <AuthText />
      <main className="flex items-center justify-center"> {children}</main>
    </div>
  );
}
