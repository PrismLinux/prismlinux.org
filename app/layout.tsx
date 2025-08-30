import type React from "react";
import type { Metadata } from "next";
import {
  Inter as FontSans,
  JetBrains_Mono as FontMono,
} from "next/font/google";
import { cn } from "@/lib/utils";
import SiteHeader from "@/components/header";
import { ThemeProvider } from "@/components/theme-provider";
import "./globals.css";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

const fontMono = FontMono({
  subsets: ["latin"],
  variable: "--font-mono",
});

export const metadata: Metadata = {
  title: "PrismLinux - High-Performance Arch-Based Distribution",
  description:
    "PrismLinux is a cutting-edge Arch Linux-based distribution optimized for speed, security, gaming, programming, and content creation.",
  keywords:
    "Linux, Arch Linux, PrismLinux, Gaming, Programming, Content Creation, Security, Performance",
  authors: [{ name: "CrystalNetwork Studio" }],
  openGraph: {
    title: "PrismLinux - High-Performance Arch-Based Distribution",
    description:
      "Experience the future of Linux with PrismLinux - optimized for gamers, developers, and creators.",
    type: "website",
    url: "https://prismlinux.org",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable,
          fontMono.variable,
        )}
      >
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          <div className="relative flex min-h-screen flex-col">
            <SiteHeader>
              <div className="flex-1">{children}</div>
            </SiteHeader>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
