import { mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';

const sourceRoot = path.resolve('reference/source');
const latest = (await readFile(path.join(sourceRoot, 'latest.txt'), 'utf8')).trim();
const captureRoot = path.join(sourceRoot, latest);
const manifest = JSON.parse(await readFile(path.join(captureRoot, 'manifest.json'), 'utf8'));
const routeMap = JSON.parse(await readFile(path.resolve('reference/route-map.json'), 'utf8'));
const articleMeta = {
  '/blog/mault-0-7-5-is-live/': { date: '2026-02-10', image: '/assets/blog/mault-governance.webp' },
  '/blog/mault-saves-you-tokens-time-and-your-codebase/': { date: '2026-02-04', image: '/assets/blog/mault-governance.webp' },
  '/blog/opus-4-6-tanked-the-market-will-it-replace-saas/': { date: '2026-02-06', image: '/assets/blog/mault-governance.webp' },
  '/blog/the-model-is-not-the-system/': { date: '2026-02-06', image: '/assets/blog/mault-governance.webp' },
  '/blog/the-enterprise-pipeline-that-doesnt-let-ai-off-the-hook/': { date: '2026-04-01', image: '/assets/blog/enterprise-pipeline.webp' },
  '/blog/the-triage-report-ai-vendors-dont-want-you-to-see/': { date: '2026-03-28', image: '/assets/blog/mault-governance.webp' },
  '/blog/we-tested-multi-agent-orchestration-on-two-different-machines-heres-what-happened/': { date: '2026-03-16', image: '/assets/blog/multi-agent-orchestration.webp' },
};
const decode = (s='') => s.replace(/<script[\s\S]*?<\/script>/gi,' ').replace(/<style[\s\S]*?<\/style>/gi,' ')
  .replace(/<[^>]+>/g,' ').replaceAll('&nbsp;',' ').replaceAll('&amp;','&').replaceAll('&#038;','&')
  .replaceAll('&#8217;',"'").replaceAll('&#8211;','–').replaceAll('&#039;',"'").replaceAll('&quot;','"')
  .replace(/&#(\d+);/g, (_, code) => String.fromCodePoint(Number(code))).replace(/\s+/g,' ').trim();
const cleanTitle = (title='') => title.replace(/\s*[|–-]\s*Mault.*$/i,'').trim();
const pick = (source) => manifest.records.find((record) => new URL(record.url).pathname === source);
const pages = [];
for (const route of routeMap.routes) {
  if (!['retain','consolidate','review'].includes(route.status) || route.target === '/') continue;
  if (pages.some((page) => page.path === route.target)) continue;
  const record = pick(route.source);
  if (!record) continue;
  const html = await readFile(path.join(captureRoot, record.sourceFile), 'utf8');
  const main = html.match(/<main[\s\S]*?<\/main>/i)?.[0] || html.match(/<article[\s\S]*?<\/article>/i)?.[0] || html;
  const blocks = [...main.matchAll(/<(h[1-4]|p|li|blockquote)[^>]*>([\s\S]*?)<\/\1>/gi)]
    .map((match) => ({ type: match[1].toLowerCase(), text: decode(match[2]) }))
    .filter((block) => block.text.length > 2 && !/^(Menu|Close|Skip to content)$/i.test(block.text));
  const seen = new Set();
  const uniqueBlocks = blocks.filter((block) => { const key=block.type+block.text; if(seen.has(key)) return false; seen.add(key); return true; });
  const h1 = uniqueBlocks.find((block) => block.type === 'h1')?.text;
  const title = decode(cleanTitle(h1 || record.title || route.target.split('/').filter(Boolean).at(-1)));
  const contentBlocks = uniqueBlocks
    .map((block) => ({ ...block, text: block.text.replace(/^Back to Blog\s*/i, '') }))
    .filter((block) => block.text && block.text !== h1 && decode(block.text) !== title)
    .filter((block) => !/^(James Carso \(CTO\)|\d{2}\/\d{2}\/\d{4}|[A-Z][a-z]+ \d{1,2}, \d{4})$/i.test(block.text))
    .slice(0, 160);
  const capturedDescription = decode(record.description || '');
  const firstParagraph = contentBlocks.find((block) => block.type === 'p')?.text || '';
  const description = capturedDescription && !/^Learn more about/i.test(capturedDescription)
    ? capturedDescription
    : `${firstParagraph.slice(0, 175).replace(/\s+\S*$/, '')}${firstParagraph.length > 175 ? '…' : ''}`;
  pages.push({
    path: route.target,
    source: route.source,
    title,
    description: description || `Learn more about ${title}.`,
    blocks: contentBlocks,
    ...articleMeta[route.target],
  });
}
await mkdir(path.resolve('src/data'), { recursive: true });
await writeFile(path.resolve('src/data/migrated-pages.json'), JSON.stringify(pages, null, 2));
await mkdir(path.resolve('public'), { recursive: true });
const publicRoutes = ['/', ...pages.map((page) => page.path)];
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${publicRoutes.map((route) => `  <url><loc>https://mault.ai${route}</loc></url>`).join('\n')}\n</urlset>\n`;
await writeFile(path.resolve('public/sitemap.xml'), sitemap);
const llmsFull = ['# Mault public site', '', '> Independent redesign demo. Not an official Mault production deployment.', '', 'Mault provides deterministic governance, observability, and audit-ready evidence for AI-assisted software development.', '', ...pages.map((page) => `## ${page.title}\n\nCanonical route: https://mault.ai${page.path}\n\n${page.description}`)].join('\n\n');
await writeFile(path.resolve('public/llms-full.txt'), `${llmsFull}\n`);
console.log(`Generated ${pages.length} migrated routes from ${latest}`);
