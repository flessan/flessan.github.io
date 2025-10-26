'use client'

import { useState, useMemo, useEffect } from 'react';
import { getSortedPosts } from '@/lib/content';
import type { Post } from '@/lib/types';
import BlogPostCard from '@/components/blog-post-card';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function BlogPage() {
  const [allPosts, setAllPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    getSortedPosts().then(posts => {
      setAllPosts(posts);
      setIsLoading(false);
    })
  }, []);

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  const allTags = useMemo(() => {
    const tags = new Set<string>();
    allPosts.forEach(post => post.tags.forEach(tag => tags.add(tag)));
    return Array.from(tags).sort();
  }, [allPosts]);

  const filteredPosts = useMemo(() => {
    return allPosts.filter(post => {
      const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            (post.excerpt && post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()));
      const matchesTag = selectedTag ? post.tags.includes(selectedTag) : true;
      return matchesSearch && matchesTag;
    });
  }, [allPosts, searchTerm, selectedTag]);

  if (isLoading) {
    return (
      <div className="space-y-8">
        <section className="text-center">
          <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl text-primary">Blog</h1>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
            Thoughts on web development, technology, and beyond.
          </p>
        </section>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="space-y-4">
                    <div className="bg-muted aspect-[2/1] w-full rounded-lg"></div>
                    <div className="space-y-2">
                        <div className="bg-muted h-4 w-1/4 rounded"></div>
                        <div className="bg-muted h-6 w-3/4 rounded"></div>
                        <div className="bg-muted h-4 w-full rounded"></div>
                        <div className="bg-muted h-4 w-5/6 rounded"></div>
                    </div>
                </div>
            ))}
        </div>
      </div>
    );
  }

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
          {filteredPosts.map(post => (
            <BlogPostCard key={post.slug} post={post} />
          ))}
        </div>
        {filteredPosts.length === 0 && (
            <div className="text-center py-16 text-muted-foreground">
                <p>No posts found.</p>
                <Button variant="link" onClick={() => { setSearchTerm(''); setSelectedTag(null); }}>Clear filters</Button>
            </div>
        )}
      </section>
    </div>
  );
}
