'use client';

import React, { useEffect, useRef } from 'react';
import { useToast } from '@/hooks/use-toast';
import 'highlight.js/styles/github-dark.css';

interface ContentRendererProps {
  content: string;
}

const ContentRenderer: React.FC<ContentRendererProps> = ({ content }) => {
  const { toast } = useToast();
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = contentRef.current;
    if (!container) return;

    const codeBlocks = container.querySelectorAll('pre');

    codeBlocks.forEach((preElement) => {
      // Prevent adding buttons multiple times
      if (preElement.querySelector('.copy-button-container')) return;

      const codeElement = preElement.querySelector('code');
      const codeText = codeElement?.innerText || '';
      
      const copyButtonContainer = document.createElement('div');
      copyButtonContainer.className = 'copy-button-container absolute top-2 right-2';

      const button = document.createElement('button');
      button.className = 'copy-button p-2 rounded-md bg-gray-800 text-gray-400 hover:bg-gray-700 hover:text-white transition-colors duration-200';
      button.setAttribute('aria-label', 'Copy code');
      button.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-clipboard"><rect width="8" height="4" x="8" y="2" rx="1" ry="1"/><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/></svg>`;
      
      button.onclick = () => {
        navigator.clipboard.writeText(codeText).then(() => {
          button.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-check text-green-500"><path d="M20 6 9 17l-5-5"/></svg>`;
          toast({ title: 'Copied!', description: 'Code has been copied to your clipboard.' });
          setTimeout(() => {
            button.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-clipboard"><rect width="8" height="4" x="8" y="2" rx="1" ry="1"/><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/></svg>`;
          }, 2000);
        }).catch(() => {
          toast({ variant: 'destructive', title: 'Failed to copy', description: 'Could not copy code to clipboard.' });
        });
      };
      
      copyButtonContainer.appendChild(button);
      preElement.classList.add('relative');
      preElement.appendChild(copyButtonContainer);
    });
  }, [content, toast]);

  return (
    <div
      ref={contentRef}
      className="prose prose-invert lg:prose-lg max-w-none prose-pre:bg-[#0d1117] prose-pre:border prose-pre:border-gray-700 prose-headings:text-primary prose-a:text-accent prose-a:font-medium prose-a:no-underline hover:prose-a:underline prose-strong:text-foreground"
      dangerouslySetInnerHTML={{ __html: content }}
    />
  );
};

export default ContentRenderer;
