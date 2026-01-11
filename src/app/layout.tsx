import type { Metadata } from "next";
import "./globals.css";
import Providers from "@/components/providers";

// const geistSans = localFont({
//   src: "./fonts/GeistVF.woff",
//   variable: "--font-geist-sans",
//   weight: "100 900",
// });

// const geistMono = localFont({
//   src: "./fonts/GeistMonoVF.woff",
//   variable: "--font-geist-mono",
//   weight: "100 900",
// });

export const metadata: Metadata = {
  title: "Exam App",
  description: "Online Exam Application",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // ${geistSans.variable} ${geistMono.variable}
    <html lang="en">
      {/* <body className={`antialiased`}> */}
      <body className="bg-gray-50">
        {/* Providers */}
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
