import Header from "@/components/Header";
import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Footer from "@/components/Footer";
import AuthProvider from "@/providers/authProvider";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <AuthProvider>
        <body className="min-h-screen flex flex-col ">
          <Header />
          <div className="flex-grow bg-neutral-900">{children}</div>
          <Footer />
        </body>
      </AuthProvider>
    </html>
  );
}
