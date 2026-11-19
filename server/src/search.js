import fs from 'node:fs';
import path from 'node:path';
import MiniSearch from 'minisearch';
import { MINI_OPTIONS, SEARCH_OPTIONS, queryTerms } from './schema.js';
import { BOOK_NAMES } from './books.js';
import { TOPICS } from './topics.js';
import { allDocs } from './store.js';

const DATA = path.resolve(import.meta.dirname, '..', 'data');

let meta = null;
const indexes = {};
const bibleByRef = { sw: new Map(), en: new Map() };

export function loadIndexes() {
  const metaPath = path.join(DATA, 'meta.json');
  if (fs.existsSync(metaPath)) {
    meta = JSON.parse(fs.readFileSync(metaPath, 'utf8'));
  }
  for (const doc of allDocs()) {
    if (doc.type === 'bible' && bibleByRef[doc.lang]) {
      bibleByRef[doc.lang].set(String(doc.ref).toLowerCase(), doc);
    }
  }
  for (const lang of ['sw', 'en']) {
    const file = path.join(DATA, `index-${lang}.json`);
    if (fs.existsSync(file)) {
      indexes[lang] = MiniSearch.loadJSON(fs.readFileSync(file, 'utf8'), MINI_OPTIONS);
    }
  }
  return Object.keys(indexes);
}

export function matchTopic(lang, query) {
  const lower = String(query || '').toLowerCase();
  let best = null;
  let bestLength = 0;
  for (const topic of TOPICS) {
    for (const keyword of topic.keywords[lang] || []) {
      if (lower.includes(keyword) && keyword.length > bestLength) {
        best = topic;
        bestLength = keyword.length;
      }
    }
  }
  return best;
}

export function curatedDocs(lang, query) {
  const topic = matchTopic(lang, query);
  if (!topic) return [];

  return (topic.refs[lang] || [])
    .map((ref) => bibleByRef[lang].get(ref.toLowerCase()))
    .filter(Boolean)
    .map((doc) => ({ ...doc, score: 0 }));
}

export function getMeta() {
  return meta;
}

export function hasIndex(lang) {
  return Boolean(indexes[lang]);
}

export function rerankResults(results, terms, { lang = 'sw', query = '' } = {}) {
  const pairs = [];
  for (let i = 0; i < terms.length - 1; i += 1) {
    pairs.push(`${terms[i]} ${terms[i + 1]}`);
  }

  const lowerQuery = String(query).toLowerCase();
  const names = BOOK_NAMES[lang] || [];
  const mentionedBook = names.find((name) => lowerQuery.includes(name.toLowerCase())) || '';
  let mentionedChapter = null;
  if (mentionedBook) {
    const match = lowerQuery.match(new RegExp(`${mentionedBook.toLowerCase().replace(/[.*+?^\${}()|[\]\\]/g, '\\$&')}\\s+(\\d+)`));
    if (match) mentionedChapter = Number(match[1]);
  }

  return results
    .map((result) => {
      const hay = `${result.book} ${result.ref} ${result.title || ''} ${result.text}`.toLowerCase();
      let covered = 0;
      for (const term of terms) {
        if (hay.includes(term)) covered += 1;
      }
      const coverage = terms.length ? covered / terms.length : 0;
      let pairBonus = 0;
      for (const pair of pairs) {
        if (hay.includes(pair)) pairBonus += 0.6;
      }

      let score = result.score * (1 + 1.8 * coverage) + pairBonus;

      if (mentionedBook && String(result.book).toLowerCase() === mentionedBook.toLowerCase()) {
        score *= 2.2;
        if (mentionedChapter && Number(result.chapter) === mentionedChapter) score *= 1.8;
      }

      return { result, score };
    })
    .sort((a, b) => b.score - a.score)
    .map((entry) => entry.result);
}

export function searchDocs(lang, query, limit = 8, { type = '' } = {}) {
  const index = indexes[lang];
  if (!index) return [];

  const options = type
    ? { ...SEARCH_OPTIONS, filter: (result) => result.type === type }
    : SEARCH_OPTIONS;

  let results = [];
  try {
    results = index.search(query, options);
  } catch {
    return [];
  }
  if (!results.length) return [];

  const terms = queryTerms(query);
  const ranked = terms.length
    ? rerankResults(results.slice(0, 120), terms, { lang, query })
    : results;

  return ranked.slice(0, limit).map((result) => {
    const { score, ...doc } = result;
    return { ...doc, score };
  });
}
