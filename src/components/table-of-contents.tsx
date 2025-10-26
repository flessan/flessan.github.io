'use client';

import { useState, useEffect, useMemo } from 'react';
import { cn } from '@/lib/utils';
import { List } from 'lucide-react';

interface Heading {
  id: string;
  level: number;
  text: string;
}

interface TableOfContentsProps {
  contentHtml: string;
}

export default function TableOfContents({ contentHtml }: TableOfContentsProps) {
  const [activeId, setActiveId] = useState<string>('');

  const headings = useMemo(() => {
    if (typeof window === 'undefined') return [];
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = contentHtml;
    const headingElements = tempDiv.querySelectorAll('h2, h3, h4');
    
    return Array.from(headingElements).map(el => ({
      id: el.id,
      level: parseInt(el.tagName.substring(1), 10),
      text: el.textContent || '',
    }));
  }, [contentHtml]);

  useEffect(() => {
    if (headings.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: `0% 0% -80% 0%` }
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
    <div className="w-full lg:w-64 lg:sticky top-24 self-start no-print">
      <h3 className="text-lg font-semibold mb-4 flex items-center gap-2 text-primary">
        <List className="h-5 w-5"/>
        On This Page
      </h3>
      <nav>
        <ul className="space-y-2">
          {headings.map(heading => (
            <li key={heading.id}>
              <a
                href={`#${heading.id}`}
                className={cn(
                  'text-sm transition-colors hover:text-primary',
                  heading.id === activeId ? 'font-bold text-primary' : 'text-muted-foreground',
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
