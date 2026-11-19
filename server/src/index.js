import path from 'node:path';
import fs from 'node:fs';
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { loadIndexes, getMeta, hasIndex, searchDocs, curatedDocs, matchTopic } from './search.js';
import {
  loadContent,
  getHome,
  getBibleBooks,
  getBibleBook,
  getBibleChapter,
  getQuarters,
  getLesson,
  getEgwBooks,
  getEgwBookInfo,
  getEgwChapter,
} from './content.js';
import { queryTerms } from './schema.js';
import { llmStatus, composeAnswer, composeChat, refusalFor } from './llm.js';
import { detectSmallTalk, smallTalkReply } from './conversation.js';

dotenv.config({ path: path.resolve(import.meta.dirname, '..', '.env') });

const app = express();
const PORT = Number(process.env.PORT || 4000);

app.use(cors());
app.use(express.json({ limit: '64kb' }));

const loaded = loadIndexes();
if (loaded.length === 0) {
  console.warn('Hakuna index. Endesha: npm run ingest');
}
loadContent();

function toSource(doc, index) {
  return {
    n: index + 1,
    id: doc.id,
    lang: doc.lang,
    type: doc.type,
    book: doc.book,
    chapter: doc.chapter,
    verse: doc.verse,
    ref: doc.ref,
    title: doc.title || '',
    text: doc.text,
    page: doc.page || '',
    source: doc.source,
  };
}

app.get('/api/health', (req, res) => {
  res.json({
    ok: true,
    indexes: loaded,
    llm: llmStatus(),
    docs: getMeta()?.docs ?? {},
  });
});

app.get('/api/stats', (req, res) => {
  res.json({
    meta: getMeta(),
    llm: llmStatus(),
    ready: loaded.length > 0,
  });
});

app.get('/api/search', (req, res) => {
  const lang = req.query.lang === 'en' ? 'en' : 'sw';
  const q = String(req.query.q || '').trim();
  if (!q) return res.status(400).json({ error: 'Missing q' });
  res.json({ lang, results: searchDocs(lang, q, 10).map(toSource) });
});

function contentLang(req) {
  return req.query.lang === 'en' ? 'en' : 'sw';
}

app.get('/api/content/home', (req, res) => {
  res.json(getHome(contentLang(req)));
});

app.get('/api/content/bible/books', (req, res) => {
  res.json(getBibleBooks(contentLang(req)));
});

app.get('/api/content/bible/book', (req, res) => {
  const book = Number(req.query.book);
  if (!book) return res.status(400).json({ error: 'Missing book' });
  const data = getBibleBook(contentLang(req), book);
  if (!data) return res.status(404).json({ error: 'Book not found' });
  res.json(data);
});

app.get('/api/content/bible/chapter', (req, res) => {
  const lang = contentLang(req);
  const book = Number(req.query.book);
  const chapter = Number(req.query.chapter);
  if (!book || !chapter) return res.status(400).json({ error: 'Missing book or chapter' });
  const data = getBibleChapter(lang, book, chapter);
  if (!data) return res.status(404).json({ error: 'Chapter not found' });
  res.json(data);
});

app.get('/api/content/lessons', (req, res) => {
  res.json(getQuarters(contentLang(req)));
});

app.get('/api/content/lesson', (req, res) => {
  const lang = contentLang(req);
  const quarter = String(req.query.quarter || '');
  const lesson = Number(req.query.lesson);
  if (!quarter || !lesson) return res.status(400).json({ error: 'Missing quarter or lesson' });
  const data = getLesson(lang, quarter, lesson);
  if (!data) return res.status(404).json({ error: 'Lesson not found' });
  res.json(data);
});

app.get('/api/content/egw', (req, res) => {
  res.json(getEgwBooks(contentLang(req)));
});

app.get('/api/content/egw/book', (req, res) => {
  const book = String(req.query.book || '');
  if (!book) return res.status(400).json({ error: 'Missing book' });
  const data = getEgwBookInfo(contentLang(req), book);
  if (!data) return res.status(404).json({ error: 'Book not found' });
  res.json(data);
});

