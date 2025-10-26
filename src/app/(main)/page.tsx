import { getSortedPosts, getSortedProjects } from "@/lib/content";
import ProjectCard from "@/components/project-card";
import BlogPostCard from "@/components/blog-post-card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight, Code, FileText } from "lucide-react";

export default async function HomePage() {
  const featuredProjects = (await getSortedProjects()).filter(p => p.featured).slice(0, 3);
  const recentPosts = (await getSortedPosts()).slice(0, 3);

  return (
    <div className="space-y-16 md:space-y-24">
      <section className="text-center py-16 md:py-24">
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">
          <span className="block">Software Engineering Student.</span>
          <span className="block mt-2">Creative Problem Solver.</span>
        </h1>
        <p className="mt-6 max-w-2xl mx-auto text-lg md:text-xl text-muted-foreground">
          Welcome to my digital space. I'm a vocational high school student passionate about building modern web applications and sharing what I learn.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <Button size="lg" asChild>
            <Link href="/projects">
              <Code className="mr-2 h-5 w-5" />
              My Projects
            </Link>
          </Button>
          <Button size="lg" variant="outline" asChild>
            <Link href="/cv">
              <FileText className="mr-2 h-5 w-5" />
              View CV
            </Link>
          </Button>
        </div>
      </section>

      {featuredProjects.length > 0 && (
        <section>
          <div className="flex items-center justify-between mb-8">
              <h2 className="text-3xl font-bold tracking-tight">Featured Projects</h2>
              <Button variant="ghost" asChild className="text-primary hover:text-primary">
                  <Link href="/projects">
                      View All <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
              </Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProjects.map((project) => (
              <ProjectCard key={project.slug} project={project} />
            ))}
          </div>
        </section>
      )}

      {recentPosts.length > 0 && (
        <section>
          <div className="flex items-center justify-between mb-8">
              <h2 className="text-3xl font-bold tracking-tight">Recent Posts</h2>
              <Button variant="ghost" asChild className="text-primary hover:text-primary">
                  <Link href="/blog">
                      Read All <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
              </Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-3 gap-8">
            {recentPosts.map((post) => (
              <BlogPostCard key={post.slug} post={post} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
