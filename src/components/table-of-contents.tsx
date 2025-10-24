'use client';

import { TocEntry } from '@/lib/api';
import { cn } from '@/lib/utils';
import { useEffect, useState } from 'react';

interface TableOfContentsProps {
  toc: TocEntry[];
}

export function TableOfContents({ toc }: TableOfContentsProps) {
  const [activeId, setActiveId] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      let currentId: string | null = null;
      for (const item of toc) {
        const element = document.getElementById(item.slug);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 100) { // 100px offset from the top
            currentId = item.slug;
          }
        }
      }
      setActiveId(currentId);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Set initial active ID

    return () => window.removeEventListener('scroll', handleScroll);
  }, [toc]);

  if (toc.length === 0) {
    return null;
  }

  return (
    <div className="hidden lg:block sticky top-28 w-64 ml-auto">
      <div className="space-y-2">
        <p className="font-medium">On This Page</p>
        <ul className="space-y-2">
          {toc.map((item) => (
            <li key={item.slug}>
              <a
                href={`#${item.slug}`}
                className={cn(
                  'text-sm transition-colors hover:text-foreground',
                  item.slug === activeId ? 'text-foreground font-medium' : 'text-muted-foreground',
                  item.level === 3 ? 'pl-4' : ''
                )}
              >
                {item.text}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
