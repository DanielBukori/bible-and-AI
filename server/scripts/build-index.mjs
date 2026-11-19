import fs from 'node:fs/promises';
import path from 'node:path';
import MiniSearch from 'minisearch';
import { DATA, readJson, writeJson } from './lib.mjs';
import { MINI_OPTIONS } from '../src/schema.js';

const DOCS_DIR = path.join(DATA, 'docs');

const files = (await fs.readdir(DOCS_DIR)).filter((file) => file.endsWith('.json'));
const allDocs = [];

for (const file of files) {
  const docs = await readJson(path.join(DOCS_DIR, file));
  allDocs.push(...docs);
  console.log(`${file}: ${docs.length}`);
}

const byLang = { sw: [], en: [] };
for (const doc of allDocs) {
  if (byLang[doc.lang]) byLang[doc.lang].push(doc);
}

const stats = {
  builtAt: new Date().toISOString(),
  docs: {},
  byType: { sw: {}, en: {} },
  sources: [],
};

const sourceMap = new Map();

for (const [lang, docs] of Object.entries(byLang)) {
  if (!docs.length) continue;
  const index = new MiniSearch(MINI_OPTIONS);
  index.addAll(docs);
  const serialized = JSON.stringify(index);
  await fs.writeFile(path.join(DATA, `index-${lang}.json`), serialized, 'utf8');

  stats.docs[lang] = docs.length;
  stats.byType[lang] ??= {};
  for (const doc of docs) {
    stats.byType[lang][doc.type] = (stats.byType[lang][doc.type] || 0) + 1;
    const key = `${doc.source}|${doc.type}|${doc.lang}`;
    const entry = sourceMap.get(key) || {
      label: doc.source,
      type: doc.type,
      lang: doc.lang,
      docs: 0,
    };
    entry.docs += 1;
    sourceMap.set(key, entry);
  }
  console.log(`Index ${lang}: ${docs.length} (${(serialized.length / 1024 / 1024).toFixed(1)} MB)`);
}

stats.sources = [...sourceMap.values()].sort((a, b) => b.docs - a.docs);
stats.books = {
  egw: [...new Set(allDocs.filter((d) => d.type === 'egw').map((d) => d.book))],
  quarterly: [...new Set(allDocs.filter((d) => d.type === 'quarterly').map((d) => d.book))],
};

await writeJson(path.join(DATA, 'meta.json'), stats);
console.log('meta.json imeandikwa');
