import CodeStatsChart from "@/components/codestats-chart";
import { Card, CardContent } from "@/components/ui/card";
import type { CodeStatsXP } from "@/lib/types";
import { Activity, Code, HardDrive, Share2, Users } from "lucide-react";

// Mock fetching function and data
async function getCodeStatsData(): Promise<CodeStatsXP[]> {
  // In a real app, this would be:
  // const res = await fetch('https://codestats.net/api/users/YOUR_USERNAME/xp?since=2000-01-01', { next: { revalidate: 3600 } });
  // if (!res.ok) { return []; }
  // const data = await res.json();
  // return data.languages;
  
  // Using mock data for demonstration
  return [
    { language: 'TypeScript', new_xp: 5000, total_xp: 150000 },
    { language: 'JavaScript', new_xp: 4500, total_xp: 130000 },
    { language: 'Python', new_xp: 3000, total_xp: 95000 },
    { language: 'HTML', new_xp: 2500, total_xp: 80000 },
    { language: 'CSS', new_xp: 2800, total_xp: 75000 },
    { language: 'Go', new_xp: 1500, total_xp: 40000 },
    { language: 'SQL', new_xp: 1000, total_xp: 35000 },
    { language: 'Rust', new_xp: 500, total_xp: 20000 },
    { language: 'Shell', new_xp: 300, total_xp: 15000 },
    { language: 'Java', new_xp: 200, total_xp: 10000 },
  ];
}


const principles = [
    {
        icon: Code,
        title: "Clean & Performant Code",
        description: "I believe in writing code that is not just functional, but also efficient, readable, and maintainable for long-term success."
    },
    {
        icon: Users,
        title: "User-Centric Design",
        description: "The best applications are built with the end-user in mind. I prioritize intuitive UI/UX to create engaging experiences."
    },
    {
        icon: Activity,
        title: "Continuous Learning",
        description: "The tech world is always evolving. I'm committed to constantly learning new technologies and improving my skillset."
    },
    {
        icon: Share2,
        title: "Collaboration & Communication",
        description: "Great things are built in teams. I value open communication and collaborative problem-solving to achieve shared goals."
    }
]

export default async function AboutPage() {
  const codestatsData = await getCodeStatsData();

  return (
    <div className="space-y-12">
      <section className="text-center">
        <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl text-primary">About Me</h1>
        <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
          I'm a passionate full-stack developer with a love for building beautiful, functional, and user-friendly web applications.
        </p>
      </section>

      <section>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {principles.map((p, i) => (
                <Card key={i} className="text-center bg-card/50">
                    <CardContent className="p-6">
                        <div className="inline-block p-4 bg-primary/10 rounded-full mb-4">
                            <p.icon className="h-8 w-8 text-primary" />
                        </div>
                        <h3 className="text-lg font-semibold">{p.title}</h3>
                        <p className="mt-2 text-sm text-muted-foreground">{p.description}</p>
                    </CardContent>
                </Card>
            ))}
        </div>
      </section>
      
      <section>
        <CodeStatsChart data={codestatsData} />
      </section>
    </div>
  );
}

export const metadata = {
  title: 'About | FleFolio',
  description: 'Learn more about my skills, experience, and coding statistics.',
};
