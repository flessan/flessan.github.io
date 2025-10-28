import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkGfm from 'remark-gfm';
import remarkRehype from 'remark-rehype';
import rehypeRaw from 'rehype-raw';
import rehypeHighlight from 'rehype-highlight';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypeStringify from 'rehype-stringify';
import { visit } from 'unist-util-visit';

export type Heading = {
  id: string;
  text: string;
  level: number;
};

// This is a plugin for unified to extract headings
function extractHeadings() {
  return (tree: any, file: any) => {
    const headings: Heading[] = [];
    visit(tree, 'heading', (node) => {
      const text = node.children
        .filter((child: any) => child.type === 'text')
        .map((child: any) => child.value)
        .join('');
      
      headings.push({
        id: node.properties.id,
        text,
        level: node.depth,
      });
    });
    file.data.headings = headings;
  };
}

export async function markdownToHtml(markdown: string) {
  const processor = unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkRehype, { allowDangerousHtml: true })
    .use(rehypeRaw)
    .use(rehypeHighlight)
    .use(rehypeSlug)
    .use(rehypeAutolinkHeadings, {
      behavior: 'append',
      properties: {
        className: ['anchor'],
        'aria-hidden': 'true',
        tabIndex: -1,
      },
      content: {
        type: 'element',
        tagName: 'span',
        properties: {
          className: ['icon', 'icon-link']
        },
        children: [{
          type: 'text',
          value: '#'
        }]
      }
    })
    .use(extractHeadings)
    .use(rehypeStringify);

  const file = await processor.process(markdown);
  const html = String(file);
  const headings = (file.data.headings as Heading[]) || [];
  
  return { html, headings };
}
