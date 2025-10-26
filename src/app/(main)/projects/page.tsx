import { getSortedProjects } from '@/lib/content';
import ProjectsClientPage from './projects-client-page';
import type { Project } from '@/lib/types';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'My Projects',
  description: 'A collection of projects I have worked on, showcasing my skills in software and web development.',
};

export default async function ProjectsPage() {
  const allProjects: Project[] = await getSortedProjects();

  const allTags = Array.from(
    new Set(allProjects.flatMap(project => project.technologies || []))
  ).sort();

  return (
    <ProjectsClientPage allProjects={allProjects} allTags={allTags} />
  );
}
