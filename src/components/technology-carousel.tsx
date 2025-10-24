
'use client';

import * as React from 'react';
import Autoplay from 'embla-carousel-autoplay';
import { Card, CardContent } from '@/components/ui/card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from '@/components/ui/carousel';
import { FaReact, FaNodeJs, FaFigma, FaGitAlt } from 'react-icons/fa';
import { SiNextdotjs, SiTypescript, SiJavascript, SiTailwindcss, SiFirebase } from "react-icons/si";

const technologies = [
    { name: 'Next.js', icon: <SiNextdotjs className="h-12 w-12" /> },
    { name: 'React', icon: <FaReact className="h-12 w-12" /> },
    { name: 'TypeScript', icon: <SiTypescript className="h-12 w-12" /> },
    { name: 'JavaScript', icon: <SiJavascript className="h-12 w-12" /> },
    { name: 'Tailwind CSS', icon: <SiTailwindcss className="h-12 w-12" /> },
    { name: 'Firebase', icon: <SiFirebase className="h-12 w-12" /> },
    { name: 'Node.js', icon: <FaNodeJs className="h-12 w-12" /> },
    { name: 'Figma', icon: <FaFigma className="h-12 w-12" /> },
    { name: 'Git', icon: <FaGitAlt className="h-12 w-12" /> },
  ];

export function TechnologyCarousel() {
  const plugin = React.useRef(
    Autoplay({ delay: 2000, stopOnInteraction: true })
  );

  return (
    <Carousel
      opts={{
        align: 'start',
        loop: true,
      }}
      plugins={[plugin.current]}
      onMouseEnter={() => plugin.current.stop()}
      onMouseLeave={() => plugin.current.reset()}
      className="w-full max-w-6xl mx-auto mt-12"
    >
      <CarouselContent>
        {technologies.map((tech, index) => (
          <CarouselItem
            key={index}
            className="pt-1 md:basis-1/3 lg:basis-1/4 xl:basis-1/5"
          >
            <div className="p-1">
              <Card>
                <CardContent className="flex aspect-square items-center justify-center p-6 flex-col gap-4">
                  {tech.icon}
                  <span className="text-lg font-medium">{tech.name}</span>
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
}
