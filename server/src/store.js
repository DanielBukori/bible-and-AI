import fs from 'node:fs';
import path from 'node:path';

const DATA = path.resolve(import.meta.dirname, '..', 'data');

let cached = null;

export function allDocs() {
  if (cached) return cached;
  const docs = [];
  const dir = path.join(DATA, 'docs');
  if (fs.existsSync(dir)) {
    for (const file of fs.readdirSync(dir)) {
      if (!file.endsWith('.json')) continue;
      const items = JSON.parse(fs.readFileSync(path.join(dir, file), 'utf8'));
      for (const item of items) docs.push(item);
    }
  }
  cached = docs;
  return docs;
}