app.get('/api/content/egw/chapter', (req, res) => {
  const lang = contentLang(req);
  const book = String(req.query.book || '');
  const chapter = Number(req.query.chapter);
  if (!book || !chapter) return res.status(400).json({ error: 'Missing book or chapter' });
  const data = getEgwChapter(lang, book, chapter);
  if (!data) return res.status(404).json({ error: 'Chapter not found' });
  res.json(data);
});

function mergeVerseRuns(docs) {
  const merged = [];
  for (const doc of docs) {
    const prev = merged[merged.length - 1];
    if (
      prev &&
      prev.type === 'bible' &&
      doc.type === 'bible' &&
      prev.book === doc.book &&
      Number(prev.chapter) === Number(doc.chapter) &&
      Number(doc.verse) === Number(prev.verseEnd) + 1
    ) {
      prev.text = `${prev.text} ${doc.text}`;
      prev.verseEnd = Number(doc.verse);
      const range =
        prev.verseStart === prev.verseEnd
          ? `${prev.verseStart}`
          : `${prev.verseStart}-${prev.verseEnd}`;
      prev.ref = `${prev.book} ${prev.chapter}:${range}`;
      continue;
    }
    if (doc.type === 'bible') {
      merged.push({ ...doc, verseStart: Number(doc.verse), verseEnd: Number(doc.verse) });
    } else {
      merged.push(doc);
    }
  }
  return merged;
}

