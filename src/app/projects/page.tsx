'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect, useMemo } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { getAllProjects, Project } from '@/lib/api';
import { ArrowRight } from 'lucide-react';

export default function ProjectsPage() {
  const [allProjects, setAllProjects] = useState<Project[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTech, setSelectedTech] = useState<string | null>(null);

  useEffect(() => {
    const projects = getAllProjects();
    setAllProjects(projects);
  }, []);

  const technologies = useMemo(() => {
    const techSet = new Set<string>();
    allProjects.forEach(project => {
      project.technologies?.forEach(tech => techSet.add(tech));
    });
    return Array.from(techSet).sort();
  }, [allProjects]);

  const filteredProjects = useMemo(() => {
    return allProjects.filter(project => {
      const matchesSearch = project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            project.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesTech = selectedTech ? project.technologies?.includes(selectedTech) : true;
      
      return matchesSearch && matchesTech;
    });
  }, [allProjects, searchTerm, selectedTech]);

  return (
    <section className="container py-12 md:py-16 lg:py-20">
      <div className="flex flex-col items-start gap-4 mb-8">
        <h1 className="font-headline text-3xl font-bold tracking-tighter md:text-5xl">My Projects</h1>
        <p className="text-muted-foreground md:text-lg">
          A showcase of my work in web development and design.
        </p>
      </div>

      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <div className="relative w-full md:max-w-md">
          <Input
            type="text"
            placeholder="Search projects..."
            className="w-full"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>
      
      <div className="flex flex-wrap gap-2 mb-12">
        <Button 
          variant={!selectedTech ? 'default' : 'outline'}
          onClick={() => setSelectedTech(null)}
        >
          All
        </Button>
        {technologies.map(tech => (
          <Button 
            key={tech} 
            variant={selectedTech === tech ? 'default' : 'outline'}
            onClick={() => setSelectedTech(tech)}
          >
            {tech}
          </Button>
        ))}
      </div>

      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {filteredProjects.length > 0 ? (
          filteredProjects.map((project) => (
            <Link href={`/projects/${project.slug}`} key={project.slug} className="group">
              <Card className="h-full overflow-hidden transition-all group-hover:shadow-xl">
                <CardHeader className="p-0">
                  <div className="aspect-video relative">
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      className="object-cover transition-transform group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      data-ai-hint={project.title}
                    />
                  </div>
                </CardHeader>
                <CardContent className="p-6">
                  <CardTitle className="font-headline text-xl">{project.title}</CardTitle>
                  <CardDescription className="mt-2">{project.description}</CardDescription>
                  <div className="mt-4 flex items-center text-sm font-medium text-accent-foreground dark:text-accent">
                    View Details <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))
        ) : (
          <p className="text-center text-muted-foreground col-span-full">No projects found.</p>
        )}
      </div>
    </section>
  );
}
