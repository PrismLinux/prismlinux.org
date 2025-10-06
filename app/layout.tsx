import SiteFooter from "@/components/footer";
import SiteHeader from "@/components/header";
import { ThemeProvider } from "@/components/theme-provider";
import { baseMetadata } from "@/lib/metadata";
import { cn } from "@/lib/utils";
import {
    JetBrains_Mono as FontMono,
    Inter as FontSans,
} from "next/font/google";
import type React from "react";
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
