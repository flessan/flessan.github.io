import { getSortedPosts, getSortedProjects } from "@/lib/content";
import ProjectCard from "@/components/project-card";
import BlogPostCard from "@/components/blog-post-card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight, Code, FileText, MessageSquare } from "lucide-react";

export default async function HomePage() {
  const featuredProjects = (await getSortedProjects()).slice(0, 3);
  const recentPosts = (await getSortedPosts()).slice(0, 3);

  return (
    <div className="space-y-16 md:space-y-24">
      {/* Hero Section */}
      <section className="text-center py-16 md:py-24">
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tighter">
          <span className="block">Siswa Rekayasa Perangkat Lunak.</span>
          <span className="block text-primary mt-2">Pemecah Masalah Kreatif.</span>
        </h1>
        <p className="mt-6 max-w-2xl mx-auto text-lg md:text-xl text-muted-foreground">
          Selamat datang di ruang digital saya. Saya sedang belajar membangun aplikasi web modern dan suka berbagi apa yang saya pelajari di sepanjang jalan.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <Button size="lg" asChild>
            <Link href="/projects">
              <Code className="mr-2 h-5 w-5" />
              Proyek Saya
            </Link>
          </Button>
          <Button size="lg" variant="outline" asChild>
            <Link href="/cv">
              <FileText className="mr-2 h-5 w-5" />
              Lihat CV
            </Link>
          </Button>
        </div>
      </section>

      {/* Featured Projects */}
      <section>
        <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold tracking-tight">Proyek Unggulan</h2>
            <Button variant="ghost" asChild className="text-primary hover:text-primary">
                <Link href="/projects">
                    Lihat Semua <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
            </Button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredProjects.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
      </section>

      {/* Recent Blog Posts */}
      <section>
        <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold tracking-tight">Postingan Terbaru</h2>
            <Button variant="ghost" asChild className="text-primary hover:text-primary">
                <Link href="/blog">
                    Baca Semua <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
            </Button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-3 gap-8">
          {recentPosts.map((post) => (
            <BlogPostCard key={post.slug} post={post} />
          ))}
        </div>
      </section>
    </div>
  );
}
