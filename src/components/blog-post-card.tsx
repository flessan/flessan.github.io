import type { Post } from "@/lib/types";
import Link from "next/link";
import Image from "next/image";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, Calendar, Clock } from "lucide-react";
import { format } from "date-fns";

interface BlogPostCardProps {
  post: Post;
}

export default function BlogPostCard({ post }: BlogPostCardProps) {
  return (
    <Card className="flex flex-col h-full overflow-hidden transition-transform duration-300 hover:-translate-y-2 hover:shadow-xl hover:shadow-primary/20">
      <Link href={`/blog/${post.slug}`} className="block group">
        <CardHeader className="p-0">
          {post.image && (
            <div className="relative aspect-video w-full overflow-hidden">
                <Image
                src={post.image}
                alt={post.title}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                data-ai-hint="developer coding"
                />
            </div>
          )}
        </CardHeader>
        <CardContent className="p-6 flex-grow">
          <div className="flex items-center gap-4 text-sm text-muted-foreground mb-2">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <time dateTime={post.date}>{format(new Date(post.date), "MMM d, yyyy")}</time>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                <span>{post.readingTime} min read</span>
              </div>
          </div>
          <CardTitle className="text-xl font-bold group-hover:text-primary transition-colors duration-200">{post.title}</CardTitle>
          <p className="mt-3 text-muted-foreground line-clamp-3">{post.description}</p>
        </CardContent>
      </Link>
      <CardFooter className="p-6 pt-0">
        <Button asChild variant="ghost" className="text-primary hover:text-primary p-0 h-auto">
          <Link href={`/blog/${post.slug}`}>
            Read More
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}