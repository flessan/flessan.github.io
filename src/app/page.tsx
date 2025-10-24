import Image from 'next/image';
import Link from 'next/link';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { getAllProjects, getAboutMeImage } from '@/lib/api';
import { ArrowRight } from 'lucide-react';

export default function Home() {
  const featuredProjects = getAllProjects().slice(0, 2);
  const aboutMeImage = getAboutMeImage();

  return (
    <div className="flex flex-col gap-12 md:gap-20 lg:gap-24">
      <section className="container grid items-center gap-8 pt-6 md:py-12 lg:grid-cols-2">
        <div className="flex flex-col gap-4">
          <h1 className="font-headline text-3xl font-bold tracking-tighter md:text-5xl lg:text-6xl">
            A Developer and Designer Crafting Digital Experiences
          </h1>
          <p className="max-w-[600px] text-muted-foreground md:text-xl">
            I'm a passionate developer with a keen eye for design, specializing in building modern, responsive, and user-friendly web applications. Explore my work and get in touch.
          </p>
          <div className="flex gap-4">
            <Button asChild size="lg">
              <Link href="/projects">View My Projects</Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/blog">Read My Blog</Link>
            </Button>
          </div>
        </div>
        <div className="flex items-center justify-center">
          <Image
            src={aboutMeImage.imageUrl}
            alt={aboutMeImage.description}
            width={400}
            height={400}
            className="rounded-full aspect-square object-cover shadow-lg"
            data-ai-hint={aboutMeImage.imageHint}
            priority
          />
        </div>
      </section>

      <section className="container pb-12 md:pb-16 lg:pb-20">
        <div className="flex flex-col items-start gap-4">
          <h2 className="font-headline text-2xl font-bold tracking-tighter md:text-4xl">Featured Projects</h2>
          <p className="text-muted-foreground md:text-lg">Here are a few projects I've worked on recently.</p>
        </div>
        <div className="mt-8 grid gap-8 md:grid-cols-2">
          {featuredProjects.map((project) => (
            <Link href={`/projects/${project.slug}`} key={project.slug} className="group">
              <Card className="h-full overflow-hidden transition-all group-hover:shadow-xl">
                <CardHeader className="p-0">
                  <div className="aspect-video relative">
                    <Image
                      src={project.image.imageUrl}
                      alt={project.image.description}
                      fill
                      className="object-cover transition-transform group-hover:scale-105"
                      data-ai-hint={project.image.imageHint}
                       sizes="(max-width: 768px) 100vw, 50vw"
                    />
                  </div>
                </CardHeader>
                <CardContent className="p-6">
                  <CardTitle className="font-headline text-xl">{project.title}</CardTitle>
                  <CardDescription className="mt-2">{project.description}</CardDescription>
                  <div className="mt-4 flex items-center text-sm font-medium text-accent-foreground dark:text-accent">
                    View Project <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
        <div className="mt-8 flex justify-center">
            <Button asChild variant="link" className="text-lg text-accent-foreground dark:text-accent">
                <Link href="/projects">
                    View All Projects
                    <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
            </Button>
        </div>
      </section>
    </div>
  );
}
