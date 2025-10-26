import { getProjectBySlug, getSortedProjects } from '@/lib/content';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { Github, Globe, Tag as TagIcon } from 'lucide-react';
import TagBadge from '@/components/tag-badge';
import ContentRenderer from '@/components/content-renderer';
import type { Metadata } from 'next';
import ShareButtons from '@/components/share-buttons';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

type Props = {
  params: { slug: string }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const project = await getProjectBySlug(params.slug)
  if (!project) {
    return {
      title: 'Project Not Found'
    }
  }
 
  return {
    title: `${project.title} | FleFolio`,
    description: project.description,
  }
}

export async function generateStaticParams() {
  const projects = await getSortedProjects();
  return projects.map(project => ({
    slug: project.slug,
  }));
}

export default async function ProjectPage({ params }: Props) {
  const project = await getProjectBySlug(params.slug);

  if (!project) {
    notFound();
  }

  const postUrl = typeof window !== 'undefined' ? window.location.href : `https://flefolio.dev/projects/${project.slug}`;

  return (
    <article className="max-w-4xl mx-auto">
      <header className="mb-8">
        <div className="relative w-full aspect-video rounded-lg overflow-hidden mb-8">
            <Image 
                src={project.image} 
                alt={project.title} 
                fill 
                className="object-cover"
                priority
                data-ai-hint="project hero image"
            />
        </div>
        <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl text-primary mb-4">
          {project.title}
        </h1>
        <p className="text-lg text-muted-foreground mt-2 mb-4">{project.description}</p>
        <div className="flex flex-wrap items-center gap-x-6 gap-y-4 text-muted-foreground">
          <div className="flex items-center gap-2 flex-wrap">
            <TagIcon className="h-4 w-4" />
            {project.tags.map(tag => <TagBadge key={tag} tag={tag} />)}
          </div>
          <div className="flex items-center gap-2">
            {project.liveUrl && (
              <Button variant="outline" size="sm" asChild>
                <Link href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                  <Globe className="mr-2 h-4 w-4" />
                  Live Demo
                </Link>
              </Button>
            )}
            {project.repoUrl && (
              <Button variant="outline" size="sm" asChild>
                <Link href={project.repoUrl} target="_blank" rel="noopener noreferrer">
                  <Github className="mr-2 h-4 w-4" />
                  GitHub Repo
                </Link>
              </Button>
            )}
          </div>
        </div>
      </header>

      <ContentRenderer content={project.content} />
      
      <footer className="mt-12 pt-8 border-t">
        <ShareButtons url={postUrl} title={project.title} />
      </footer>
    </article>
  );
}
