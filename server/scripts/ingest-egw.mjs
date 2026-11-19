import fs from 'node:fs';
import path from 'node:path';
import * as cheerio from 'cheerio';
import { DATA, fetchText, writeJson, cleanText, sleep } from './lib.mjs';

const BOOKS = [
  { id: 'sc', title: 'Steps to Christ', chapters: 13 },
  { id: 'da', title: 'The Desire of Ages', chapters: 87 },
  { id: 'gc', title: 'The Great Controversy', chapters: 42 },
  { id: 'pp', title: 'Patriarchs and Prophets', chapters: 73 },
  { id: 'pk', title: 'Prophets and Kings', chapters: 60 },
  { id: 'mh', title: 'The Ministry of Healing', chapters: 45 },
  { id: 'mb', title: 'Thoughts from the Mount of Blessing', chapters: 9 },
  { id: 'col', title: "Christ's Object Lessons", chapters: 29 },
  { id: 'aa', title: 'The Acts of the Apostles', chapters: 58 },
  { id: 'ed', title: 'Education', chapters: 35 },
];

function parseChapter(html, book, chapterNum) {
  const $ = cheerio.load(html);
  const container = $('.egw_content_container').first();
  if (!container.length) return null;

  let chapterTitle = '';
  const firstText = cleanText(container.find('.egw_content').first().text());
  const titleMatch = firstText.match(/^Chapter\s+\d+\s*[\u2014\u2013-]\s*(.+)$/i);
  if (titleMatch) chapterTitle = cleanText(titleMatch[1]).slice(0, 90);

  const paragraphs = [];
  const seen = new Set();

  container.find('.egw_content').each((_, el) => {
    const $el = $(el);
    const text = cleanText($el.text());
    if (text.length < 60 || seen.has(text)) return;
    if (/^Chapter\s+\d+/i.test(text)) return;
    if (/^\d+$/.test(text)) return;
    seen.add(text);

    let pageRef = '';
    let node = $el;
    for (let depth = 0; depth < 4 && node.length; depth += 1) {
      const code = cleanText(node.attr('data-refcode'));
      if (code && !/^\d+\.\d+$/.test(code)) {
        pageRef = code;
        break;
      }
      node = node.parent();
    }

    paragraphs.push({ text, pageRef });
  });

  return { chapterTitle, paragraphs };
}

async function ingestBook(book) {
  const file = path.join(DATA, 'docs', `egw-en-${book.id}.json`);
  let docs = [];
  if (fs.existsSync(file)) {
    docs = JSON.parse(fs.readFileSync(file, 'utf8'));
  }
  const have = new Set(docs.map((doc) => doc.chapter));
  let misses = 0;
  let added = 0;
  const maxChapters = book.chapters || 120;

  for (let n = 1; n <= maxChapters; n += 1) {
    if (have.has(n)) continue;

    const url = `https://www.whiteestate.org/books/${book.id}/${book.id}${n}.html`;
    let html = null;
    try {
      html = await fetchText(url, { tries: 4 });
    } catch (error) {
      console.warn(`  ${book.title} sura ${n}: ${error.message}`);
    }

    if (!html) {
      misses += 1;
      console.warn(`  ${book.title}: sura ${n} haikupatikana (${misses}/6)`);
      if (misses >= 6) break;
      await sleep(3000);
      continue;
    }

    const parsed = parseChapter(html, book, n);
    if (!parsed || parsed.paragraphs.length === 0) {
      misses += 1;
      if (misses >= 6) break;
      await sleep(1200);
      continue;
    }

    misses = 0;
    const startIndex = docs.filter((doc) => doc.chapter === n).length;
    parsed.paragraphs.forEach((paragraph, index) => {
      const pageNumber = paragraph.pageRef
        ? paragraph.pageRef.replace(/^[A-Za-z0-9]+\s+/, '')
        : '';
      docs.push({
        id: `egw:en:${book.id}:${n}:${startIndex + index}`,
        lang: 'en',
        type: 'egw',
        book: book.title,
        chapter: n,
        verse: null,
        title: parsed.chapterTitle,
        ref: `${book.title}, ch. ${n}${pageNumber ? `, p. ${pageNumber}` : ''}`,
        text: paragraph.text,
        page: pageNumber,
        source: 'Ellen G. White Writings',
      });
    });
    added += 1;
    if (added % 5 === 0) console.log(`  ${book.title}: sura ${n}`);
    if (added % 10 === 0) {
      docs.sort((a, b) => a.chapter - b.chapter || a.id.localeCompare(b.id));
      await writeJson(file, docs);
    }
    await sleep(450);
  }

  docs.sort((a, b) => a.chapter - b.chapter || a.id.localeCompare(b.id));
  await writeJson(file, docs);
  console.log(`${book.title}: aya ${docs.length} (sura mpya ${added})`);
}

for (const book of BOOKS) {
  await ingestBook(book);
}
