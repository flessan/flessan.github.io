import { getCVData } from '@/lib/content';
import CvClientPage from './cv-client-page';

export default function CVPage() {
  const cvData = getCVData();

  return <CvClientPage cvData={cvData} />;
}
