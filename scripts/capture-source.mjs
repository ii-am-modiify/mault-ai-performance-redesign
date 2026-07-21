import { createHash } from 'node:crypto';
import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';

const origin = 'https://mault.ai';
const stamp = new Date().toISOString().replace(/[:.]/g, '-');
const root = path.resolve('reference/source', stamp);

const decode = (value = '') => value
  .replaceAll('&amp;', '&').replaceAll('&#038;', '&')
  .replaceAll('&#8217;', "'").replaceAll('&quot;', '"')
  .replaceAll('&lt;', '<').replaceAll('&gt;', '>');
const strip = (value = '') => decode(value.replace(/<script[\s\S]*?<\/script>/gi, ' ')
  .replace(/<style[\s\S]*?<\/style>/gi, ' ').replace(/<[^>]+>/g, ' ')
  .replace(/\s+/g, ' ').trim());
const sha256 = (value) => createHash('sha256').update(value).digest('hex');
const slugFor = (url) => {
  const parsed = new URL(url);
  const slug = parsed.pathname === '/' ? 'home' : parsed.pathname.replace(/^\/+|\/+$/g, '').replaceAll('/', '__');
  return slug || 'home';
};
const unique = (values) => [...new Set(values.filter(Boolean))];
const abs = (value, base) => { try { return new URL(decode(value), base).href; } catch { return null; } };

async function get(url) {
  const response = await fetch(url, { headers: { 'user-agent': 'Tech Adventures migration audit/1.0' } });
  const body = await response.text();
  return { url, finalUrl: response.url, status: response.status, contentType: response.headers.get('content-type'), body };
}

await mkdir(path.join(root, 'html'), { recursive: true });
const sitemapIndex = await get(`${origin}/sitemap_index.xml`);
const sitemapUrls = unique([...sitemapIndex.body.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => decode(m[1])));
const sitemapBodies = await Promise.all(sitemapUrls.map(get));
const discovered = unique(sitemapBodies.flatMap((item) => [...item.body.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => decode(m[1]))));
const [pagesResponse, postsResponse] = await Promise.all([
  get(`${origin}/wp-json/wp/v2/pages?per_page=100&_fields=id,slug,status,link,title,modified,parent`),
  get(`${origin}/wp-json/wp/v2/posts?per_page=100&_fields=id,slug,status,link,title,modified`),
]);
const pages = JSON.parse(pagesResponse.body);
const posts = JSON.parse(postsResponse.body);
const urls = unique([`${origin}/`, ...discovered, ...pages.map((x) => x.link), ...posts.map((x) => x.link)]).sort();
const records = [];

for (const url of urls) {
  const result = await get(url);
  const html = result.body;
  const title = strip(html.match(/<title[^>]*>([\s\S]*?)<\/title>/i)?.[1]);
  const description = decode(html.match(/<meta[^>]+name=["']description["'][^>]+content=["']([^"']*)/i)?.[1] || '');
  const canonical = decode(html.match(/<link[^>]+rel=["']canonical["'][^>]+href=["']([^"']*)/i)?.[1] || '');
  const headings = [...html.matchAll(/<h([1-6])[^>]*>([\s\S]*?)<\/h\1>/gi)].map((m) => ({ level: Number(m[1]), text: strip(m[2]) })).filter((x) => x.text);
  const links = unique([...html.matchAll(/<a[^>]+href=["']([^"']+)["']/gi)].map((m) => abs(m[1], result.finalUrl)));
  const media = unique([...html.matchAll(/<(?:img|source|video)[^>]+(?:src|srcset|poster)=["']([^"']+)["']/gi)]
    .flatMap((m) => m[1].split(',').map((part) => abs(part.trim().split(/\s+/)[0], result.finalUrl))));
  const scripts = unique([...html.matchAll(/<script[^>]+src=["']([^"']+)["']/gi)].map((m) => abs(m[1], result.finalUrl)));
  const styles = unique([...html.matchAll(/<link[^>]+rel=["']stylesheet["'][^>]+href=["']([^"']+)["']/gi)].map((m) => abs(m[1], result.finalUrl)));
  const forms = [...html.matchAll(/<form\b[\s\S]*?<\/form>/gi)].map((m) => ({
    action: abs(m[0].match(/action=["']([^"']*)/i)?.[1] || result.finalUrl, result.finalUrl),
    method: (m[0].match(/method=["']([^"']*)/i)?.[1] || 'get').toLowerCase(),
    fields: unique([...m[0].matchAll(/<(?:input|textarea|select)[^>]+name=["']([^"']+)/gi)].map((x) => x[1])),
  }));
  const output = path.join(root, 'html', `${slugFor(url)}.html`);
  await writeFile(output, html);
  records.push({ url, finalUrl: result.finalUrl, status: result.status, contentType: result.contentType, bytes: Buffer.byteLength(html), sha256: sha256(html), title, description, canonical, headings, links, media, scripts, styles, forms, sourceFile: path.relative(root, output) });
  process.stdout.write(`${result.status} ${url}\n`);
}

const summary = {
  capturedAt: new Date().toISOString(), origin, urlCount: records.length,
  wordpress: { pageCount: pages.length, postCount: posts.length, pages, posts },
  totals: {
    htmlBytes: records.reduce((sum, x) => sum + x.bytes, 0),
    uniqueLinks: unique(records.flatMap((x) => x.links)).length,
    uniqueMedia: unique(records.flatMap((x) => x.media)).length,
    uniqueScripts: unique(records.flatMap((x) => x.scripts)).length,
    uniqueStyles: unique(records.flatMap((x) => x.styles)).length,
    forms: records.reduce((sum, x) => sum + x.forms.length, 0),
  },
  records,
};
await writeFile(path.join(root, 'manifest.json'), JSON.stringify(summary, null, 2));
await writeFile(path.resolve('reference/source/latest.txt'), `${path.relative(path.resolve('reference/source'), root)}\n`);
console.log(JSON.stringify({ output: root, ...summary.totals, urlCount: summary.urlCount }, null, 2));
