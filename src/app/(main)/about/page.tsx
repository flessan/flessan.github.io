import CodeStatsChart from "@/components/codestats-chart";
import type { CodeStatsXP } from "@/lib/types";
import { Activity, Code, BrainCircuit, Users } from "lucide-react";
import type { Metadata } from 'next';
import Image from "next/image";
import {PlaceHolderImages} from "@/lib/placeholder-images";

async function getCodeStatsData(): Promise<CodeStatsXP[]> {
  try {
    // This API endpoint gives us the total XP accumulated in each language.
    const res = await fetch('https://codestats.net/api/users/flessan/languages', { 
        next: { revalidate: 3600 } // Revalidate every hour
    });
    if (!res.ok) { 
      console.error("Failed to fetch Code::Stats data, status:", res.status);
      return []; 
    }
    const data = await res.json();
    
    // The API returns an object where keys are language names.
    // We need to convert this into an array of objects.
    const aggregatedData: CodeStatsXP[] = Object.entries(data).map(([language, stats]) => {
        const { xps } = stats as { xps: number };
        return {
            language,
            total_xp: xps,
            new_xp: 0, // The /languages endpoint doesn't provide new_xp.
        };
    });

    return aggregatedData;
  } catch (error) {
    console.error("Error fetching or processing Code::Stats data:", error);
    return [];
  }
}

const principles = [
    {
        icon: Code,
        title: "Love for Coding",
        description: "I believe writing code is not just about logic, but also an art. I enjoy creating clean and efficient code."
    },
    {
        icon: BrainCircuit,
        title: "Problem Solving",
        description: "Challenges are opportunities to learn. I enjoy the process of analyzing problems and finding creative solutions."
    },
    {
        icon: Activity,
        title: "Always Curious",
        description: "The world of technology is constantly evolving. I am committed to continuously learning new things and improving my skills."
    },
    {
        icon: Users,
        title: "Team Collaboration",
        description: "Great things are built together. I value teamwork and open communication to achieve common goals."
    }
]

export const metadata: Metadata = {
  title: 'About Me',
  description: 'Learn more about me, my interests, my skills, and my coding journey as a software engineering student.',
};

export default async function AboutPage() {
  const codestatsData = await getCodeStatsData();
  const avatarImage = PlaceHolderImages.find(img => img.id === 'cv-avatar');

  return (
    <div className="space-y-12">
      <section className="flex flex-col md:flex-row items-center justify-center gap-12 text-center md:text-left">
        {avatarImage && (
            <div className="relative w-40 h-40 rounded-full overflow-hidden flex-shrink-0 ring-4 ring-primary/50">
              <Image src={avatarImage.imageUrl} alt="My Avatar" fill className="object-cover" data-ai-hint="professional portrait" />
            </div>
        )}
        <div>
            <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl text-primary">About Me</h1>
            <p className="mt-4 max-w-2xl text-lg text-muted-foreground">
            I'm a vocational high school student majoring in Software Engineering, passionate about building cool and useful web applications.
            </p>
        </div>
      </section>

      <section>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {principles.map((p, i) => (
                <div key={i} className="text-center p-6 bg-card/50 rounded-lg">
                    <div className="inline-block p-4 bg-primary/10 rounded-full mb-4">
                        <p.icon className="h-8 w-8 text-primary" />
                    </div>
                    <h3 className="text-lg font-semibold">{p.title}</h3>
                    <p className="mt-2 text-sm text-muted-foreground">{p.description}</p>
                </div>
            ))}
        </div>
      </section>
      
      <section>
        <CodeStatsChart data={codestatsData} />
      </section>
    </div>
  );
}
