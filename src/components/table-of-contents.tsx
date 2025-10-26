'use client';

import { useState, useEffect, useMemo } from 'react';
import { cn } from '@/lib/utils';
import { List } from 'lucide-react';
import type { Heading } from '@/lib/markdown';

interface TableOfContentsProps {
  headings: Heading[];
}

export default function TableOfContents({ headings }: TableOfContentsProps) {
  const [activeId, setActiveId] = useState<string>('');

  useEffect(() => {
    if (headings.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
            // Don't break, we want the last intersecting one for scrolling down
          }
        }
      },
      { rootMargin: `0% 0% -85% 0%` }
    );
    
    const elements = headings.map(h => document.getElementById(h.id)).filter(Boolean);
    elements.forEach(el => el && observer.observe(el));

    return () => {
      elements.forEach(el => el && observer.unobserve(el));
    };
  }, [headings]);

  if (headings.length === 0) {
    return null;
  }

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    document.getElementById(id)?.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });
    // Manually update URL hash
    window.history.pushState(null, '', `#${id}`);
  };

  return (
    <div className="w-full">
      <h3 className="text-sm font-semibold mb-4 flex items-center gap-2 uppercase tracking-wider text-muted-foreground">
        On This Page
      </h3>
      <nav>
        <ul className="space-y-2 text-sm">
          {headings.map(heading => (
            <li key={heading.id}>
              <a
                href={`#${heading.id}`}
                className={cn(
                  'block transition-colors hover:text-primary',
                  heading.id === activeId ? 'font-medium text-primary' : 'text-muted-foreground',
                  heading.level === 3 && 'pl-4',
                  heading.level === 4 && 'pl-8'
                )}
                onClick={(e) => handleLinkClick(e, heading.id)}
              >
                {heading.text}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}
