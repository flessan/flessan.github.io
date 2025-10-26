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
  contentHtml: string;
}

export default function TableOfContents({ contentHtml }: TableOfContentsProps) {
  const [headings, setHeadings] = useState<Heading[]>([]);
  const [activeId, setActiveId] = useState<string>('');

  useEffect(() => {
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = contentHtml;
    const headingElements = tempDiv.querySelectorAll('h2, h3, h4');
    
    const extractedHeadings = Array.from(headingElements).map(el => ({
      id: el.id,
      level: parseInt(el.tagName.substring(1), 10),
      text: el.textContent || '',
    }));

    setHeadings(extractedHeadings);
  }, [contentHtml]);

  useEffect(() => {
    if (headings.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
            // Don't break, allow multiple to be active, we'll take the first one
          }
        }
      },
      { rootMargin: `-20% 0% -70% 0%` }
    );
    
    const elements = headings.map(h => document.getElementById(h.id)).filter(Boolean);
    elements.forEach(el => el && observer.observe(el));

    // Fallback for when nothing is intersecting
    const scrollListener = () => {
      const activeHeading = headings.find((heading, i) => {
          const element = document.getElementById(heading.id);
          if (!element) return false;
          const nextElement = i < headings.length - 1 ? document.getElementById(headings[i+1].id) : null;
          const top = element.getBoundingClientRect().top;
          if (nextElement) {
              return top < window.innerHeight * 0.25 && nextElement.getBoundingClientRect().top > window.innerHeight * 0.25;
          }
          return top < window.innerHeight * 0.25;
      });
      if(activeHeading) setActiveId(activeHeading.id);
    };

    window.addEventListener('scroll', scrollListener);


    return () => {
      elements.forEach(el => el && observer.unobserve(el));
      window.removeEventListener('scroll', scrollListener);
    };
  }, [headings]);

  if (headings.length === 0) {
    return null;
  }

  return (
    <aside className="sticky top-24 self-start w-64 hidden lg:block pr-8 no-print">
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
