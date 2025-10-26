import { getPostBySlug, getSortedPosts } from '@/lib/content';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { Calendar, Tag as TagIcon } from 'lucide-react';
import TagBadge from '@/components/tag-badge';
import ContentRenderer from '@/components/content-renderer';
import { format } from 'date-fns';
import type { Metadata } from 'next';

type Props = {
  params: { slug: string }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = getPostBySlug(params.slug)
  if (!post) {
    return {
      title: 'Post Not Found'
    }
  }
 
  return {
    title: `${post.title} | FleFolio`,
    description: post.excerpt,
  }
}

export async function generateStaticParams() {
  const posts = getSortedPosts();
  return posts.map(post => ({
    slug: post.slug,
  }));
}

export default function BlogPostPage({ params }: Props) {
  const post = getPostBySlug(params.slug);

  if (!post) {
    notFound();
  }

  return (
    <article className="max-w-4xl mx-auto">
      <header className="mb-8">
        <div className="relative w-full aspect-[2.5/1] rounded-lg overflow-hidden mb-8">
            <Image 
                src={post.image} 
                alt={post.title} 
                fill 
                className="object-cover"
                priority
                data-ai-hint="blog post header"
            />
        </div>
        <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl text-primary mb-4">
          {post.title}
        </h1>
        <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-muted-foreground">
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            <time dateTime={post.date}>{format(new Date(post.date), "MMMM d, yyyy")}</time>
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            <TagIcon className="h-4 w-4" />
            {post.tags.map(tag => <TagBadge key={tag} tag={tag} />)}
          </div>
        </div>
      </header>

      <ContentRenderer content={post.content} />
      
    </article>
  );
}
