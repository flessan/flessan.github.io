"use client"

import type { Post } from "@/lib/types";
import Link from "next/link";
import Image from "next/image";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, Calendar, Tag as TagIcon } from "lucide-react";
import TagBadge from "@/components/tag-badge";
import { format } from "date-fns";

interface BlogPostCardProps {
  post: Post;
}

export default function BlogPostCard({ post }: BlogPostCardProps) {
  return (
    <Card className="flex flex-col h-full overflow-hidden transition-all duration-300 hover:shadow-primary/20 hover:shadow-lg hover:-translate-y-1">
      <Link href={`/blog/${post.slug}`} className="block">
        <CardHeader className="p-0">
          <div className="relative aspect-[2/1] w-full">
            <Image
              src={post.image}
              alt={post.title}
              fill
              className="object-cover"
              data-ai-hint="developer coding"
            />
          </div>
        </CardHeader>
      </Link>
      <CardContent className="p-6 flex-grow">
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
            <Calendar className="w-4 h-4" />
            <time dateTime={post.date}>{format(new Date(post.date), "MMMM d, yyyy")}</time>
        </div>
        <Link href={`/blog/${post.slug}`}>
          <CardTitle className="text-xl font-bold hover:text-primary transition-colors duration-200">{post.title}</CardTitle>
        </Link>
        <p className="mt-3 text-muted-foreground">{post.excerpt}</p>
      </CardContent>
      <CardFooter className="p-6 pt-0 flex-wrap gap-2 justify-between items-center">
        <div className="flex items-center gap-2 flex-wrap">
            {post.tags.slice(0, 2).map((tag) => (
                <TagBadge key={tag} tag={tag} />
            ))}
        </div>
        <Button asChild variant="ghost" className="text-primary hover:text-primary">
          <Link href={`/blog/${post.slug}`}>
            Read More
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
