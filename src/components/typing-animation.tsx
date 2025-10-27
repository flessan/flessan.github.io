"use client";

import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

interface TypingAnimationProps {
  phrases: string[];
  className?: string;
  typingSpeed?: number;
  deletingSpeed?: number;
  delay?: number;
}

export default function TypingAnimation({
  phrases,
  className,
  typingSpeed = 100,
  deletingSpeed = 50,
  delay = 1500,
}: TypingAnimationProps) {
  const [text, setText] = useState('');
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const handleTyping = () => {
      const currentPhrase = phrases[phraseIndex];
      
      if (isDeleting) {
        // Deleting text
        if (text.length > 0) {
          setText(currentPhrase.substring(0, text.length - 1));
        } else {
          setIsDeleting(false);
          setPhraseIndex((prevIndex) => (prevIndex + 1) % phrases.length);
        }
      } else {
        // Typing text
        if (text.length < currentPhrase.length) {
          setText(currentPhrase.substring(0, text.length + 1));
        } else {
          // Phrase typed, wait then start deleting
          setTimeout(() => setIsDeleting(true), delay);
        }
      }
    };

    const typingTimeout = setTimeout(handleTyping, isDeleting ? deletingSpeed : typingSpeed);
    return () => clearTimeout(typingTimeout);
  }, [text, isDeleting, phraseIndex, phrases, typingSpeed, deletingSpeed, delay]);

  return (
    <span className={cn(className)}>
      {text}
      <span className="typing-cursor"></span>
    </span>
  );
}
