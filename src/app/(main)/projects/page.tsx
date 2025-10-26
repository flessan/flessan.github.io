import { getSortedProjects } from '@/lib/content';
import ProjectsClientPage from './projects-client-page';
import type { Project } from '@/lib/types';

export default async function ProjectsPage() {
  const allProjects: Project[] = await getSortedProjects();

  const allTags = Array.from(
    new Set(allProjects.flatMap(project => project.technologies || []))
  ).sort();

  return (
    <ProjectsClientPage allProjects={allProjects} allTags={allTags} />
  );
}
