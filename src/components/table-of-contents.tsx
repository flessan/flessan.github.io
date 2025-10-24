'use client';

import { TocEntry } from '@/lib/types';
import { cn } from '@/lib/utils';
import { useEffect, useState, useRef } from 'react';

interface TableOfContentsProps {
  toc: TocEntry[];
}

export function TableOfContents({ toc }: TableOfContentsProps) {
  const [activeId, setActiveId] = useState<string | null>(null);
  const observer = useRef<IntersectionObserver | null>(null);
  const headingElementsRef = useRef<Record<string, IntersectionObserverEntry>>({});

  useEffect(() => {
    const handleObserver = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        headingElementsRef.current[entry.target.id] = entry;
      });

      const visibleHeadings: IntersectionObserverEntry[] = [];
      Object.keys(headingElementsRef.current).forEach((key) => {
        const entry = headingElementsRef.current[key];
        if (entry.isIntersecting) {
          visibleHeadings.push(entry);
        }
      });
      
      const getIndexFromId = (id: string) => toc.findIndex(item => item.slug === id);

      if (visibleHeadings.length > 0) {
        // Sort visible headings by their order in the TOC
        visibleHeadings.sort((a, b) => getIndexFromId(a.target.id) - getIndexFromId(b.target.id));
        setActiveId(visibleHeadings[0].target.id);
      }
    };
    
    observer.current = new IntersectionObserver(handleObserver, {
      rootMargin: '0px 0px -40% 0px' // activate when heading is in the top 60% of the viewport
    });

    const elements = toc.map(item => document.getElementById(item.slug)).filter(Boolean) as HTMLElement[];
    elements.forEach(el => observer.current?.observe(el));

    return () => observer.current?.disconnect();
  }, [toc]);

  if (toc.length === 0) {
    return null;
  }

  return (
    <div className="lg:block">
      <div className="space-y-2">
        <p className="font-medium">On This Page</p>
        <ul className="space-y-2 border-l-2 border-muted">
          {toc.map((item) => (
            <li key={item.slug}>
              <a
                href={`#${item.slug}`}
                className={cn(
                  'block border-l-2 py-1 transition-colors hover:text-foreground -ml-px',
                  'text-sm',
                  item.slug === activeId ? 'text-primary border-primary font-medium' : 'text-muted-foreground border-transparent',
                  item.level === 3 ? 'pl-8' : 'pl-4'
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
