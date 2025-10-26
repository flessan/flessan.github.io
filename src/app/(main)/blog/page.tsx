'use client'

import { useState, useMemo } from 'react';
import { getSortedPosts } from '@/lib/content';
import type { Post } from '@/lib/types';
import BlogPostCard from '@/components/blog-post-card';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';
import TagBadge from '@/components/tag-badge';
import { Button } from '@/components/ui/button';
import { useSearchParams } from 'next/navigation';
import PaginationControls from '@/components/pagination-controls';

export default function BlogPage() {
  // We fetch all posts, but do it in a client component context.
  // For a real app with many posts, this should be paginated on the server.
  // However, `getSortedPosts` runs at build time or on the server, so it's pre-fetched.
  // We'll just manage the client-side view of this static data.
  const allPosts: Post[] = getSortedPosts();

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  const searchParams = useSearchParams();
  const page = searchParams.get('page') ?? '1';
  const postsPerPage = 6;
  const currentPage = Number(page);

  const allTags = useMemo(() => {
    const tags = new Set<string>();
    allPosts.forEach(post => post.tags.forEach(tag => tags.add(tag)));
    return Array.from(tags);
  }, [allPosts]);

  const filteredPosts = useMemo(() => {
    return allPosts.filter(post => {
      const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            post.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesTag = selectedTag ? post.tags.includes(selectedTag) : true;
      return matchesSearch && matchesTag;
    });
  }, [allPosts, searchTerm, selectedTag]);

  const paginatedPosts = useMemo(() => {
    const start = (currentPage - 1) * postsPerPage;
    const end = start + postsPerPage;
    return filteredPosts.slice(start, end);
  }, [filteredPosts, currentPage, postsPerPage]);
  
  const hasNextPage = (currentPage * postsPerPage) < filteredPosts.length;
  const hasPrevPage = currentPage > 1;

  return (
    <div className="space-y-8">
      <section className="text-center">
        <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl text-primary">Blog</h1>
        <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
          Thoughts on web development, technology, and beyond.
        </p>
      </section>

      <section className="space-y-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search posts..."
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex flex-wrap gap-2">
            <Button 
                variant={selectedTag === null ? 'default' : 'outline'}
                onClick={() => setSelectedTag(null)}
                className="transition-all"
            >
                All Posts
            </Button>
          {allTags.map(tag => (
            <Button
              key={tag}
              variant={selectedTag === tag ? 'default' : 'outline'}
              onClick={() => setSelectedTag(tag)}
              className="transition-all"
            >
              {tag}
            </Button>
          ))}
        </div>
      </section>

      <section>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {paginatedPosts.map(post => (
            <BlogPostCard key={post.slug} post={post} />
          ))}
        </div>
        {paginatedPosts.length === 0 && (
            <div className="text-center py-16 text-muted-foreground">
                <p>No posts found.</p>
                <Button variant="link" onClick={() => { setSearchTerm(''); setSelectedTag(null); }}>Clear filters</Button>
            </div>
        )}
      </section>

      {filteredPosts.length > postsPerPage && (
        <PaginationControls
          hasNextPage={hasNextPage}
          hasPrevPage={hasPrevPage}
          totalPosts={filteredPosts.length}
          postsPerPage={postsPerPage}
        />
      )}
    </div>
  );
}
