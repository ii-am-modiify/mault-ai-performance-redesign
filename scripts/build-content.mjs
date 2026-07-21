import { mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';

const sourceRoot = path.resolve('reference/source');
const latest = (await readFile(path.join(sourceRoot, 'latest.txt'), 'utf8')).trim();
const captureRoot = path.join(sourceRoot, latest);
const manifest = JSON.parse(await readFile(path.join(captureRoot, 'manifest.json'), 'utf8'));
const routeMap = JSON.parse(await readFile(path.resolve('reference/route-map.json'), 'utf8'));
const decode = (s='') => s.replace(/<script[\s\S]*?<\/script>/gi,' ').replace(/<style[\s\S]*?<\/style>/gi,' ')
  .replace(/<[^>]+>/g,' ').replaceAll('&nbsp;',' ').replaceAll('&amp;','&').replaceAll('&#038;','&')
  .replaceAll('&#8217;',"'").replaceAll('&#8211;','–').replaceAll('&quot;','"').replace(/\s+/g,' ').trim();
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
  pages.push({
    path: route.target,
    source: route.source,
    title: cleanTitle(h1 || record.title || route.target.split('/').filter(Boolean).at(-1)),
    description: record.description || `Learn more about ${cleanTitle(h1 || record.title || 'Mault')}.`,
    blocks: uniqueBlocks.filter((block) => block.text !== h1).slice(0, 160),
  });
}
await mkdir(path.resolve('src/data'), { recursive: true });
await writeFile(path.resolve('src/data/migrated-pages.json'), JSON.stringify(pages, null, 2));
console.log(`Generated ${pages.length} migrated routes from ${latest}`);
