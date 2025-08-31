import type React from "react";
import {
  Inter as FontSans,
  JetBrains_Mono as FontMono,
} from "next/font/google";
import { cn } from "@/lib/utils";
import SiteHeader from "@/components/header";
import SiteFooter from "@/components/footer";
import { ThemeProvider } from "@/components/theme-provider";
import "./globals.css";
import { baseMetadata } from "@/lib/metadata";

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
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable,
          fontMono.variable,
        )}
      >
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          <div className="relative flex min-h-screen flex-col">
            <SiteHeader>
              <main className="flex-1">{children}</main>
            </SiteHeader>
            <SiteFooter />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
