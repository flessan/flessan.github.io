import { getProjectWithContent, getAllProjects } from '@/lib/api';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Github, ExternalLink } from 'lucide-react';

type ProjectPageProps = {
  params: {
    slug: string;
  };
};

export async function generateStaticParams() {
  const projects = getAllProjects();
  return projects.map((project) => ({
    slug: project.slug,
  }));
}

export async function generateMetadata({ params }: ProjectPageProps) {
  const project = await getProjectWithContent(params.slug);

  if (!project) {
    return {
      title: 'Project Not Found',
    };
  }

  return {
    title: `${project.title} | MinimalFolio`,
    description: project.description,
  };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const project = await getProjectWithContent(params.slug);

  if (!project) {
    notFound();
  }

  return (
    <article className="container max-w-4xl py-12 md:py-16 lg:py-20">
      <div className="space-y-4">
        <h1 className="font-headline text-3xl font-bold tracking-tighter md:text-5xl">{project.title}</h1>
        <p className="text-lg text-muted-foreground">{project.description}</p>
        
        {project.links && (
            <div className="flex gap-4 pt-2">
                {project.links.github && (
                    <Button asChild variant="outline">
                        <Link href={project.links.github} target="_blank" rel="noopener noreferrer">
                            <Github className="mr-2" />
                            GitHub
                        </Link>
                    </Button>
                )}
                {project.links.live && (
                    <Button asChild>
                        <Link href={project.links.live} target="_blank" rel="noopener noreferrer">
                            <ExternalLink className="mr-2" />
                            Live Demo
                        </Link>
                    </Button>
                )}
            </div>
        )}
      </div>

      <div className="my-8 aspect-video relative overflow-hidden rounded-lg shadow-lg">
        <Image
          src={project.detailImage.imageUrl}
          alt={project.detailImage.description}
          fill
          className="object-cover"
          priority
          sizes="100vw"
          data-ai-hint={project.detailImage.imageHint}
        />
      </div>

      <div 
        className="mt-12 max-w-none prose dark:prose-invert"
        dangerouslySetInnerHTML={{ __html: project.content }}
       />

    </article>
  );
}
