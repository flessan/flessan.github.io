'use client';

import { useState } from 'react';
import { Linkedin, Twitter, Link, Check, Send, MessageCircle } from 'lucide-react';
import { Button } from './ui/button';
import { useToast } from '@/hooks/use-toast';

interface ShareButtonsProps {
  url: string;
  title: string;
}

export default function ShareButtons({ url, title }: ShareButtonsProps) {
  const { toast } = useToast();
  const [copied, setCopied] = useState(false);
  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);

  const handleCopy = () => {
    navigator.clipboard.writeText(url).then(() => {
      setCopied(true);
      toast({ title: 'Link Copied!', description: 'The post URL has been copied to your clipboard.' });
      setTimeout(() => setCopied(false), 2000);
    }, () => {
      toast({ variant: 'destructive', title: 'Failed to copy', description: 'Could not copy link to clipboard.' });
    });
  };

  const shareLinks = [
    {
      name: 'X',
      url: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
      icon: <Twitter />,
    },
    {
      name: 'LinkedIn',
      url: `https://www.linkedin.com/shareArticle?mini=true&url=${encodedUrl}&title=${encodedTitle}`,
      icon: <Linkedin />,
    },
    {
      name: 'Telegram',
      url: `https://t.me/share/url?url=${encodedUrl}&text=${encodedTitle}`,
      icon: <Send />,
    },
    {
      name: 'WhatsApp',
      url: `https://api.whatsapp.com/send?text=${encodedTitle}%20${encodedUrl}`,
      icon: <MessageCircle />,
    },
  ];

  return (
    <div className="flex items-center gap-4">
      <p className="text-sm font-medium text-muted-foreground">Share this post:</p>
      <div className="flex items-center gap-2">
        {shareLinks.map((link) => (
          <Button
            key={link.name}
            variant="outline"
            size="icon"
            asChild
          >
            <a href={link.url} target="_blank" rel="noopener noreferrer" aria-label={`Share on ${link.name}`}>
              {link.icon}
            </a>
          </Button>
        ))}
        <Button
            variant="outline"
            size="icon"
            onClick={handleCopy}
            aria-label="Copy link"
        >
            {copied ? <Check className="h-5 w-5 text-green-500" /> : <Link className="h-5 w-5" />}
        </Button>
      </div>
    </div>
  );
}
