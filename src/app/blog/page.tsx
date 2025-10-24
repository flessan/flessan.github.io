'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import { getAllBlogPosts, BlogPost } from '@/lib/api';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { ArrowRight } from 'lucide-react';
import { format } from 'date-fns';

export default function BlogPage() {
  const [allPosts, setAllPosts] = useState<BlogPost[]>([]);
  const [filteredPosts, setFilteredPosts] = useState<BlogPost[]>([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const posts = getAllBlogPosts();
    setAllPosts(posts);
    setFilteredPosts(posts);
  }, []);

  useEffect(() => {
    const results = allPosts.filter(post =>
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredPosts(results);
  }, [searchTerm, allPosts]);
  
  return (
    <section className="container py-12 md:py-16 lg:py-20">
      <div className="flex flex-col items-start gap-4 mb-8">
        <h1 className="font-headline text-3xl font-bold tracking-tighter md:text-5xl">My Blog</h1>
        <p className="text-muted-foreground md:text-lg">
          A collection of my thoughts on technology, design, and development.
        </p>
      </div>

      <div className="mb-12 max-w-xl">
        <Input
          type="text"
          placeholder="Search articles..."
          className="w-full"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {filteredPosts.length > 0 ? (
          filteredPosts.map((post) => (
            <Link href={`/blog/${post.slug}`} key={post.slug} className="group">
              <Card className="flex flex-col h-full transition-all group-hover:shadow-xl overflow-hidden">
                 <CardHeader className="p-0">
                  <div className="aspect-video relative">
                    <Image
                      src={post.image}
                      alt={post.title}
                      fill
                      className="object-cover transition-transform group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      data-ai-hint={post.title}
                    />
                  </div>
                </CardHeader>
                <div className="p-6 flex flex-col flex-grow">
                  <CardTitle className="font-headline text-2xl">{post.title}</CardTitle>
                  <p className="text-sm text-muted-foreground mt-2">
                    {format(new Date(post.date), 'MMMM d, yyyy')}
                  </p>
                  <CardDescription className="mt-4 flex-grow">{post.excerpt}</CardDescription>
                  <CardFooter className="p-0 pt-4 mt-auto">
                    <div className="flex items-center text-sm font-medium text-accent-foreground dark:text-accent">
                      Read More <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </div>
                  </CardFooter>
                </div>
              </Card>
            </Link>
          ))
        ) : (
          <p className="text-center text-muted-foreground col-span-full">No articles found.</p>
        )}
      </div>
    </section>
  );
}
