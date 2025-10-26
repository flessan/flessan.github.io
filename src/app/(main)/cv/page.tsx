'use client';

import { useEffect, useState } from 'react';
import { getCVData } from '@/lib/content';
import type { CvData } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Download, Mail, MapPin, Phone, Globe } from 'lucide-react';
import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import TagBadge from '@/components/tag-badge';

export default function CVPage() {
  const [cvData, setCvData] = useState<CvData | null>(null);

  useEffect(() => {
    getCVData().then(data => setCvData(data));
  }, []);

  const handlePrint = () => {
    window.print();
  };

  if (!cvData) {
    return <div className="text-center">Loading CV...</div>;
  }

  return (
    <div className="max-w-5xl mx-auto">
      <div className="flex justify-end mb-8 no-print">
        <Button onClick={handlePrint} className="bg-accent text-accent-foreground hover:bg-accent/90">
          <Download className="mr-2 h-4 w-4" />
          Print / Save as PDF
        </Button>
      </div>

      <main className="bg-card p-6 sm:p-8 md:p-12 rounded-lg shadow-lg">
        <header className="flex flex-col md:flex-row items-center gap-8 border-b pb-8">
          <div className="relative w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden flex-shrink-0">
            {/* @ts-ignore */}
            <Image src={cvData.avatar} alt={cvData.name} fill className="object-cover" data-ai-hint="professional portrait" />
          </div>
          <div className="text-center md:text-left">
            <h1 className="text-4xl font-bold text-primary">{cvData.name}</h1>
            <h2 className="text-xl font-medium text-muted-foreground mt-1">{cvData.title}</h2>
            <div className="mt-4 flex flex-wrap justify-center md:justify-start gap-x-6 gap-y-2 text-sm text-muted-foreground">
              <a href={`mailto:${cvData.email}`} className="flex items-center gap-2 hover:text-primary"><Mail className="h-4 w-4"/>{cvData.email}</a>
              <a href={`tel:${cvData.phone}`} className="flex items-center gap-2 hover:text-primary"><Phone className="h-4 w-4"/>{cvData.phone}</a>
              <a href={cvData.website} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-primary"><Globe className="h-4 w-4"/>{cvData.website}</a>
              <span className="flex items-center gap-2"><MapPin className="h-4 w-4"/>{cvData.location}</span>
            </div>
          </div>
        </header>

        <section className="py-8 cv-section">
          <h3 className="text-2xl font-semibold mb-4 text-primary">Summary</h3>
          <p className="text-muted-foreground leading-relaxed">{cvData.summary}</p>
        </section>

        <section className="py-8 cv-section">
          <h3 className="text-2xl font-semibold mb-4 text-primary">Skills</h3>
          <div className="flex flex-wrap gap-2">
            {cvData.skills.map(skill => <TagBadge key={skill} tag={skill} />)}
          </div>
        </section>
        
        <section className="py-8 cv-section">
            <h3 className="text-2xl font-semibold mb-4 text-primary">Experience</h3>
            <Accordion type="single" collapsible className="w-full" defaultValue="item-0">
            {cvData.experience.map((job, index) => (
                <AccordionItem value={`item-${index}`} key={index}>
                    <AccordionTrigger>
                        <div className="text-left">
                            <h4 className="font-semibold text-lg">{job.role}</h4>
                            <p className="text-sm text-muted-foreground">{job.company} | {job.period}</p>
                        </div>
                    </AccordionTrigger>
                    <AccordionContent>
                        <p className="text-muted-foreground whitespace-pre-wrap">{job.description}</p>
                    </AccordionContent>
                </AccordionItem>
            ))}
            </Accordion>
        </section>

        <section className="py-8 cv-section">
          <h3 className="text-2xl font-semibold mb-4 text-primary">Education</h3>
          {cvData.education.map((edu, index) => (
            <Card key={index} className="mb-4 bg-background">
              <CardContent className="p-4">
                <h4 className="font-semibold">{edu.degree}</h4>
                <p className="text-sm text-muted-foreground">{edu.institution}</p>
                <p className="text-xs text-muted-foreground mt-1">{edu.period}</p>
              </CardContent>
            </Card>
          ))}
        </section>
      </main>
    </div>
  );
}
