'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Code, Menu, X, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { cn } from '@/lib/utils';
import { useState } from 'react';
import { ThemeToggle } from './theme-toggle';
import { CommandPalette } from './command-palette';

const navItems = [
  { href: '/', label: 'Home' },
  { href: '/projects', label: 'Projects' },
  { href: '/blog', label: 'Blog' },
  { href: '/about', label: 'About' },
  { href: '/cv', label: 'CV' },
];

export default function Header() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);

  const NavLink = ({ href, label, isMobile = false }: { href: string; label: string, isMobile?: boolean }) => {
    const isActive = pathname === href;
    return (
      <Link
        href={href}
        className={cn(
          'transition-colors text-lg md:text-sm font-medium',
          isActive ? 'text-primary' : 'text-muted-foreground hover:text-foreground',
          isMobile ? 'block w-full p-4' : ''
        )}
        onClick={() => isMobile && setIsMobileMenuOpen(false)}
      >
        {label}
      </Link>
    );
  };

  return (
    <>
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur-sm no-print">
        <div className="container flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <Code className="h-7 w-7 text-primary" />
            <span className="text-xl font-bold">FleFolio</span>
          </Link>
          <div className="flex items-center gap-1">
              <nav className="hidden md:flex items-center gap-4">
              {navItems.map((item) => (
                  <NavLink key={item.href} {...item} />
              ))}
              </nav>
              <Button variant="ghost" size="icon" onClick={() => setIsCommandPaletteOpen(true)} className="hidden md:inline-flex">
                <Search />
                <span className="sr-only">Open command palette</span>
              </Button>
              <ThemeToggle />
              <div className="md:hidden">
              <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
                  <SheetTrigger asChild>
                  <Button variant="ghost" size="icon">
                      <Menu className="h-6 w-6" />
                      <span className="sr-only">Open menu</span>
                  </Button>
                  </SheetTrigger>
                  <SheetContent side="right" className="w-full">
                      <div className="flex flex-col items-start h-full">
                          <div className="flex items-center justify-between w-full p-4 border-b">
                              <Link href="/" className="flex items-center gap-2" onClick={() => setIsMobileMenuOpen(false)}>
                                  <Code className="h-7 w-7 text-primary" />
                                  <span className="text-xl font-bold">FleFolio</span>
                              </Link>
                              <Button variant="ghost" size="icon" onClick={() => setIsMobileMenuOpen(false)}>
                                  <X className="h-6 w-6" />
                                  <span className="sr-only">Close menu</span>
                              </Button>
                          </div>
                          <nav className="flex-1 w-full mt-8">
                              {navItems.map((item) => (
                                  <NavLink key={item.href} {...item} isMobile />
                              ))}
                          </nav>
                      </div>
                  </SheetContent>
              </Sheet>
              </div>
          </div>
        </div>
      </header>
      <CommandPalette open={isCommandPaletteOpen} onOpenChange={setIsCommandPaletteOpen} />
    </>
  );
}
