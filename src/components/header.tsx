'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Code, Menu, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { cn } from '@/lib/utils';
import { useState, useEffect } from 'react';
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
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname])


  const NavLink = ({ href, label }: { href: string; label: string }) => {
    const isActive = pathname === href;
    return (
      <Link
        href={href}
        className={cn(
          'transition-colors font-medium',
          isActive ? 'text-primary' : 'text-muted-foreground hover:text-foreground'
        )}
      >
        {label}
      </Link>
    );
  };

  return (
    <>
      <header className={cn(
          "sticky top-0 z-50 w-full border-b transition-colors no-print",
          isScrolled ? "bg-background/95 backdrop-blur-sm border-border" : "bg-background/0 border-transparent"
        )}>
        <div className="container flex h-16 items-center justify-between max-w-6xl">
          <div className="flex items-center gap-6">
            <Link href="/" className="flex items-center gap-2 mr-4">
              <Code className="h-7 w-7 text-primary" />
              <span className="text-xl font-bold">FleFolio</span>
            </Link>
            <nav className="hidden md:flex items-center gap-6 text-sm">
            {navItems.map((item) => (
                <NavLink key={item.href} {...item} />
            ))}
            </nav>
          </div>

          <div className="flex items-center gap-2">
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
                    <SheetContent side="left" className="w-full max-w-xs bg-background p-6">
                        <div className="flex flex-col h-full">
                            <div className="flex items-center justify-between w-full mb-8">
                                <Link href="/" className="flex items-center gap-2">
                                    <Code className="h-7 w-7 text-primary" />
                                    <span className="text-xl font-bold">FleFolio</span>
                                </Link>
                            </div>
                            <nav className="flex-1 w-full space-y-6">
                                {navItems.map((item) => (
                                    <Link
                                      key={item.href}
                                      href={item.href}
                                      className={cn(
                                        'block text-lg font-medium',
                                        pathname === item.href ? 'text-primary' : 'text-muted-foreground hover:text-foreground'
                                      )}
                                    >
                                      {item.label}
                                    </Link>
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
