
'use client';

import type { CvData } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Download, Mail, MapPin, Phone, Globe, Code, Briefcase, GraduationCap } from 'lucide-react';
import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import TagBadge from '@/components/tag-badge';

interface CvClientPageProps {
  cvData: CvData;
}

export default function CvClientPage({ cvData }: CvClientPageProps) {
  const handlePrint = () => {
    window.print();
  };

  if (!cvData) {
    return <div className="text-center">Loading CV...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex justify-end mb-8 no-print">
        <Button onClick={handlePrint} className="bg-accent text-accent-foreground hover:bg-accent/90">
          <Download className="mr-2 h-4 w-4" />
          Print / Save as PDF
        </Button>
      </div>

      <main className="bg-card p-6 sm:p-8 md:p-12 rounded-lg shadow-lg print:shadow-none print:border">
        <header className="flex flex-col md:flex-row items-center gap-8 border-b pb-8">
          {cvData.avatar && (
            <div className="relative w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden flex-shrink-0 ring-4 ring-primary/50">
              <Image src={cvData.avatar} alt={cvData.name} fill className="object-cover" data-ai-hint="professional portrait" />
            </div>
          )}
          <div className="text-center md:text-left">
            <h1 className="text-4xl font-bold text-primary">{cvData.name}</h1>
            <h2 className="text-xl font-medium text-muted-foreground mt-1">{cvData.title}</h2>
            <div className="mt-4 flex flex-wrap justify-center md:justify-start gap-x-6 gap-y-2 text-sm text-muted-foreground">
              {cvData.email && <a href={`mailto:${cvData.email}`} className="flex items-center gap-2 hover:text-primary"><Mail className="h-4 w-4"/>{cvData.email}</a>}
              {cvData.phone && <a href={`tel:${cvData.phone}`} className="flex items-center gap-2 hover:text-primary"><Phone className="h-4 w-4"/>{cvData.phone}</a>}
              {cvData.website && <a href={cvData.website} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-primary"><Globe className="h-4 w-4"/>{cvData.website}</a>}
              {cvData.location && <span className="flex items-center gap-2"><MapPin className="h-4 w-4"/>{cvData.location}</span>}
            </div>
          </div>
        </header>

        {cvData.summary && (
          <section className="py-8 cv-section">
            <h3 className="text-2xl font-semibold mb-4 text-primary">Summary</h3>
            <p className="text-muted-foreground leading-relaxed whitespace-pre-wrap">{cvData.summary}</p>
          </section>
        )}

        {cvData.skills?.length > 0 && (
          <section className="py-8 cv-section">
            <h3 className="text-2xl font-semibold mb-4 text-primary">Skills</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {cvData.skills.map((skillCategory) => (
                <Card key={skillCategory.category} className="bg-card/50">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-lg">
                      <Code className="h-5 w-5 text-accent" />
                      {skillCategory.category}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {skillCategory.skills.map(skill => <TagBadge key={skill} tag={skill} />)}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>
        )}
        
        {cvData.experience?.length > 0 && (
          <section className="py-8 cv-section">
              <h3 className="text-2xl font-semibold mb-4 text-primary flex items-center gap-3"><Briefcase />Experience</h3>
              <div className="space-y-8">
              {cvData.experience.map((job, index) => (
                  <div key={index} className="relative pl-8">
                      <div className="absolute left-0 top-1 h-full border-l-2 border-border"></div>
                      <div className="absolute left-[-6px] top-1 w-3 h-3 rounded-full bg-primary"></div>
                      <div className="flex justify-between items-baseline">
                        <h4 className="font-semibold text-lg">{job.role}</h4>
                        <p className="text-sm text-muted-foreground text-right">{job.period}</p>
                      </div>
                      <p className="text-sm text-muted-foreground font-medium">{job.company}</p>
                      {job.description && (
                        <ul className="mt-2 text-muted-foreground list-disc list-inside space-y-1 prose prose-sm max-w-none">
                          {job.description.split('\n').map((line, i) => (
                            line.trim() ? <li key={i} className="pl-2">{line.trim()}</li> : null
                          ))}
                        </ul>
                      )}
                  </div>
              ))}
              </div>
          </section>
        )}

        {cvData.education?.length > 0 && (
          <section className="py-8 cv-section">
            <h3 className="text-2xl font-semibold mb-4 text-primary flex items-center gap-3"><GraduationCap/>Education</h3>
            {cvData.education.map((edu, index) => (
              <div key={index} className="mb-4">
                  <div className="flex justify-between items-baseline">
                    <h4 className="font-semibold text-lg">{edu.degree}</h4>
                    <p className="text-sm text-muted-foreground text-right">{edu.period}</p>
                  </div>
                  <p className="text-sm text-muted-foreground font-medium">{edu.institution}</p>
              </div>
            ))}
          </section>
        )}
      </main>
    </div>
  );
}
