
import { getAllBlogPosts } from '@/lib/api';
import { BlogList } from '@/components/blog-list';

export default function BlogPage() {
  const allPosts = getAllBlogPosts();

  return (
    <section className="container py-12 md:py-16 lg:py-20">
      <div className="flex flex-col items-start gap-4 mb-8">
        <h1 className="font-headline text-3xl font-bold tracking-tighter md:text-5xl">My Blog</h1>
        <p className="text-muted-foreground md:text-lg">
          A collection of my thoughts on technology, design, and development.
        </p>
      </div>
      <BlogList allPosts={allPosts} />
    </section>
  );
}
