'use client';

import React, { useState } from 'react';
import { Check, Clipboard } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface ContentRendererProps {
  content: string;
}

const ContentRenderer: React.FC<ContentRendererProps> = ({ content }) => {
  const { toast } = useToast();
  const [copiedStates, setCopiedStates] = useState<Record<number, boolean>>({});

  const handleCopy = (code: string, index: number) => {
    navigator.clipboard.writeText(code).then(() => {
      setCopiedStates(prev => ({ ...prev, [index]: true }));
      toast({ title: "Copied!", description: "Code has been copied to your clipboard." });
      setTimeout(() => {
        setCopiedStates(prev => ({ ...prev, [index]: false }));
      }, 2000);
    }, () => {
      toast({ variant: "destructive", title: "Failed to copy", description: "Could not copy code to clipboard." });
    });
  };

  const renderContent = () => {
    if (!content) return null;

    const blocks = content.split(/(\n```[\s\S]*?```\n|\n\s*\n)/);

    return blocks.map((block, index) => {
      if (!block || block.trim() === '') return null;

      // Code blocks
      if (block.startsWith('\n```') && block.endsWith('```\n')) {
        const languageMatch = block.match(/```(\w+)/);
        const language = languageMatch ? languageMatch[1] : '';
        const code = block.replace(/```\w*\n?/g, '').replace(/```\n?$/, '').trim();
        
        const isCopied = copiedStates[index];

        return (
          <div key={index} className="relative my-6 group">
            <div className="flex items-center justify-between bg-muted border border-b-0 rounded-t-md px-4 py-2">
                <span className="text-xs text-muted-foreground">{language}</span>
                <button 
                    onClick={() => handleCopy(code, index)} 
                    className="text-muted-foreground hover:text-foreground transition-colors p-1 rounded-md"
                    aria-label="Copy code"
                >
                    {isCopied ? <Check className="h-4 w-4" /> : <Clipboard className="h-4 w-4" />}
                </button>
            </div>
            <pre className="font-code bg-card p-4 rounded-b-md overflow-x-auto border !mt-0">
              <code>{code}</code>
            </pre>
          </div>
        );
      }

      // Headings
      if (block.startsWith('#')) {
        const levelMatch = block.match(/^(#+)\s/);
        if (levelMatch) {
            const level = levelMatch[1].length;
            if (level > 0 && level <= 6) {
              const Tag = `h${level}` as keyof JSX.IntrinsicElements;
              const text = block.replace(/^(#+)\s/, '');
              const id = text.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]+/g, '');
              const classNames = [
                'font-headline', 'scroll-mt-20', 'border-b', 'pb-2', 'mb-4',
                level === 1 ? 'text-4xl font-bold mt-8' : '',
                level === 2 ? 'text-3xl font-semibold mt-8' : '',
                level === 3 ? 'text-2xl font-semibold mt-6' : '',
                level === 4 ? 'text-xl font-semibold mt-6' : '',
              ].join(' ');
              return <Tag key={index} id={id} className={classNames}>{text}</Tag>;
            }
        }
      }

      // Blockquotes
      if (block.startsWith('>')) {
        return (
          <blockquote key={index} className="border-l-4 border-primary pl-4 italic text-muted-foreground my-4">
            {block.replace(/^>\s*/gm, '')}
          </blockquote>
        );
      }
      
      // Unordered Lists
      if (block.split('\n').some(line => line.trim().startsWith('* ') || line.trim().startsWith('- '))) {
        const items = block.split('\n').filter(line => line.trim().startsWith('* ') || line.trim().startsWith('- '));
        return (
          <ul key={index} className="list-disc list-outside ml-6 space-y-2 my-4">
            {items.map((item, i) => (
              <li key={i} className="pl-2">{item.replace(/[-*]\s/, '')}</li>
            ))}
          </ul>
        );
      }
      
      // Ordered Lists
      if (block.match(/^\d+\.\s/)) {
        const items = block.split('\n').filter(line => line.match(/^\d+\.\s/));
        return (
          <ol key={index} className="list-decimal list-outside ml-6 space-y-2 my-4">
            {items.map((item, i) => (
              <li key={i} className="pl-2">{item.replace(/^\d+\.\s/, '')}</li>
            ))}
          </ol>
        );
      }

      // Paragraphs with inline code and links
      const paragraphWithInlineElements = block.split(/(`[^`]+`|\[[^\]]+\]\([^\)]+\))/g).map((part, i) => {
        if (part.startsWith('`') && part.endsWith('`')) {
          return <code key={i} className="font-code bg-muted text-foreground rounded-sm px-1.5 py-1 text-sm">{part.slice(1, -1)}</code>;
        }
        const linkMatch = part.match(/\[([^\]]+)\]\(([^)]+)\)/);
        if (linkMatch) {
            return <a key={i} href={linkMatch[2]} className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">{linkMatch[1]}</a>;
        }
        return part;
      });

      return <p key={index} className="leading-7 my-4">{paragraphWithInlineElements}</p>;
    }).filter(Boolean);
  };

  return <div className="prose">{renderContent()}</div>;
};

export default ContentRenderer;
