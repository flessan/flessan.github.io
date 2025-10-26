"use client"

import type { Project } from "@/lib/types";
import Image from "next/image";
import Link from "next/link";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Github, Globe } from "lucide-react";
import TagBadge from "./tag-badge";

interface ProjectCardProps {
  project: Project;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  return (
    <Card className="flex flex-col h-full overflow-hidden transition-all duration-300 hover:shadow-primary/20 hover:shadow-lg hover:-translate-y-1">
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
      <CardContent className="p-6 flex-grow">
        <CardTitle className="text-xl font-bold">{project.title}</CardTitle>
        <CardDescription className="mt-2">{project.description}</CardDescription>
      </CardContent>
      <CardFooter className="p-6 pt-0 flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
        <div className="flex items-center gap-2 flex-wrap">
          {project.tags.map((tag) => (
            <TagBadge key={tag} tag={tag} />
          ))}
        </div>
        <div className="flex items-center gap-2">
          {project.liveUrl && (
            <Button variant="outline" size="sm" asChild>
              <Link href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                <Globe className="mr-2 h-4 w-4" />
                Live
              </Link>
            </Button>
          )}
          {project.repoUrl && (
            <Button variant="outline" size="sm" asChild>
              <Link href={project.repoUrl} target="_blank" rel="noopener noreferrer">
                <Github className="mr-2 h-4 w-4" />
                Repo
              </Link>
            </Button>
          )}
        </div>
      </CardFooter>
    </Card>
  );
}
