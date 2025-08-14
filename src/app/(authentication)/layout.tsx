import AuthText from "./_components/AuthText";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen items-center gap-x-32">
      <AuthText />
      <div className="flex items-center justify-center"> {children}</div>
    </div>
  );
}
