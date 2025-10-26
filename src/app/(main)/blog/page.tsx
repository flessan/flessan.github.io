import { getSortedPosts } from '@/lib/content';
import BlogClientPage from './blog-client-page';

export default async function BlogPage() {
  const allPosts = getSortedPosts();

  const allTags = Array.from(
    new Set(allPosts.flatMap(post => post.tags))
  ).sort();

  return <BlogClientPage allPosts={allPosts} allTags={allTags} />;
}
