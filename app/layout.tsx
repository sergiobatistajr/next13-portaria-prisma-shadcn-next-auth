import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

import getUser from "@/app/actions/getCurrentUser";
import Login from "@/components/login";

const inter = Inter({ subsets: ["latin"] });

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
        {user ? <div>{children}</div> : <Login />}
      </body>
    </html>
  );
}