function firstSentences(text, max = 2) {
  const cleaned = String(text).replace(/\s+/g, ' ').trim();
  const parts = cleaned.split(/(?<=[.!?…])\s+(?=[A-ZÀ-Ý“"'(])/);
  let out = parts.slice(0, max).join(' ').trim();
  if (out.length > 340) out = `${out.slice(0, 337).trimEnd()}...`;
  return out;
}

function composeQuoteAnswer(sources, lang) {
  const usable = sources.filter((source) => source.lang === lang).slice(0, 3);
  if (!usable.length) return null;
  return usable.map((source) => `${firstSentences(source.text)} [${source.n}]`).join('\n\n');
}

app.post('/api/chat', async (req, res) => {
  const question = String(req.body?.question || '').trim();
  const lang = req.body?.lang === 'en' ? 'en' : 'sw';

  if (question.length < 3) {
    return res.status(400).json({ error: 'Swali ni fupi mno. Tafadhali andika swali kamili.' });
  }
  if (question.length > 600) {
    return res.status(400).json({ error: 'Swali ni refu mno. Tafadhali lifupishe.' });
  }

  const smallTalk = detectSmallTalk(question);
  if (smallTalk) {
    if (llmStatus()) {
      try {
        const answer = await composeChat({ question, lang });
        return res.json({ mode: 'chat', answer, sources: [], lang, question });
      } catch (error) {
        console.error('LLM chat error:', error.message);
      }
    }
    return res.json({
      mode: 'chat',
      answer: smallTalkReply(smallTalk, lang, { aiEnabled: Boolean(llmStatus()) }),
      sources: [],
      lang,
      question,
    });
  }

  if (!hasIndex(lang)) {
    return res.status(503).json({
      error: 'Hifadhidata bado haijajengwa. Endesha: npm run ingest',
    });
  }

  const history = Array.isArray(req.body?.history)
    ? req.body.history.filter((item) => typeof item === 'string' && item.trim()).slice(-3)
    : [];
  const followUpOnly = /^(eleza zaidi|endelea|zaidi|kwa nini|why|explain more|tell me more|go on|continue)[?.!]*$/i.test(
    question,
  );
  let retrievalQuery = question;
  if ((followUpOnly || queryTerms(question).length === 0) && history.length) {
    retrievalQuery = history[history.length - 1];
  }

  const curated = mergeVerseRuns(curatedDocs(lang, retrievalQuery)).slice(0, 10);
  const seen = new Set(curated.map((doc) => doc.id));
  const coveredVerses = new Set();
  for (const doc of curated) {
    if (doc.type !== 'bible') continue;
    for (let verse = doc.verseStart; verse <= doc.verseEnd; verse += 1) {
      coveredVerses.add(`${doc.book}|${doc.chapter}|${verse}`);
    }
  }
  const found = searchDocs(lang, retrievalQuery, 10).filter((doc) => {
    if (seen.has(doc.id)) return false;
    if (doc.type === 'bible' && coveredVerses.has(`${doc.book}|${doc.chapter}|${Number(doc.verse)}`)) {
      return false;
    }
    return true;
  });

  let notice = '';
  const topic = matchTopic(lang, retrievalQuery);
  const topicKeywords = topic?.keywords?.[lang] || [];
  const matchesTopic = (doc) => {
    const hay = `${doc.book} ${doc.title || ''} ${doc.text}`.toLowerCase();
    return topicKeywords.some((keyword) => hay.includes(keyword));
  };
  const egwLocalAll = searchDocs(lang, retrievalQuery, 3, { type: 'egw' });
  const egwLocal = topicKeywords.length ? egwLocalAll.filter(matchesTopic) : egwLocalAll;
  const localCoversTopic = topicKeywords.length ? egwLocal.length >= 1 : egwLocal.length >= 2;

  let egwSupplement = [];
  if (lang === 'sw' && !localCoversTopic) {
    const enQuery = topic?.keywords?.en?.length ? topic.keywords.en.join(' ') : retrievalQuery;
    egwSupplement = searchDocs('en', enQuery, 3, { type: 'egw' });
    if (egwSupplement.length) {
      notice = 'Kwa swali hili, nukuu za Roho ya Unabii zinapatikana kwa lugha ya Kiingereza pekee; vyanzo hivyo vimewekwa alama EN.';
    }
  }

  const picks = [];
  const taken = new Set();
  const push = (doc) => {
    if (!doc || picks.length >= 12 || taken.has(doc.id)) return;
    picks.push(doc);
    taken.add(doc.id);
  };

  curated.slice(0, 6).forEach(push);
  [...egwLocal, ...egwSupplement].forEach(push);
  found.slice(0, 4).forEach(push);
  found.slice(4).forEach(push);

  if (picks.length === 0) {
    const other = lang === 'sw' ? 'en' : 'sw';
    if (hasIndex(other)) {
      const alt = searchDocs(other, retrievalQuery, 6).filter((doc) => !taken.has(doc.id));
      alt.forEach(push);
      if (picks.length) {
        notice =
          lang === 'sw'
            ? 'Sikupata vyanzo kwa Kiswahili; vyanzo vilivyoonyeshwa ni vya lugha ya Kiingereza (EN).'
            : 'No sources were found in English; the sources shown are in Swahili (SW).';
      }
    }
  }

  const sources = picks.map(toSource);

  if (sources.length === 0) {
    return res.json({
      mode: 'empty',
      answer: refusalFor(lang),
      sources: [],
      lang,
      question,
    });
  }

  let mode = 'quotes';
  let answer = composeQuoteAnswer(sources, lang);

  if (llmStatus()) {
    try {
      answer = await composeAnswer({ question, lang, sources, history });
      mode = 'ai';
    } catch (error) {
      console.error('LLM error:', error.message);
      notice = 'AI haikuweza kuandaa jibu; kwa hiyo nukuu halisi zinaonyeshwa.';
    }
  }

  res.json({ mode, answer, sources, notice, lang, question });
});

const PUBLIC_DIR = path.resolve(import.meta.dirname, '..', 'public');
app.use(express.static(PUBLIC_DIR));
app.get('*', (req, res) => {
  if (req.path.startsWith('/api/')) return res.status(404).json({ error: 'Not found' });
  res.sendFile(path.join(PUBLIC_DIR, 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Biblia na Unabii server: http://localhost:${PORT}`);
  console.log(`LLM: ${llmStatus() ? llmStatus().provider + ' / ' + llmStatus().model : 'haijawekwa (hali ya nukuu)'}`);
});
