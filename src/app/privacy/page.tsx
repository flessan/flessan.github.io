import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';

export const metadata = {
  title: 'Privacy Policy',
  description: 'Privacy Policy for MinimalFolio.',
};

async function getPrivacyPolicyContent() {
  const filePath = path.join(process.cwd(), '_content', 'legal', 'privacy-policy.md');
  const fileContents = fs.readFileSync(filePath, 'utf8');
  const { content } = matter(fileContents);
  const processedContent = await remark().use(html).process(content);
  return processedContent.toString();
}

export default async function PrivacyPage() {
  const content = await getPrivacyPolicyContent();

  return (
    <div className="container max-w-4xl py-12 md:py-16">
      <div className="prose dark:prose-invert max-w-none">
        <h1 className="font-headline text-3xl font-bold md:text-4xl mb-8">Privacy Policy</h1>
        <div dangerouslySetInnerHTML={{ __html: content }} />
      </div>
    </div>
  );
}
