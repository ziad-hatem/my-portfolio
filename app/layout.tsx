import { ClerkProvider } from "@clerk/nextjs";
import type { Metadata } from "next";
import { Laila } from "next/font/google";
import { Toaster } from "react-hot-toast";
import { ContextProvider } from "./_components/providers/context-provider";
import { ThemeProvider } from "./_components/providers/theme-provider";

import "./globals.css";
const laila = Laila({
  subsets: ["latin"],
  variable: "--font-laila",
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Ziad Hatem - Frontend DEV",
  description: "Portfolio",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${laila.variable} antialiased`}>
        <ClerkProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <ContextProvider>{children}</ContextProvider>
            <Toaster />
          </ThemeProvider>
        </ClerkProvider>
      </body>
    </html>
  );
}
