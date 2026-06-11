import { cpSync, mkdirSync, rmSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const dist = join(root, 'dist');
const assetsOut = join(root, 'assets');

const builtHtml = [join(dist, 'index.source.html'), join(dist, 'index.html')].find(existsSync);
if (!builtHtml) {
  console.error('Build output HTML not found in dist/');
  process.exit(1);
}

cpSync(builtHtml, join(root, 'index.html'));

if (existsSync(assetsOut)) {
  rmSync(assetsOut, { recursive: true, force: true });
}
mkdirSync(assetsOut, { recursive: true });
cpSync(join(dist, 'assets'), assetsOut, { recursive: true });

console.log('Published LP1 build to index.html + assets/');
