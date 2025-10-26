import { getSortedProjects } from '@/lib/content';
import ProjectsClientPage from './projects-client-page';
import type { Project } from '@/lib/types';

export default function ProjectsPage() {
  // Fetch projects at build time on the server
  const allProjects: Project[] = getSortedProjects();

  const allTags = Array.from(
    new Set(allProjects.flatMap(project => project.technologies || []))
  ).sort();

  return (
    <ProjectsClientPage allProjects={allProjects} allTags={allTags} />
  );
}
