import type React from "react"
import type { Metadata } from "next"
import { Inter, JetBrains_Mono } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" })
const jetbrainsMono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono" })

export const metadata: Metadata = {
  title: "PrismLinux - High-Performance Arch-Based Distribution",
  description:
    "PrismLinux is a cutting-edge Arch Linux-based distribution optimized for speed, security, gaming, programming, and content creation.",
  keywords: "Linux, Arch Linux, PrismLinux, Gaming, Programming, Content Creation, Security, Performance",
  authors: [{ name: "CrystalNetwork Studio" }],
  openGraph: {
    title: "PrismLinux - High-Performance Arch-Based Distribution",
    description: "Experience the future of Linux with PrismLinux - optimized for gamers, developers, and creators.",
    type: "website",
    url: "https://prismlinux.org",
  },
  twitter: {
    card: "summary_large_image",
    title: "PrismLinux - High-Performance Arch-Based Distribution",
    description: "Experience the future of Linux with PrismLinux - optimized for gamers, developers, and creators.",
  },
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${jetbrainsMono.variable} font-sans antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
          <div className="min-h-screen bg-background text-foreground">
            <Header />
            <main>{children}</main>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}
