import fs from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

const assetRoot = path.resolve('public/cat_quiz_assets');
const qualityByFolder = new Map([
  ['characters', 82],
  ['hidden', 86],
  ['general', 82],
  ['icons', 90],
]);

async function walk(dir) {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) files.push(...await walk(fullPath));
    if (entry.isFile() && entry.name.toLowerCase().endsWith('.png')) files.push(fullPath);
  }
  return files;
}

function folderQuality(filePath) {
  const relative = path.relative(assetRoot, filePath).split(path.sep);
  return qualityByFolder.get(relative[0]) || 82;
}

const files = await walk(assetRoot);
let before = 0;
let after = 0;

for (const file of files) {
  const out = file.replace(/\.png$/i, '.webp');
  const inputStat = await fs.stat(file);
  before += inputStat.size;
  await sharp(file)
    .webp({ quality: folderQuality(file), effort: 5, smartSubsample: true })
    .toFile(out);
  const outputStat = await fs.stat(out);
  after += outputStat.size;
  console.log(`${path.relative(assetRoot, file)} -> ${path.relative(assetRoot, out)} ${(inputStat.size / 1024).toFixed(0)}KB -> ${(outputStat.size / 1024).toFixed(0)}KB`);
}

console.log(`Compressed ${files.length} PNG files: ${(before / 1024 / 1024).toFixed(2)}MB -> ${(after / 1024 / 1024).toFixed(2)}MB`);
