
import { getBlogPostWithContent, getAllBlogPosts } from '@/lib/api';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { format } from 'date-fns';
import { GiscusComments } from '@/components/giscus-comments';
import { Separator } from '@/components/ui/separator';

type BlogPostPageProps = {
  params: {
    slug: string;
  };
};

export async function generateStaticParams() {
  const posts = getAllBlogPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: BlogPostPageProps) {
  const post = await getBlogPostWithContent(params.slug);

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

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const post = await getBlogPostWithContent(params.slug);

  if (!post) {
    notFound();
  }

  return (
    <>
      <article className="container max-w-3xl py-12 md:py-16 lg:py-20">
        <div className="space-y-2 mb-8 text-center">
          <h1 className="font-headline text-3xl font-bold tracking-tighter md:text-5xl">{post.title}</h1>
          <p className="text-muted-foreground">
            Posted on {format(new Date(post.date), 'MMMM d, yyyy')}
          </p>
        </div>

        <div className="my-8 aspect-video relative overflow-hidden rounded-lg shadow-lg">
          <Image
            src={post.image}
            alt={post.title}
            fill
            className="object-cover"
            priority
            sizes="100vw"
            data-ai-hint={post.title}
          />
        </div>

        <div 
          className="mt-12 max-w-none prose dark:prose-invert" 
          dangerouslySetInnerHTML={{ __html: post.content }} 
        />
        
        <Separator className="my-12" />

        <GiscusComments />
      </article>
    </>
  );
}
