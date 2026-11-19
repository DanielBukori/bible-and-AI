import fs from 'node:fs';
import path from 'node:path';
import * as cheerio from 'cheerio';
import { DATA, fetchText, writeJson, cleanText, sleep } from './lib.mjs';

const BASE = 'https://m.egwwritings.org';

const BOOKS = [
  { id: '12205', title: 'Hatua Za Ukamilifu Katika Kristo' },
  { id: '13871', title: 'Tumaini la Vizazi Vyote' },
  { id: '14719', title: 'Pambano Kuu' },
  { id: '14250', title: 'Pendo Lisilo Kifani' },
  { id: '14659', title: 'Mashujaa wa Imani' },
];

const FRONT_MATTER = /^(yaliyomo|dibaji|utangulizi|kwa nini|sababu gani|ujumbe wa mwandishi|nyongezo|nyongeza|shukrani|faharasa|index)/i;

function tocEntries(html, bookId) {
  const $ = cheerio.load(html);
  const entries = [];
  const pattern = new RegExp(`/sw/book/${bookId}\\.[0-9]+$`);
  $('a').each((_, el) => {
    const href = $(el).attr('href') || '';
    const label = cleanText($(el).text());
    if (!pattern.test(href) || !label || /^read$/i.test(label)) return;
    if (FRONT_MATTER.test(label)) return;
    entries.push({ href, label });
  });
  const seen = new Set();
  return entries.filter((entry) => {
    if (seen.has(entry.href)) return false;
    seen.add(entry.href);
    return true;
  });
}

function cleanChapterTitle(label) {
  const stripped = label
    .replace(/^sura\s*(ya)?\s*/i, '')
    .replace(/^[^\u2014\u2013-]*[\u2014\u2013-]\s*/, '')
    .replace(/^\d+\s+/, '')
    .trim();
  return (stripped || label).slice(0, 120);
}

function parseChapter(html, book, chapter, nextPos) {
  const $ = cheerio.load(html);
  const container = $('.egw_content_container').first();
  if (!container.length) return null;

  const paragraphs = [];
  const seen = new Set();

  container.find('.egw_content').each((_, el) => {
    const text = cleanText($(el).text());
    if (!text || text.length < 40 || seen.has(text)) return;
    if (/^sura\b/i.test(text) && text.length < 140) return;
    if (text.toUpperCase() === book.title.toUpperCase()) return;
    seen.add(text);

    let pos = null;
    let node = $(el);
    for (let depth = 0; depth < 5 && node.length; depth += 1) {
      const code = cleanText(node.attr('data-refcode'));
      if (code && code.startsWith(`${book.id}.`)) {
        pos = Number(code.slice(book.id.length + 1));
        break;
      }
      node = node.parent();
    }
    if (pos != null && (pos < chapter.pos || (nextPos != null && pos >= nextPos))) return;

    paragraphs.push(text);
  });

  return paragraphs;
}

async function ingestBook(book) {
  const file = path.join(DATA, 'docs', `egw-sw-${book.id}.json`);
  let docs = [];
  if (fs.existsSync(file)) docs = JSON.parse(fs.readFileSync(file, 'utf8'));
  const have = new Set(docs.map((doc) => doc.chapter));

  const tocHtml = await fetchText(`${BASE}/sw/book/${book.id}/toc`, { tries: 4 });
  if (!tocHtml) {
    console.log(`${book.title}: TOC haikupatikana`);
    return;
  }
  const entries = tocEntries(tocHtml, book.id).map((entry, index) => {
    const posMatch = entry.href.match(/\.([0-9]+)$/);
    return {
      ...entry,
      chapter: index + 1,
      pos: posMatch ? Number(posMatch[1]) : 0,
      title: cleanChapterTitle(entry.label),
    };
  });

  let added = 0;
  for (let index = 0; index < entries.length; index += 1) {
    const entry = entries[index];
    if (have.has(entry.chapter)) continue;

    const html = await fetchText(`${BASE}${entry.href}`, { tries: 4 });
    if (!html) {
      console.warn(`  ${book.title} sura ${entry.chapter}: haikupatikana`);
      await sleep(2000);
      continue;
    }

    const nextPos = entries[index + 1]?.pos ?? null;
    const paragraphs = parseChapter(html, book, entry, nextPos);
    if (!paragraphs || paragraphs.length === 0) {
      console.warn(`  ${book.title} sura ${entry.chapter}: haina maandishi`);
      await sleep(1000);
      continue;
    }

    paragraphs.forEach((text, i) => {
      docs.push({
        id: `egw:sw:${book.id}:${entry.chapter}:${i}`,
        lang: 'sw',
        type: 'egw',
        book: book.title,
        chapter: entry.chapter,
        verse: null,
        title: entry.title,
        ref: `${book.title}, sura ${entry.chapter}, kifungu ${i + 1}`,
        text,
        page: '',
        source: 'Ellen G. White Writings',
      });
    });

    added += 1;
    if (added % 5 === 0) console.log(`  ${book.title}: sura ${entry.chapter}/${entries.length}`);
    if (added % 10 === 0) {
      docs.sort((a, b) => a.chapter - b.chapter || a.id.localeCompare(b.id));
      await writeJson(file, docs);
    }
    await sleep(500);
  }

  docs.sort((a, b) => a.chapter - b.chapter || a.id.localeCompare(b.id));
  await writeJson(file, docs);
  console.log(`${book.title}: vifungu ${docs.length} (sura mpya ${added}/${entries.length})`);
}

for (const book of BOOKS) {
  await ingestBook(book);
}
