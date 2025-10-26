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
import { VFile } from 'vfile';

export type Heading = {
  id: string;
  text: string;
  level: number;
};

// This is a plugin for unified to extract headings
function extractHeadings(headings: Heading[]) {
  return () => (tree: any) => {
    visit(tree, 'heading', (node) => {
      const text = node.children
        .map((child: any) => (child.type === 'text' ? child.value : ''))
        .join('');
      
      headings.push({
        id: node.properties.id,
        text,
        level: node.depth,
      });
    });
  };
}

export async function markdownToHtml(markdown: string) {
  const headings: Heading[] = [];
  const file = new VFile({value: markdown});

  const html = await unified()
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
    .use(function () {
      return (tree) => {
        visit(tree, 'element', (node: any) => {
            if (node.tagName === 'h1' || node.tagName === 'h2' || node.tagName === 'h3' || node.tagName === 'h4' || node.tagName === 'h5' || node.tagName === 'h6') {
                const text = node.children
                    .map((child: any) => (child.type === 'text' ? child.value : ''))
                    .join('');

                headings.push({
                    id: node.properties.id,
                    level: parseInt(node.tagName.charAt(1), 10),
                    text,
                });
            }
        });
      }
    })
    .use(rehypeStringify)
    .process(file);

  return { html: String(html), headings };
}
