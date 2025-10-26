'use client'

import { useState } from 'react'
import { ChevronDown, List } from 'lucide-react'
import type { Heading } from '@/lib/markdown'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

interface MobileTocAccordionProps {
  headings: Heading[]
}

export function MobileTocAccordion({ headings }: MobileTocAccordionProps) {
  if (headings.length === 0) return null

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    document.getElementById(id)?.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });
    window.history.pushState(null, '', `#${id}`);
  };

  return (
    <Accordion type="single" collapsible className="w-full lg:hidden mb-8">
      <AccordionItem value="toc">
        <AccordionTrigger className="text-lg">
          <div className="flex items-center gap-2">
            <List size={18} />
            On This Page
          </div>
        </AccordionTrigger>
        <AccordionContent>
          <nav>
            <ul className="space-y-2 py-2">
              {headings.map((heading) => (
                <li key={heading.id} className={cn('line-clamp-2', heading.level > 2 && 'pl-4')}>
                  <a
                    href={`#${heading.id}`}
                    className="block text-muted-foreground hover:text-foreground transition-colors"
                    onClick={(e) => handleLinkClick(e, heading.id)}
                  >
                    {heading.text}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  )
}