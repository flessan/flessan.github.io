"use client"

import type { Project } from "@/lib/types";
import Image from "next/image";
import Link from "next/link";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, Github, Globe } from "lucide-react";
import TagBadge from "./tag-badge";

interface ProjectCardProps {
  project: Project;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  return (
    <Card className="flex flex-col h-full overflow-hidden transition-all duration-300 hover:shadow-primary/20 hover:shadow-lg hover:-translate-y-1">
      <Link href={`/projects/${project.slug}`} className="block">
        <CardHeader className="p-0">
          <div className="relative aspect-video w-full">
            <Image
              src={project.image}
              alt={project.title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              data-ai-hint="abstract code"
            />
          </div>
        </CardHeader>
      </Link>
      <CardContent className="p-6 flex-grow">
        <Link href={`/projects/${project.slug}`}>
          <CardTitle className="text-xl font-bold hover:text-primary transition-colors duration-200">{project.title}</CardTitle>
        </Link>
        <CardDescription className="mt-2">{project.description}</CardDescription>
      </CardContent>
      <CardFooter className="p-6 pt-0 flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
        <div className="flex items-center gap-2 flex-wrap">
          {(project.technologies || []).map((tag) => (
            <TagBadge key={tag} tag={tag} />
          ))}
        </div>
        <div className="flex items-center gap-2">
            <Button asChild variant="ghost" className="text-primary hover:text-primary p-0 h-auto">
              <Link href={`/projects/${project.slug}`}>
                Read More
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
        </div>
      </CardFooter>
    </Card>
  );
}
