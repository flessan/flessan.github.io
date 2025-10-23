import Image from 'next/image';
import Link from 'next/link';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { projects } from '@/lib/data';
import { ArrowRight } from 'lucide-react';

export const metadata = {
  title: 'Projects | MinimalFolio',
  description: 'A collection of my projects.',
};

export default function ProjectsPage() {
  return (
    <section className="container py-12 md:py-16 lg:py-20">
      <div className="flex flex-col items-start gap-4">
        <h1 className="font-headline text-3xl font-bold tracking-tighter md:text-5xl">My Projects</h1>
        <p className="text-muted-foreground md:text-lg">
          A showcase of my work in web development and design.
        </p>
      </div>
      <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((project) => (
          <Link href={`/projects/${project.slug}`} key={project.slug} className="group">
            <Card className="h-full overflow-hidden transition-all group-hover:shadow-xl">
              <CardHeader className="p-0">
                <div className="aspect-video relative">
                  <Image
                    src={project.image.imageUrl}
                    alt={project.image.description}
                    fill
                    className="object-cover transition-transform group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    data-ai-hint={project.image.imageHint}
                  />
                </div>
              </CardHeader>
              <CardContent className="p-6">
                <CardTitle className="font-headline text-xl">{project.title}</CardTitle>
                <CardDescription className="mt-2">{project.description}</CardDescription>
                <div className="mt-4 flex items-center text-sm font-medium text-primary">
                  View Details <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </section>
  );
}
