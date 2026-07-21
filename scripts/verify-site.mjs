import { access, readFile, readdir } from 'node:fs/promises';
import path from 'node:path';

const root = path.resolve('dist');
const failures = [];
const htmlFiles = [];

async function walk(directory) {
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const target = path.join(directory, entry.name);
    if (entry.isDirectory()) await walk(target);
    else if (entry.name.endsWith('.html')) htmlFiles.push(target);
  }
}

for (const required of ['sitemap.xml', 'robots.txt', 'llms.txt', 'llms-full.txt', 'humans.txt', '.well-known/security.txt']) {
  try { await access(path.join(root, required)); }
  catch { failures.push(`Missing required discovery file: /${required}`); }
}

await walk(root);
for (const file of htmlFiles) {
  const html = await readFile(file, 'utf8');
  if (!/<title>[^<]+<\/title>/.test(html)) failures.push(`Missing title: ${path.relative(root, file)}`);
  if (!/<meta name="description" content="[^"]+"/.test(html)) failures.push(`Missing description: ${path.relative(root, file)}`);
  for (const [, href] of html.matchAll(/href="([^"]+)"/g)) {
    if (!href.startsWith('/') || href.startsWith('//')) continue;
    const clean = href.split(/[?#]/)[0];
    if (!clean || clean.startsWith('/assets/')) continue;
    const target = clean.endsWith('/') ? path.join(root, clean, 'index.html') : path.join(root, clean);
    try { await access(target); }
    catch { failures.push(`Broken internal link in ${path.relative(root, file)}: ${href}`); }
  }
}

if (failures.length) { console.error(failures.join('\n')); process.exit(1); }
console.log(`Verified ${htmlFiles.length} HTML routes and required discovery files.`);
