"use client";

import { useEffect, useState } from 'react';

export default function ReadingProgress() {
  const [width, setWidth] = useState(0);

  useEffect(() => {
    const scrollHandler = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrolled = window.scrollY;
      const progress = (scrolled / scrollHeight) * 100;
      setWidth(progress > 100 ? 100 : progress);
    };

    window.addEventListener('scroll', scrollHandler);
    return () => window.removeEventListener('scroll', scrollHandler);
  }, []);

  return (
    <div className="fixed top-16 left-0 w-full h-1 z-50 bg-transparent">
        <div 
            className="h-full bg-primary transition-all duration-150 ease-out" 
            style={{ width: `${width}%` }}
        />
    </div>
  );
}
