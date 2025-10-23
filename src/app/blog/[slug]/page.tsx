import { blogPosts } from '@/lib/data';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { format } from 'date-fns';

type BlogPostPageProps = {
  params: {
    slug: string;
  };
};

export async function generateStaticParams() {
  return blogPosts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: BlogPostPageProps) {
  const post = blogPosts.find((p) => p.slug === params.slug);

  if (!post) {
    return {
      title: 'Post Not Found',
    };
  }

  return {
    title: `${post.title} | MinimalFolio`,
    description: post.excerpt,
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

export default function BlogPostPage({ params }: BlogPostPageProps) {
  const post = blogPosts.find((p) => p.slug === params.slug);

  if (!post) {
    notFound();
  }

  return (
    <article className="container max-w-3xl py-12 md:py-16 lg:py-20">
      <div className="space-y-2 mb-8 text-center">
        <h1 className="font-headline text-3xl font-bold tracking-tighter md:text-5xl">{post.title}</h1>
        <p className="text-muted-foreground">
          Posted on {format(new Date(post.date), 'MMMM d, yyyy')}
        </p>
      </div>

      <div className="my-8 aspect-video relative overflow-hidden rounded-lg shadow-lg">
        <Image
          src={post.image.imageUrl}
          alt={post.image.description}
          fill
          className="object-cover"
          priority
          sizes="100vw"
          data-ai-hint={post.image.imageHint}
        />
      </div>

      <div className="mt-12">
        <MarkdownContent content={post.content} />
      </div>
    </article>
  );
}
