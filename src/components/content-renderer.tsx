'use client';

import React from 'react';

interface ContentRendererProps {
  content: string;
}

const ContentRenderer: React.FC<ContentRendererProps> = ({ content }) => {
  const renderContent = () => {
    if (!content) return null;

    const blocks = content.split(/(\n```[\s\S]*?```\n|\n\s*\n)/);

    return blocks.map((block, index) => {
      if (!block || block.trim() === '') return null;

      // Code blocks
      if (block.startsWith('\n```') && block.endsWith('```\n')) {
        const language = (block.match(/```(\w+)/) || [])[1] || '';
        const code = block.replace(/```\w*\n/g, '').replace(/```/g, '').trim();
        return (
          <div key={index} className="relative my-6">
            {language && <span className="absolute top-2 right-4 text-xs text-muted-foreground">{language}</span>}
            <pre className="font-code bg-card p-4 rounded-md overflow-x-auto border">
              <code>{code}</code>
            </pre>
          </div>
        );
      }

      // Headings
      if (block.startsWith('#')) {
        const level = (block.match(/^(#+)\s/) || ['',''])[1].length;
        if (level > 0 && level <= 6) {
          const Tag = `h${level}` as keyof JSX.IntrinsicElements;
          const text = block.replace(/^(#+)\s/, '');
          const id = text.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]+/g, '');
          return <Tag key={index} id={id} className="font-headline scroll-mt-20">{text}</Tag>;
        }
      }

      // Blockquotes
      if (block.startsWith('>')) {
        return (
          <blockquote key={index} className="border-l-4 border-accent pl-4 italic text-muted-foreground my-4">
            {block.replace(/^>\s*/gm, '')}
          </blockquote>
        );
      }
      
      // Unordered Lists
      if (block.startsWith('* ') || block.startsWith('- ')) {
        const items = block.split('\n').filter(line => line.trim().startsWith('* ') || line.trim().startsWith('- '));
        return (
          <ul key={index} className="list-disc list-outside ml-6 space-y-2 my-4">
            {items.map((item, i) => (
              <li key={i}>{item.replace(/[-*]\s/, '')}</li>
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
              <li key={i}>{item.replace(/^\d+\.\s/, '')}</li>
            ))}
          </ol>
        );
      }

      // Paragraphs
      return <p key={index} className="leading-7 my-4">{block}</p>;
    }).filter(Boolean);
  };

  return <div className="prose">{renderContent()}</div>;
};

export default ContentRenderer;
