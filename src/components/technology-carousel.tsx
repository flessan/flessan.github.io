
'use client';

import * as React from 'react';
import Autoplay from 'embla-carousel-autoplay';

import { Card, CardContent } from '@/components/ui/card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from '@/components/ui/carousel';

const technologies = [
    {
      name: 'Next.js',
      logo: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 128 128"
          className="h-12 w-12"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M64 128C99.3462 128 128 99.3462 128 64C128 28.6538 99.3462 0 64 0C28.6538 0 0 28.6538 0 64C0 99.3462 28.6538 128 64 128ZM39.5338 64.0002C39.5338 58.913 40.5218 53.9458 42.4978 49.3302L79.8298 92.5182C77.0378 93.637 73.9898 94.4092 70.7658 94.8582C67.5298 95.323 64.2138 95.5562 60.8698 95.5562C52.2938 95.5562 44.5818 90.9992 39.5338 83.9992V64.0002ZM85.5018 78.6702L48.1698 35.4822C50.9618 34.363 54.0108 33.5902 57.2348 33.1422C60.4708 32.6762 63.7868 32.4432 67.1308 32.4432C75.7068 32.4432 83.4188 37.0002 88.4668 44.0002V58.8582L85.5018 78.6702Z"
          />
        </svg>
      ),
    },
    {
      name: 'React',
      logo: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="-11.5 -10.23174 23 20.46348"
          className="h-12 w-12"
        >
          <circle cx="0" cy="0" r="2.05" fill="currentColor" />
          <g stroke="currentColor" strokeWidth="1" fill="none">
            <ellipse rx="11" ry="4.2" />
            <ellipse rx="11" ry="4.2" transform="rotate(60)" />
            <ellipse rx="11" ry="4.2" transform="rotate(120)" />
          </g>
        </svg>
      ),
    },
    {
      name: 'TypeScript',
      logo: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 128 128"
          className="h-12 w-12"
        >
          <path fill="#007ACC" d="M0 0h128v128H0z" />
          <path
            fill="#FFF"
            d="M23.1 93.2V52.8h11.2v35.6h12.3v4.8H23.1v-4.8zM60.2 63.3c0-4.4 3.5-7.9 7.9-7.9s7.9 3.5 7.9 7.9-3.5 7.9-7.9 7.9-7.9-3.5-7.9-7.9zm11.1 0c0-1.8-1.5-3.3-3.3-3.3s-3.3 1.5-3.3 3.3 1.5 3.3 3.3 3.3 3.3-1.5 3.3-3.3zM49.3 52.8h11.9v4.8h-7.1v10.9h6.4v4.8h-6.4v14.9h-4.8V52.8z"
          />
          <path
            fill="#FFF"
            d="M84.3 80.9c2.6 0 4.7-1.3 6-3.2l3.4 3.1c-2.4 3.1-6.1 5-10.2 5-9.3 0-15.6-6.5-15.6-15.8 0-9.4 6.3-15.9 15.4-15.9 4.3 0 8.1 1.9 10.5 5.1l-3.5 3c-1.6-1.9-3.8-3.1-6.6-3.1-5.7 0-9.8 4.6-9.8 10.9s4.2 10.9 9.8 10.9z"
          />
        </svg>
      ),
    },
    {
      name: 'JavaScript',
      logo: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 128 128"
          className="h-12 w-12"
        >
          <path fill="#F7DF1E" d="M0 0h128v128H0z" />
          <path d="M59.2 101c-3.2 2.3-7.4 3.8-12.1 3.8-11.8 0-20.3-8.2-20.3-20.3 0-11.2 7.7-19.4 19.4-19.4 4.7 0 8.6 1.4 11.7 3.5l-3.9 6.2c-2.2-1.4-4.8-2.3-7.8-2.3-5.7 0-9.6 4-9.6 12 0 8.5 4.3 12.8 10.4 12.8 3.5 0 6.6-1.7 8.3-3.2l4 6.9zM98.6 84.7c0 11.8-7.9 20.3-20.2 20.3-11.2 0-19.2-8.3-19.2-19.5s8-19.6 19.2-19.6c11.8 0 19.4 7.6 19.4 19.6l-.8-.8h-26.6c.4 5.3 4 8.8 9.3 8.8 4.7 0 7.8-2.1 9.4-4.4l7.7 4.6zm-27-7.2h19c-.3-5.2-3.6-8.5-9.4-8.5-5.6 0-9.3 3.4-9.6 8.5z" />
        </svg>
      ),
    },
    {
      name: 'Tailwind CSS',
      logo: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 256 154"
          className="h-12 w-auto"
        >
          <path
            fill="#44A8B3"
            d="M128 0C93.867 0 72.533 17.067 64 51.2 76.8 34.133 91.733 27.733 108.8 32c17.067 4.267 29.867 17.067 42.667 34.133C164.267 51.2 181.333 32 204.8 32c23.467 0 42.667 19.2 42.667 42.667 0 23.466-19.2 42.666-42.667 42.666-19.2 0-34.133-10.666-42.667-25.6-10.667 14.934-27.733 25.6-46.933 25.6-23.467 0-42.667-19.2-42.667-42.666C72.533 19.2 91.733 0 115.2 0c14.933 0 27.733 6.4 36.267 14.933C142.933 6.4 136.533 0 128 0zM51.2 76.8C27.733 76.8 8.533 96 8.533 119.467c0 23.466 19.2 42.666 42.667 42.666 19.2 0 34.133-10.666 42.667-25.6 10.666 14.934 27.733 25.6 46.933 25.6 23.467 0 42.667-19.2 42.667-42.666 0-23.467-19.2-42.667-42.667-42.667-14.933 0-27.733 6.4-36.267 14.933C104.533 83.2 98.133 76.8 89.6 76.8c-17.067 0-29.867 17.067-42.667 34.133C34.133 96 19.2 102.4 0 98.133c14.933 19.2 38.4 32 64 32 23.467 0 42.667-19.2 42.667-42.667 0-23.466-19.2-42.666-42.667-42.666-19.2 0-34.133 10.666-42.667 25.6z"
          />
        </svg>
      ),
    },
    {
      name: 'Firebase',
      logo: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 128 128"
          className="h-12 w-12"
        >
          <path fill="#FFCA28" d="M3.4 103.5l34.4-60-23.1-40H3.4z" />
          <path fill="#FFA000" d="M86.9 2.9l-22.1 38.3 34.4 60.1 22.1-81.2z" />
          <path fill="#F57C00" d="M3.4 103.5l83.5-80.6v101.4z" />
          <path fill="#FFC107" d="M3.4 103.5l34.4-60-11.2-19.4z" />
        </svg>
      ),
    },
    {
      name: 'Node.js',
      logo: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 256 256"
          className="h-12 w-auto"
        >
          <path
            fill="#8CC84B"
            d="M128 0C57.3 0 0 57.3 0 128s57.3 128 128 128 128-57.3 128-128S198.7 0 128 0zm43.4 188.7c-2.4 4.5-5.7 8.2-9.7 11.2-5.9 4.3-12.8 6.5-20.7 6.5-10.4 0-19.8-3.5-27.9-10.4-8.1-6.9-12.2-16-12.2-27.3s4.1-20.4 12.2-27.3c8.1-6.9 17.5-10.4 27.9-10.4 7.9 0 14.8 2.1 20.7 6.4 4 3 7.3 6.7 9.7 11.2l-20.8 12.1c-.8-2.1-2-3.8-3.7-5.1-2.2-1.7-4.9-2.5-8.2-2.5-4.5 0-8.4 1.7-11.7 5.1-3.3 3.4-5 7.8-5 13.1 0 5.4 1.7 9.8 5 13.1 3.3 3.4 7.2 5.1 11.7 5.1 3.3 0 6-1 8.2-2.9 1.7-1.3 2.9-3.2 3.7-5.6l20.8 12z"
          />
        </svg>
      ),
    },
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
                  {tech.logo}
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
