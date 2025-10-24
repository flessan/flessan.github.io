'use client';

import React, { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

const words = ['Developer', 'Artist', 'Creator', 'Designer'];

// Fungsi kecil untuk menentukan artikel 'a' atau 'an'
const getArticle = (word) => {
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
      setTimeout(() => setIsDeleting(true), 1000);
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
    }, isDeleting ? 100 : 150);

    return () => clearTimeout(timeout);
  }, [subIndex, index, isDeleting]);

  // Blinking cursor effect
  useEffect(() => {
    const timeout2 = setTimeout(() => {
      setBlink((prev) => !prev);
    }, 500);
    return () => clearTimeout(timeout2);
  }, [blink]);

  return (
    <>
      {/* Menggunakan fungsi getArticle dan kalimat yang lebih mengalir */}
      Hello, I'm {getArticle(words[index])} <span className="text-primary">{text}</span>
      <span className={cn('inline-block w-1 h-8 md:h-12 bg-foreground transition-opacity duration-300', blink ? 'opacity-100' : 'opacity-0')}></span> crafting digital experiences.
    </>
  );
}