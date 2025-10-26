'use client';

import { useState, useMemo } from 'react';
import type { Post } from '@/lib/types';
import BlogPostCard from '@/components/blog-post-card';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import PaginationControls from '@/components/pagination-controls';
import { useSearchParams } from 'next/navigation';

interface BlogClientPageProps {
  allPosts: Post[];
  allTags: string[];
}

const POSTS_PER_PAGE = 6;

export default function BlogClientPage({ allPosts, allTags }: BlogClientPageProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  const searchParams = useSearchParams();
  const page = searchParams.get('page') ?? '1';
  const currentPage = Number(page);

  const filteredPosts = useMemo(() => {
    return allPosts.filter(post => {
      const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            post.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesTag = selectedTag ? post.tags.includes(selectedTag) : true;
      return matchesSearch && matchesTag;
    });
  }, [allPosts, searchTerm, selectedTag]);

  const paginatedPosts = useMemo(() => {
    const start = (currentPage - 1) * POSTS_PER_PAGE;
    const end = start + POSTS_PER_PAGE;
    return filteredPosts.slice(start, end);
  }, [filteredPosts, currentPage]);

  const totalPosts = filteredPosts.length;
  const hasNextPage = (currentPage * POSTS_PER_PAGE) < totalPosts;
  const hasPrevPage = currentPage > 1;

  return (
    <div className="space-y-8">
      <section className="text-center">
        <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl text-primary">Blog</h1>
        <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
          Thoughts on technology, development, and everything in between.
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
            All
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
        {filteredPosts.length === 0 && (
          <div className="text-center py-16 text-muted-foreground">
            <p>No posts found with the current filters.</p>
            <Button variant="link" onClick={() => { setSearchTerm(''); setSelectedTag(null); }}>Clear filters</Button>
          </div>
        )}
      </section>

      {totalPosts > POSTS_PER_PAGE && (
        <PaginationControls
            hasNextPage={hasNextPage}
            hasPrevPage={hasPrevPage}
            totalPosts={totalPosts}
            postsPerPage={POSTS_PER_PAGE}
        />
      )}
    </div>
  );
}
