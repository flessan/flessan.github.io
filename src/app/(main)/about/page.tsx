import CodeStatsChart from "@/components/codestats-chart";
import { Card, CardContent } from "@/components/ui/card";
import type { CodeStatsXP } from "@/lib/types";
import { Activity, Code, Share2, Users, BrainCircuit } from "lucide-react";

async function getCodeStatsData(): Promise<CodeStatsXP[]> {
  try {
    const res = await fetch('https://codestats.net/api/users/fless/xp?since=2000-01-01', { 
        next: { revalidate: 3600 } // Revalidate once per hour
    });
    if (!res.ok) { 
      console.error("Failed to fetch Code::Stats data");
      return []; 
    }
    const data = await res.json();
    // The API returns an object with dates as keys, we need the values
    const allXps = Object.values(data.dates).flat() as { language: string, new_xp: number }[];

    // Aggregate XP per language
    const languageXpMap = new Map<string, number>();
    for (const xp of allXps) {
        languageXpMap.set(xp.language, (languageXpMap.get(xp.language) || 0) + xp.new_xp);
    }
    
    // Convert map to array of objects
    const aggregatedData: CodeStatsXP[] = Array.from(languageXpMap.entries()).map(([language, total_xp]) => ({
        language,
        total_xp,
        new_xp: 0 // new_xp is not relevant in this aggregated view
    }));

    return aggregatedData;
  } catch (error) {
    console.error("Error fetching or processing Code::Stats data:", error);
    return [];
  }
}


const principles = [
    {
        icon: Code,
        title: "Kecintaan pada Koding",
        description: "Saya percaya bahwa menulis kode bukan hanya soal logika, tetapi juga seni. Saya suka membuat kode yang bersih dan efisien."
    },
    {
        icon: BrainCircuit,
        title: "Pemecahan Masalah",
        description: "Tantangan adalah kesempatan untuk belajar. Saya menikmati proses menganalisis masalah dan menemukan solusi kreatif."
    },
    {
        icon: Activity,
        title: "Selalu Ingin Tahu",
        description: "Dunia teknologi terus berkembang. Saya berkomitmen untuk terus belajar hal-hal baru dan meningkatkan kemampuan saya."
    },
    {
        icon: Users,
        title: "Kolaborasi Tim",
        description: "Hal-hal hebat dibangun bersama. Saya menghargai kerja sama tim dan komunikasi terbuka untuk mencapai tujuan bersama."
    }
]

export default async function AboutPage() {
  const codestatsData = await getCodeStatsData();

  return (
    <div className="space-y-12">
      <section className="text-center">
        <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl text-primary">Tentang Saya</h1>
        <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
          Saya seorang siswa SMK jurusan Rekayasa Perangkat Lunak yang bersemangat membangun aplikasi web yang keren dan bermanfaat.
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
  title: 'Tentang | FleFolio',
  description: 'Pelajari lebih lanjut tentang saya, minat saya, dan perjalanan belajar saya dalam dunia koding.',
};
