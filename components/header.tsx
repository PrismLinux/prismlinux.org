"use client";

import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Menu, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { useState, useEffect } from "react";

const navItems = [
  { name: "Download", href: "/download" },
  { name: "Wiki", href: "/wiki" },
  { name: "About", href: "/about" },
];

interface HeaderProps {
  children: ReactNode;
}

export function Header({ children }: HeaderProps) {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { setTheme, theme, systemTheme } = useTheme();

  // Animation theme switch
  useEffect(() => {
    const root = document.documentElement;
    root.classList.add('theme-transition');
    setTimeout(() => {
      root.classList.remove('theme-transition');
    }, 500);
  }, [theme]);

  return (
    <div className="min-h-screen flex flex-col">
      <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 max-w-screen-2xl items-center justify-between">
          <div className="flex items-center gap-6">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-2">
              <Image src="/logo.svg" alt="PrismLinux Logo" width={28} height={28} />
              <span className="font-bold text-primary">PrismLinux</span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden items-center space-x-4 md:flex">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground relative group"
                >
                  {item.name}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
                </Link>
              ))}
            </nav>
          </div>

          <div className="flex items-center gap-2">
            {/* Theme Toggle */}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              aria-label="Toggle Theme"
              className="relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-secondary/10 opacity-0 hover:opacity-100 transition-opacity duration-300" />
              <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all duration-500 dark:-rotate-90 dark:scale-0" />
              <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all duration-500 dark:rotate-0 dark:scale-100" />
            </Button>

            {/* Mobile Menu Trigger */}
            <Sheet open={isMobileMenuOpen} onOpenChange={setMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Toggle Menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-4/5 p-4">
                <SheetHeader>
                  <SheetTitle>Menu</SheetTitle>
                  <SheetDescription>Explore PrismLinux</SheetDescription>
                </SheetHeader>
                <div className="mt-6">
                  <Link
                    href="/"
                    className="mb-4 flex items-center"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <Image
                      src="/logo.svg"
                      alt="PrismLinux Logo"
                      width={24}
                      height={24}
                      className="mr-2"
                    />
                    <span className="font-bold text-primary">PrismLinux</span>
                  </Link>
                  <nav className="grid gap-4">
                    {navItems.map((item) => (
                      <Link
                        key={item.name}
                        href={item.href}
                        onClick={() => setMobileMenuOpen(false)}
                        className="text-lg font-medium text-muted-foreground transition-colors hover:text-foreground relative group"
                      >
                        {item.name}
                        <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
                      </Link>
                    ))}
                  </nav>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>

      {/* Main content area that grows to fill remaining space */}
      <main className="flex-1 transition-opacity duration-300">{children}</main>

      <style jsx global>{`
        .theme-transition {
          transition: background-color 0.5s ease, color 0.5s ease;
        }
        html {
          transition: background-color 0.5s ease, color 0.5s ease;
        }
      `}</style>
    </div>
  );
}

export default Header;
