'use client';

import { usePathname } from 'next/navigation';
import { ReactNode } from 'react';

export function AnimatedPageWrapper({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  return (
    <main
      key={pathname}
      className="flex-1 transition-opacity duration-300 ease-in-out animate-fadeIn"
    >
      {children}
    </main>
  );
}