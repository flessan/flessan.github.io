import { Briefcase, GraduationCap, Star, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';

const experiences = [
  {
    role: "Frontend Developer",
    company: "Tech Solutions Inc.",
    period: "Jan 2022 - Present",
    description: "Developed and maintained user-facing features for a large-scale e-commerce platform using React, Next.js, and TypeScript. Collaborated with designers and backend developers to deliver high-quality products."
  },
  {
    role: "Junior Web Developer",
    company: "Creative Agency",
    period: "Jun 2020 - Dec 2021",
    description: "Built and styled responsive websites for various clients using HTML, CSS, and JavaScript. Gained experience with modern frontend frameworks and build tools."
  }
];

const education = [
  {
    degree: "Bachelor of Science in Computer Science",
    institution: "University of Technology",
    period: "2016 - 2020"
  }
];

const skills = [
  "JavaScript (ES6+)", "TypeScript", "React", "Next.js", "Node.js", "Tailwind CSS",
  "Firebase", "Git & GitHub", "REST APIs", "UI/UX Design Principles"
];

export default function CVPage() {
  return (
    <div className="container max-w-4xl mx-auto py-12 md:py-16 lg:py-20">
      <div className="flex flex-col md:flex-row justify-between items-start mb-12">
        <div>
          <h1 className="font-headline text-4xl md:text-5xl font-bold">Thio Saputra</h1>
          <p className="text-xl text-muted-foreground mt-1">Frontend Developer</p>
        </div>
        <Button asChild className="mt-4 md:mt-0">
          <a href="/cv.pdf" download="Thio-Saputra-CV.pdf">
            <Download className="mr-2 h-4 w-4" />
            Download PDF
          </a>
        </Button>
      </div>

      <div className="space-y-12">
        {/* Experience Section */}
        <section>
          <h2 className="font-headline text-2xl font-semibold border-b pb-2 mb-4 flex items-center">
            <Briefcase className="mr-3 h-6 w-6" /> Work Experience
          </h2>
          <div className="space-y-8">
            {experiences.map((exp, index) => (
              <div key={index}>
                <div className="flex justify-between items-baseline">
                  <h3 className="text-xl font-bold text-foreground">{exp.role}</h3>
                  <p className="text-sm text-muted-foreground">{exp.period}</p>
                </div>
                <p className="text-lg text-accent-foreground dark:text-accent font-medium">{exp.company}</p>
                <p className="mt-2 text-muted-foreground">{exp.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Skills Section */}
        <section>
          <h2 className="font-headline text-2xl font-semibold border-b pb-2 mb-4 flex items-center">
            <Star className="mr-3 h-6 w-6" /> Skills
          </h2>
          <div className="flex flex-wrap gap-2">
            {skills.map(skill => (
              <Badge key={skill} variant="secondary" className="text-base px-3 py-1">
                {skill}
              </Badge>
            ))}
          </div>
        </section>

        {/* Education Section */}
        <section>
          <h2 className="font-headline text-2xl font-semibold border-b pb-2 mb-4 flex items-center">
            <GraduationCap className="mr-3 h-6 w-6" /> Education
          </h2>
          {education.map((edu, index) => (
            <div key={index}>
              <div className="flex justify-between items-baseline">
                <h3 className="text-xl font-bold text-foreground">{edu.degree}</h3>
                <p className="text-sm text-muted-foreground">{edu.period}</p>
              </div>
              <p className="text-lg text-accent-foreground dark:text-accent font-medium">{edu.institution}</p>
            </div>
          ))}
        </section>
      </div>
    </div>
  );
}
