import { getCVData } from '@/lib/content';
import CvClientPage from './cv-client-page';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'My CV',
  description: 'View and download my professional curriculum vitae, detailing my experience, education, and skills as a software engineering student.',
};

export default function CVPage() {
  const cvData = getCVData();

  return <CvClientPage cvData={cvData} />;
}
