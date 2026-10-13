import fs from 'fs';
import path from 'path';

// 1. Ensure dist/index.html is created from built html
const distDir = path.resolve('dist');
const devHtmlPath = path.join(distDir, 'index.dev.html');
const distHtmlPath = path.join(distDir, 'index.html');

let htmlContent = '';
if (fs.existsSync(devHtmlPath)) {
  htmlContent = fs.readFileSync(devHtmlPath, 'utf8');
  fs.writeFileSync(distHtmlPath, htmlContent);
} else if (fs.existsSync(distHtmlPath)) {
  htmlContent = fs.readFileSync(distHtmlPath, 'utf8');
}

// 2. Copy compiled assets to root ./assets/
const rootAssetsDir = path.resolve('assets');
if (!fs.existsSync(rootAssetsDir)) fs.mkdirSync(rootAssetsDir, { recursive: true });
const distAssetsDir = path.join(distDir, 'assets');
if (fs.existsSync(distAssetsDir)) {
  for (const file of fs.readdirSync(distAssetsDir)) {
    fs.copyFileSync(path.join(distAssetsDir, file), path.join(rootAssetsDir, file));
  }
}

// 3. Write compiled root index.html
fs.writeFileSync(path.resolve('index.html'), htmlContent);

// 4. Ensure root ./data/ directory has catalog.json and store_config.json
const rootDataDir = path.resolve('data');
if (!fs.existsSync(rootDataDir)) fs.mkdirSync(rootDataDir, { recursive: true });
fs.copyFileSync(path.resolve('public/data/catalog.json'), path.join(rootDataDir, 'catalog.json'));
fs.copyFileSync(path.resolve('public/data/store_config.json'), path.join(rootDataDir, 'store_config.json'));

// 5. Ensure ./docs/ directory exists with full build mirror
const docsDir = path.resolve('docs');
if (!fs.existsSync(docsDir)) fs.mkdirSync(docsDir, { recursive: true });
fs.cpSync(distDir, docsDir, { recursive: true });
fs.writeFileSync(path.join(docsDir, 'index.html'), htmlContent);

// 6. Ensure .nojekyll in root, dist, and docs
fs.writeFileSync(path.resolve('.nojekyll'), '# nojekyll');
fs.writeFileSync(path.join(distDir, '.nojekyll'), '# nojekyll');
fs.writeFileSync(path.join(docsDir, '.nojekyll'), '# nojekyll');

console.log('Static build successfully synced to root, dist, and docs!');
