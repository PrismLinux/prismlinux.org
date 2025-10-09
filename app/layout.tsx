import SiteFooter from "@/components/footer";
import SiteHeader from "@/components/header";
import { ThemeProvider } from "@/components/theme-provider";
import { baseMetadata } from "@/lib/metadata";
import { cn } from "@/lib/utils";
import { Inter as FontSans, JetBrains_Mono as FontMono } from "next/font/google";
import type React from "react";
import { AnimatedPageWrapper } from "@/components/AnimatedPageWrapper";
import "./globals.css";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

const fontMono = FontMono({
  subsets: ["latin"],
  variable: "--font-mono",
});

export const metadata = baseMetadata;

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
          "min-h-screen bg-background font-sans antialiased transition-colors duration-500",
          fontSans.variable,
          fontMono.variable
        )}
      >
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          <div className="relative flex min-h-screen flex-col">
            <SiteHeader>
              <AnimatedPageWrapper>{children}</AnimatedPageWrapper>
            </SiteHeader>
            <SiteFooter />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
