import { getPostBySlug, getSortedPosts } from '@/lib/content';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { Calendar, Tag as TagIcon, Clock } from 'lucide-react';
import TagBadge from '@/components/tag-badge';
import ContentRenderer from '@/components/content-renderer';
import { format } from 'date-fns';
import type { Metadata } from 'next';
import ShareButtons from '@/components/share-buttons';
import ReadingProgress from '@/components/reading-progress';
import { MobileTocAccordion } from '@/components/mobile-toc-accordion';
import TableOfContents from '@/components/table-of-contents';

type Props = {
  params: { slug: string }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = await getPostBySlug(params.slug)
  if (!post) {
    return {
      title: 'Post Not Found'
    }
  }
 
  return {
    title: post.title,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      type: 'article',
      url: `/blog/${post.slug}`,
      images: [
        {
          url: post.image || '',
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    }
  }
}

export async function generateStaticParams() {
  const posts = await getSortedPosts();
  return posts.map(post => ({
    slug: post.slug,
  }));
}

export default async function BlogPostPage({ params }: Props) {
  const post = await getPostBySlug(params.slug);

  if (!post) {
    notFound();
  }

  return (
    <>
      <ReadingProgress />
      <div className="grid grid-cols-1 lg:grid-cols-[1fr,280px] lg:gap-12">
        <article className="w-full max-w-4xl mx-auto">
          <header className="mb-8">
            {post.image && (
              <div className="relative w-full aspect-[2.5/1] rounded-lg overflow-hidden mb-8 shadow-lg">
                  <Image 
                      src={post.image} 
                      alt={post.title} 
                      fill 
                      className="object-cover"
                      priority
                      data-ai-hint="blog post header"
                  />
              </div>
            )}
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight text-primary mb-4">
              {post.title}
            </h1>
            <div className="flex flex-wrap items-center gap-x-6 gap-y-4 text-muted-foreground">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                <time dateTime={post.date}>{format(new Date(post.date), "MMMM d, yyyy")}</time>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                <span>{post.readingTime} min read</span>
              </div>
              <div className="flex items-center gap-2 flex-wrap">
                <TagIcon className="h-4 w-4" />
                {post.tags.map(tag => <TagBadge key={tag} tag={tag} />)}
              </div>
            </div>
          </header>

          <MobileTocAccordion headings={post.headings} />
          
          <ContentRenderer content={post.content} />

          <footer className="mt-12 pt-8 border-t">
            <ShareButtons url={`/blog/${post.slug}`} title={post.title} />
          </footer>
          
        </article>
        <aside className="hidden lg:block lg:sticky top-24 self-start">
          <TableOfContents headings={post.headings} />
        </aside>
      </div>
    </>
  );
}
