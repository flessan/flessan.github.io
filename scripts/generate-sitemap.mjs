import fs from 'fs';
import { globby } from 'globby';

async function generateSitemap() {
  const APP_URL = 'https://flessan.pages.dev'; // Ganti dengan URL Anda
  
  // 1. Dapatkan semua halaman statis dari direktori `app`
  const pages = await globby([
    'src/app/**/*.tsx',
    '!src/app/**/\\[*\\]/**/*.tsx', // Abaikan rute dinamis
    '!src/app/_*.tsx', // Abaikan file internal Next.js
    '!src/app/api', // Abaikan rute API
    '!src/app/layout.tsx'
  ]);

  const staticRoutes = pages.map((page) => {
    const path = page
      .replace('src/app', '')
      .replace('/page.tsx', '')
      .replace('.tsx', '');
    return path === '' ? '/' : path;
  });

  // 2. Dapatkan semua rute dinamis dari konten (blog dan proyek)
  const contentDir = '_content';
  const blogPosts = fs.readdirSync(`${contentDir}/blog`).map(file => `/blog/${file.replace('.md', '')}`);
  const projects = fs.readdirSync(`${contentDir}/projects`).map(file => `/projects/${file.replace('.md', '')}`);

  const allRoutes = [...staticRoutes, ...blogPosts, ...projects];

  // 3. Bangun XML sitemap
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${allRoutes
    .map((route) => {
      return `
    <url>
      <loc>${`${APP_URL}${route}`}</loc>
      <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    </url>
      `;
    })
    .join('')}
</urlset>`;

  // 4. Tulis file sitemap.xml ke direktori public
  fs.writeFileSync('public/sitemap.xml', sitemap);
  console.log('Sitemap generated successfully!');
}

generateSitemap();
