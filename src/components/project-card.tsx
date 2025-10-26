import type { Project } from "@/lib/types";
import Image from "next/image";
import Link from "next/link";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import TagBadge from "./tag-badge";
import { ArrowRight } from "lucide-react";
import { Button } from "./ui/button";

interface ProjectCardProps {
  project: Project;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  return (
    <Card className="flex flex-col h-full overflow-hidden transition-transform duration-300 hover:-translate-y-2 hover:shadow-xl hover:shadow-primary/20">
      <Link href={`/projects/${project.slug}`} className="block group">
        <CardHeader className="p-0">
            {project.image && (
                <div className="relative aspect-video w-full overflow-hidden">
                    <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    data-ai-hint="abstract code"
                    />
                </div>
            )}
        </CardHeader>
        <CardContent className="p-6 flex-grow">
            <CardTitle className="text-xl font-bold group-hover:text-primary transition-colors duration-200">{project.title}</CardTitle>
            <CardDescription className="mt-2 line-clamp-3">{project.description}</CardDescription>
        </CardContent>
      </Link>
      <CardFooter className="p-6 pt-0 flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
        <div className="flex items-center gap-2 flex-wrap">
          {(project.technologies || []).slice(0,3).map((tag) => (
            <TagBadge key={tag} tag={tag} />
          ))}
        </div>
        <Button asChild variant="ghost" className="text-primary hover:text-primary p-0 h-auto">
            <Link href={`/projects/${project.slug}`}>
            Details
            <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
