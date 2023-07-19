import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

import getUser from "@/actions/getCurrentUser";
import Login from "@/components/login";
import ToastProvider from "@/providers/toast-provider";
import Navbar from "@/components/navbar";

const inter = Inter({ subsets: ["latin"] });
export const revalidate = 0;
export const metadata: Metadata = {
  title: "Portaria",
  description: "Portaria app",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getUser();
  return (
    <html lang="en">
      <body className={inter.className}>
        <ToastProvider />
        {user ? (
          <div>
            <Navbar user={user} />
            {children}
          </div>
        ) : (
          <Login />
        )}
      </body>
    </html>
  );
}
