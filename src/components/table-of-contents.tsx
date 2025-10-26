'use client';

import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { List } from 'lucide-react';

interface Heading {
  id: string;
  level: number;
  text: string;
}

interface TableOfContentsProps {
  content: string;
}

export default function TableOfContents({ content }: TableOfContentsProps) {
  const [headings, setHeadings] = useState<Heading[]>([]);
  const [activeId, setActiveId] = useState<string>('');

  useEffect(() => {
    const headingRegex = /^(#{2,4})\s(.+)/gm;
    const matches = Array.from(content.matchAll(headingRegex));
    const extractedHeadings = matches.map(match => {
      const level = match[1].length;
      const text = match[2];
      const id = text.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]+/g, '');
      return { id, level, text };
    });
    setHeadings(extractedHeadings);
  }, [content]);

  useEffect(() => {
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

    headings.forEach(heading => {
      const element = document.getElementById(heading.id);
      if (element) {
        observer.observe(element);
      }
    });

    return () => {
      headings.forEach(heading => {
        const element = document.getElementById(heading.id);
        if (element) {
          observer.unobserve(element);
        }
      });
    };
  }, [headings]);

  if (headings.length === 0) {
    return null;
  }

  return (
    <aside className="sticky top-24 self-start w-64 hidden lg:block pr-8">
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
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById(heading.id)?.scrollIntoView({
                    behavior: 'smooth',
                  });
                }}
              >
                {heading.text}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}
