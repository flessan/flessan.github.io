import { projects } from '@/lib/data';
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
  return projects.map((project) => ({
    slug: project.slug,
  }));
}

export async function generateMetadata({ params }: ProjectPageProps) {
  const project = projects.find((p) => p.slug === params.slug);

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

const MarkdownContent = ({ content }: { content: string }) => {
    const lines = content.trim().split('\n');
    let inCodeBlock = false;
    let codeContent = '';
    const elements: React.ReactNode[] = [];

    for (let i = 0; i < lines.length; i++) {
        const line = lines[i];

        if (line.startsWith('```')) {
            if (inCodeBlock) {
                elements.push(
                    <pre key={`code-${i}`} className="bg-muted p-4 rounded-md my-4 text-sm font-code overflow-x-auto">
                        <code>{codeContent.trim()}</code>
                    </pre>
                );
                codeContent = '';
            }
            inCodeBlock = !inCodeBlock;
            continue;
        }

        if (inCodeBlock) {
            codeContent += line + '\n';
            continue;
        }
        
        if (line.trim() === '') continue;

        if (line.startsWith('### ')) {
            elements.push(<h3 key={i} className="font-headline text-xl font-bold mt-6 mb-2">{line.substring(4)}</h3>);
        } else if (line.startsWith('## ')) {
            elements.push(<h2 key={i} className="font-headline text-2xl font-bold mt-8 mb-3">{line.substring(3)}</h2>);
        } else if (line.startsWith('- ')) {
            elements.push(<li key={i} className="ml-4 list-disc">{line.substring(2)}</li>);
        } else {
            elements.push(<p key={i} className="mb-4 leading-relaxed">{line}</p>);
        }
    }
    
    return <div className="max-w-none text-foreground">{elements}</div>;
};


export default function ProjectPage({ params }: ProjectPageProps) {
  const project = projects.find((p) => p.slug === params.slug);

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

      <div className="mt-12">
        <MarkdownContent content={project.content} />
      </div>
    </article>
  );
}
