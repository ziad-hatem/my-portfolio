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
  title: "Ziad Hatem - Frontend Developer Portfolio & React Specialist",
  description:
    "Explore the portfolio of Ziad Hatem, a Frontend Developer specializing in React.js, Next.js, and modern CSS frameworks. Check out my projects, technical skills, and experience in building SaaS platforms, LMS systems, and collaborative tools.",
  keywords: [
    "Ziad Hatem",
    "Frontend Developer",
    "React Developer",
    "Next.js",
    "Portfolio",
    "JavaScript",
    "SaaS development",
    "Web Performance Optimization",
    "Tailwind CSS",
    "Open Source Projects",
    "Clerk Integration",
  ],
  viewport: "width=device-width, initial-scale=1",
  robots: "index, follow",
  openGraph: {
    title: "Ziad Hatem - Frontend Developer Portfolio",
    description:
      "Discover Ziad Hatem's work in modern web development with React and Next.js. View projects like SaaS platforms, LMS systems, and Figma-like tools.",
    url: "https://ziadhatem-portfolio.vercel.app",
    type: "website",
    emails: "ziadhatemdev@gmail.com",
    countryName: "Egypt",
    phoneNumbers: "+20 1067609261",
  },
  authors: {
    name: "Ziad Hatem",
    url: "https://ziadhatem-portfolio.vercel.app",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="robots" content="index, follow" />
        <meta name="author" content="Ziad Hatem" />
        <meta
          name="description"
          content="Explore the portfolio of Ziad Hatem, a Frontend Developer specializing in React.js, Next.js, and modern CSS frameworks."
        />
        <meta
          name="keywords"
          content="Frontend Developer, React.js, Next.js, Portfolio, JavaScript, Web Performance Optimization, SaaS development"
        />
        <link rel="canonical" href="https://ziadhatem-portfolio.vercel.app" />
        <title>Ziad Hatem - Frontend Developer Portfolio</title>
        <meta
          name="google-site-verification"
          content="8vvXACQeiioH9qtrZe1FfNcOuL_8DAwTn01qM97vtHs"
        />
        <meta name="msvalidate.01" content="2884A001A41E5338A7C84F84CAED123A" />
      </head>
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
