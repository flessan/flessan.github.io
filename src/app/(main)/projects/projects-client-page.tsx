'use client';

import { useState, useMemo } from 'react';
import type { Project } from '@/lib/types';
import ProjectCard from '@/components/project-card';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

interface ProjectsClientPageProps {
  allProjects: Project[];
  allTags: string[];
}

export default function ProjectsClientPage({ allProjects, allTags }: ProjectsClientPageProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  const filteredProjects = useMemo(() => {
    return allProjects.filter(project => {
      const matchesSearch = project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            project.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesTag = selectedTag ? (project.technologies || []).includes(selectedTag) : true;
      return matchesSearch && matchesTag;
    });
  }, [allProjects, searchTerm, selectedTag]);

  return (
    <div className="space-y-8">
      <section className="text-center">
        <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl text-primary">My Work</h1>
        <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
          A collection of projects I've built, from personal experiments to school assignments.
        </p>
      </section>

      <section className="space-y-4 max-w-3xl mx-auto">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search projects by title or description..."
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex flex-wrap gap-2 justify-center">
            <Badge
                onClick={() => setSelectedTag(null)}
                className={cn(
                  'cursor-pointer transition-all',
                  selectedTag === null ? 'bg-primary text-primary-foreground' : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
                )}
            >
                All
            </Badge>
          {allTags.map(tag => (
            <Badge
              key={tag}
              onClick={() => setSelectedTag(tag)}
              className={cn(
                'cursor-pointer transition-all',
                selectedTag === tag ? 'bg-primary text-primary-foreground' : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
              )}
            >
              {tag}
            </Badge>
          ))}
        </div>
      </section>

      <section>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map(project => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
        {filteredProjects.length === 0 && (
            <div className="text-center py-16 text-muted-foreground">
                <p>No projects found with the current filters.</p>
                <Button variant="link" onClick={() => { setSearchTerm(''); setSelectedTag(null); }}>Clear filters</Button>
            </div>
        )}
      </section>
    </div>
  );
}
