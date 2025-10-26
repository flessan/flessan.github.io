import { getSortedPosts } from '@/lib/content';
import BlogClientPage from './blog-client-page';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Blog',
  description: 'Thoughts and tutorials on web development, software engineering, and technology from a student developer.',
};

export default async function BlogPage() {
  const allPosts = await getSortedPosts();

  const allTags = Array.from(
    new Set(allPosts.flatMap(post => post.tags))
  ).sort();

  return <BlogClientPage allPosts={allPosts} allTags={allTags} />;
}
