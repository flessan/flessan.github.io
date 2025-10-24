'use client';

import React, { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

const words = ['Developer', 'Artist', 'Content Creator', 'Programmer'];

const getArticle = (word: string) => {
  if (!word) return 'a';
  return ['a', 'e', 'i', 'o', 'u'].includes(word[0].toLowerCase()) ? 'an' : 'a';
};

export function AnimatedHeadline() {
  const [index, setIndex] = useState(0);
  const [subIndex, setSubIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [text, setText] = useState('');
  const [blink, setBlink] = useState(true);

  // Typing effect
  useEffect(() => {
    if (index === words.length) {
      return;
    }

    if (subIndex === words[index].length + 1 && !isDeleting) {
      setTimeout(() => setIsDeleting(true), 2000); // Longer pause
      return;
    }

    if (subIndex === 0 && isDeleting) {
      setIsDeleting(false);
      setIndex((prev) => (prev + 1) % words.length);
      return;
    }

    const timeout = setTimeout(() => {
      setSubIndex((prev) => prev + (isDeleting ? -1 : 1));
      setText(words[index].substring(0, subIndex));
    }, isDeleting ? 75 : 125);

    return () => clearTimeout(timeout);
  }, [subIndex, index, isDeleting]);

  // Blinking cursor effect
  useEffect(() => {
    const timeout2 = setTimeout(() => {
      setBlink((prev) => !prev);
    }, 500);
    return () => clearTimeout(timeout2);
  }, [blink]);

  const currentWord = words[index] || '';
  const article = getArticle(currentWord);

  return (
    <>
      I am {article} <span className="text-primary">{text}</span>
      <span className={cn('inline-block w-1 h-8 md:h-12 bg-foreground transition-opacity duration-300 ml-1', blink ? 'opacity-100' : 'opacity-0')}></span>
      <br />
      Crafting Digital Experiences.
    </>
  );
}
