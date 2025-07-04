import type React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import Navbar from "@/components/navbar";
import { Toaster } from "@/components/ui/toaster";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import Script from "next/script";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: "Professional Portfolio | Web Developer & Designer",
    template: "%s | Professional Portfolio",
  },
  description:
    "Professional portfolio showcasing web development projects, skills, and experience in modern web technologies.",
  keywords: [
    "web developer",
    "portfolio",
    "frontend developer",
    "full-stack developer",
    "Next.js",
    "React",
    "web design",
    "software engineer",
  ],
  authors: [{ name: "Ziad Hatem" }],
  creator: "Ziad Hatem",
  publisher: "Ziad Hatem",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_APP_URL || "https://your-portfolio-domain.com"
  ),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    title: "Professional Portfolio | Web Developer & Designer",
    description:
      "Professional portfolio showcasing web development projects, skills, and experience in modern web technologies.",
    siteName: "Your Name - Portfolio",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Your Name - Professional Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Professional Portfolio | Web Developer & Designer",
    description:
      "Professional portfolio showcasing web development projects, skills, and experience in modern web technologies.",
    images: ["/og-image.jpg"],
    creator: "@yourtwitterhandle",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "google-site-verification-code",
    yandex: "yandex-verification-code",
  },
  generator: "v0.dev",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-32NTDS8RLH"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-32NTDS8RLH');
          `}
        </Script>

        {/* Iubenda Cookie Solution */}
        <Script id="iubenda-config" strategy="afterInteractive">
          {`
            var _iub = _iub || [];
            _iub.csConfiguration = {"siteId":4130334,"cookiePolicyId":61768967,"lang":"en","storage":{"useSiteId":true}};
          `}
        </Script>
        <Script
          src="https://cs.iubenda.com/autoblocking/4130334.js"
          strategy="afterInteractive"
        />
        <Script
          src="//cdn.iubenda.com/cs/gpp/stub.js"
          strategy="afterInteractive"
        />
        <Script
          src="//cdn.iubenda.com/cs/iubenda_cs.js"
          strategy="afterInteractive"
          async
        />

        {/* Iubenda Consent Solution */}
        <Script id="iubenda-cons-config" strategy="afterInteractive">
          {`
            var _iub = _iub || {}; 
            _iub.cons_instructions = _iub.cons_instructions || []; 
            _iub.cons_instructions.push(["init", {api_key: "vm0UVyofUWgSDbSmLuOcREukUCGpgTYl"}]);
          `}
        </Script>
        <Script
          src="https://cdn.iubenda.com/cons/iubenda_cons.js"
          strategy="afterInteractive"
          async
        />

        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Analytics />
          <SpeedInsights />
          <Navbar />
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
