
import { getAllProjects } from '@/lib/api';
import { ProjectList } from '@/components/project-list';

export default function ProjectsPage() {
  const allProjects = getAllProjects();

  return (
    <section className="container py-12 md:py-16 lg:py-20">
      <div className="flex flex-col items-start gap-4 mb-8">
        <h1 className="font-headline text-3xl font-bold tracking-tighter md:text-5xl">My Projects</h1>
        <p className="text-muted-foreground md:text-lg">
          A showcase of my work in web development and design.
        </p>
      </div>
      <ProjectList allProjects={allProjects} />
    </section>
  );
}
