'use client';

import { useState } from 'react';
import { Linkedin, Twitter, Link, Check } from 'lucide-react';
import { Button } from './ui/button';
import { useToast } from '@/hooks/use-toast';

const TelegramIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
    <path d="M22 2 11 13" />
    <path d="m22 2-7 20-4-9-9-4 20-7z" />
  </svg>
);

const WhatsAppIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
        <path d="M22 12-4.22 16.32a.55.55 0 0 1-.32-.9L17.44 3.7a.55.55 0 0 1 .9.32Z"/>
        <path d="M4.22 16.32 1.43 14.07a.55.55 0 0 1 .32-.9L6.1 11.9"/>
        <path d="m3.14 12.35 1.1 4.54a.55.55 0 0 0 .9.32l2.45-2.45"/>
    </svg>
);


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
      icon: <TelegramIcon />,
    },
    {
      name: 'WhatsApp',
      url: `https://api.whatsapp.com/send?text=${encodedTitle}%20${encodedUrl}`,
      icon: <WhatsAppIcon />,
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
