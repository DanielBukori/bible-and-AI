import path from 'node:path';
import {
  DATA,
  fetchText,
  writeJson,
  stripMarkdown,
  parseFrontmatter,
  sleep,
} from './lib.mjs';

const REPO = 'https://raw.githubusercontent.com/Adventech/sabbath-school-lessons/master/src';
const API = 'https://api.github.com/repos/Adventech/sabbath-school-lessons/contents/src';

const PLAN = [
  { lang: 'sw', count: 4, source: 'Mafundisho ya Robo Mwaka' },
  { lang: 'en', count: 2, source: 'Sabbath School Quarterly' },
];

function parseYaml(text) {
  const out = {};
  if (!text) return out;
  for (const line of text.split(/\r?\n/)) {
    const idx = line.indexOf(':');
    if (idx === -1) continue;
    const key = line.slice(0, idx).trim();
    let value = line.slice(idx + 1).trim();
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }
    out[key] = value;
  }
  return out;
}

async function listQuarters(lang) {
  const res = await fetch(API + '/' + lang, {
    headers: { 'User-Agent': 'BibliaNaUnabii/1.0', Accept: 'application/vnd.github+json' },
  });
  if (!res.ok) throw new Error(`GitHub listing failed for ${lang}: HTTP ${res.status}`);
  const items = await res.json();
  return items
    .map((item) => item.name)
    .filter((name) => /^\d{4}-\d{2}$/.test(name))
    .sort();
}

async function ingestQuarter(lang, quarter, sourceLabel) {
  const quarterInfo = parseYaml(await fetchText(`${REPO}/${lang}/${quarter}/info.yml`));
  const quarterTitle = quarterInfo.title || quarter;
  const docs = [];

  for (let lesson = 1; lesson <= 13; lesson += 1) {
    const lessonDir = `${REPO}/${lang}/${quarter}/${String(lesson).padStart(2, '0')}`;
    const lessonInfoRaw = await fetchText(`${lessonDir}/info.yml`);
    if (!lessonInfoRaw) break;
    const lessonInfo = parseYaml(lessonInfoRaw);
    const lessonTitle = lessonInfo.title || `Somo ${lesson}`;

    for (let day = 1; day <= 7; day += 1) {
      const md = await fetchText(`${lessonDir}/${String(day).padStart(2, '0')}.md`);
      if (!md) break;
      const meta = parseFrontmatter(md);
      const body = stripMarkdown(md);
      if (body.length < 80) continue;

      const dayTitle = meta.title || `Siku ${day}`;
      const dayDate = meta.date || '';

      docs.push({
        id: `q:${lang}:${quarter}:${lesson}:${day}`,
        lang,
        type: 'quarterly',
        book: quarterTitle,
        chapter: lesson,
        verse: null,
        title: `${lessonTitle} — ${dayTitle}`,
        ref: `${quarterTitle} — Somo ${lesson} (${lessonTitle})${dayDate ? `, ${dayDate}` : ''}`,
        text: body,
        source: sourceLabel,
      });
      await sleep(35);
    }
  }

  console.log(`${lang} ${quarter} (${quarterTitle}): sehemu ${docs.length}`);
  return docs;
}

for (const { lang, count, source } of PLAN) {
  const quarters = await listQuarters(lang);
  const chosen = quarters.slice(-count);
  const all = [];
  for (const quarter of chosen) {
    const docs = await ingestQuarter(lang, quarter, source);
    all.push(...docs);
  }
  await writeJson(path.join(DATA, 'docs', `quarterly-${lang}.json`), all);
  console.log(`Robo mwaka ${lang}: jumla ${all.length}`);
}
