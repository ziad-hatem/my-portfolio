import { SignedOut } from "@clerk/nextjs";
import type { Metadata } from "next";
import { Laila } from "next/font/google";

import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import "../globals.css";
const laila = Laila({
  subsets: ["latin"],
  variable: "--font-laila",
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Ziad Hatem - Frontend DEV",
  description: "Portfolio",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user = await currentUser();

  if (user?.emailAddresses[0].emailAddress !== process.env.ALLOWED_EMAIL) {
    await SignedOut({ children });
    return redirect("/unthorized");
  }
  return (
    <html lang="en">
      <body className={`${laila.variable} antialiased relative`}>
        {children}
      </body>
    </html>
  );
}
