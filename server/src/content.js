import { allDocs } from './store.js';
import { BOOK_NAMES } from './books.js';
import { TOPICS } from './topics.js';

const QUARTER_LABELS = {
  sw: ['Robo ya Kwanza', 'Robo ya Pili', 'Robo ya Tatu', 'Robo ya Nne'],
  en: ['First Quarter', 'Second Quarter', 'Third Quarter', 'Fourth Quarter'],
};

const ENTITIES = {
  nbsp: ' ',
  amp: '&',
  lt: '<',
  gt: '>',
  quot: '"',
  apos: "'",
  ldquo: '\u201c',
  rdquo: '\u201d',
  lsquo: '\u2018',
  rsquo: '\u2019',
  mdash: '\u2014',
  ndash: '\u2013',
  hellip: '\u2026',
};

const bible = { sw: null, en: null };
const bibleByRef = { sw: new Map(), en: new Map() };
const quarterly = { sw: null, en: null };
const egw = { sw: null, en: null };
const dailyRefs = { sw: [], en: [] };

function decodeEntities(text) {
  return String(text)
    .replace(/&#x([0-9a-f]+);/gi, (_, hex) => String.fromCodePoint(parseInt(hex, 16)))
    .replace(/&#(\d+);/g, (_, dec) => String.fromCodePoint(Number(dec)))
    .replace(/&([a-z]+);/gi, (match, name) => ENTITIES[name.toLowerCase()] ?? match);
}

function clean(text) {
  if (!text) return '';
  let out = String(text)
    .replace(/<br\s*\/?>/gi, '\n')
    .replace(/<\/(p|div|li|h[1-6])>/gi, '\n')
    .replace(/<[^>]*>/g, '');
  out = decodeEntities(out);
  return out
    .replace(/\r/g, '')
    .replace(/[ \t]+/g, ' ')
    .replace(/ *\n */g, '\n')
    .replace(/\n{3,}/g, '\n\n')
    .trim();
}

function sortByNumber(list, key = 'n') {
  return list.sort((a, b) => Number(a[key]) - Number(b[key]));
}

function buildDailyRefs() {
  for (const lang of ['sw', 'en']) {
    const seen = new Set();
    for (const topic of TOPICS) {
      for (const ref of topic.refs[lang] || []) {
        if (seen.has(ref)) continue;
        seen.add(ref);
        dailyRefs[lang].push({ ref, topic: topic.id });
      }
    }
  }
}

export function loadContent() {
  if (bible.sw && bible.en) return;

  for (const lang of ['sw', 'en']) {
    bible[lang] = { order: [] };
    quarterly[lang] = { quarters: new Map() };
    egw[lang] = { books: new Map() };
  }

  for (const doc of allDocs()) {
    if (doc.type === 'bible') {
      const lang = doc.lang;
      if (!bible[lang]) continue;
      const no = BOOK_NAMES[lang].indexOf(doc.book) + 1;
      if (!no) continue;
      let book = bible[lang][no];
      if (!book) {
        book = { n: no, name: doc.book, chapters: new Map(), verses: 0 };
        bible[lang][no] = book;
      }
      let chapter = book.chapters.get(Number(doc.chapter));
      if (!chapter) {
        chapter = [];
        book.chapters.set(Number(doc.chapter), chapter);
      }
      chapter.push({ v: Number(doc.verse), text: doc.text });
      book.verses += 1;
      bibleByRef[lang].set(String(doc.ref).toLowerCase(), doc);
      continue;
    }

    if (doc.type === 'quarterly') {
      const lang = doc.lang;
      if (!quarterly[lang]) continue;
      const parts = String(doc.id).split(':');
      const key = parts[2];
      const lessonNo = Number(parts[3]);
      const sectionNo = Number(parts[4]);
      let quarter = quarterly[lang].quarters.get(key);
      if (!quarter) {
        quarter = {
          key,
          title: doc.book,
          label: '',
          lessons: new Map(),
        };
        quarterly[lang].quarters.set(key, quarter);
      }
      let lesson = quarter.lessons.get(lessonNo);
      if (!lesson) {
        const match = String(doc.ref).match(/\((.*)\)\s*,\s*(\d{2}\/\d{2}\/\d{4})/);
        lesson = {
          n: lessonNo,
          title: match ? match[1] : String(doc.title || '').split(' \u2014 ')[1] || '',
          date: match ? match[2] : '',
          ref: doc.ref,
          sections: [],
        };
        quarter.lessons.set(lessonNo, lesson);
      }
      lesson.sections.push({
        n: sectionNo,
        title: clean(String(doc.title || '').split(' \u2014 ')[1] || doc.title || ''),
        text: clean(doc.text),
      });
      continue;
    }

    if (doc.type === 'egw') {
      const lang = doc.lang;
      if (!egw[lang]) continue;
      const parts = String(doc.id).split(':');
      const bookId = parts[2];
      const chapterNo = Number(parts[3]);
      const sectionNo = Number(parts[4]);
      let book = egw[lang].books.get(bookId);
      if (!book) {
        book = { id: bookId, title: doc.book, lang, chapters: new Map() };
        egw[lang].books.set(bookId, book);
      }
      let chapter = book.chapters.get(chapterNo);
      if (!chapter) {
        chapter = { n: chapterNo, title: '', sections: [] };
        book.chapters.set(chapterNo, chapter);
      }
      const title = clean(doc.title);
      if (title && !chapter.title) chapter.title = title;
      chapter.sections.push({
        n: sectionNo,
        title,
        ref: doc.ref,
        page: doc.page || '',
        text: clean(doc.text),
      });
    }
  }

  for (const lang of ['sw', 'en']) {
    const books = bible[lang];
    books.order = sortByNumber(
      Object.values(books).filter((value) => value && value.chapters instanceof Map),
    );
    for (const book of books.order) {
      book.chapterList = sortByNumber(
        [...book.chapters.entries()].map(([number, verses]) => ({
          number,
          verses: verses.sort((a, b) => a.v - b.v),
        })),
        'number',
      );
      book.chapterCount = book.chapterList.length;
      delete book.chapters;
    }

    for (const quarter of quarterly[lang].quarters.values()) {
      const [, year, index] = quarter.key.match(/^(\d{4})-(\d{2})$/) || [];
      const labels = QUARTER_LABELS[lang];
      quarter.label = year ? `${labels[Number(index) - 1]} ${year}` : quarter.key;
      quarter.lessonList = sortByNumber([...quarter.lessons.values()]);
      for (const lesson of quarter.lessonList) {
        lesson.sections = sortByNumber(lesson.sections);
      }
      delete quarter.lessons;
    }
    quarterly[lang].list = [...quarterly[lang].quarters.values()].sort((a, b) =>
      a.key.localeCompare(b.key),
    );
    delete quarterly[lang].quarters;

    for (const book of egw[lang].books.values()) {
      book.chapterList = sortByNumber(
        [...book.chapters.entries()].map(([number, chapter]) => {
          chapter.sections = sortByNumber(chapter.sections);
          if (!chapter.title) chapter.title = `Chapter ${number}`;
          return { number, ...chapter };
        }),
        'number',
      );
      book.chapterCount = book.chapterList.length;
      delete book.chapters;
    }
    egw[lang].list = [...egw[lang].books.values()].sort((a, b) => a.title.localeCompare(b.title));
    delete egw[lang].books;
  }

  buildDailyRefs();
}

function summary(book) {
  return { n: book.n, name: book.name, chapters: book.chapterCount, verses: book.verses };
}

function findBook(lang, no) {
  return bible[lang][Number(no)] || null;
}

function chaptersOf(book) {
  return book.chapterList.map((chapter) => ({
    number: chapter.number,
    verses: chapter.verses.length,
  }));
}

export function getHome(lang) {
  const books = bible[lang].order;
  const verses = books.reduce((sum, book) => sum + book.verses, 0);
  const chapters = books.reduce((sum, book) => sum + book.chapterCount, 0);
  const verse = getVerseOfDay(lang);
  return {
    verse,
    counts: { books: books.length, chapters, verses },
    quarters: quarterly[lang].list.map((quarter) => ({
      key: quarter.key,
      label: quarter.label,
      title: quarter.title,
      lessons: quarter.lessonList.length,
    })),
    books: egw[lang].list.map((book) => ({
      id: book.id,
      title: book.title,
      chapters: book.chapterCount,
      lang,
    })),
    otherBooks: (lang === 'sw' ? egw.en.list : egw.sw.list).map((book) => ({
      id: book.id,
      title: book.title,
      chapters: book.chapterCount,
      lang: lang === 'sw' ? 'en' : 'sw',
    })),
  };
}

export function getBibleBooks(lang) {
  return { books: bible[lang].order.map(summary) };
}

export function getBibleBook(lang, bookNo) {
  const book = findBook(lang, bookNo);
  if (!book) return null;
  return {
    book: { n: book.n, name: book.name },
    totalChapters: book.chapterCount,
    chapters: chaptersOf(book),
  };
}

export function getBibleChapter(lang, bookNo, chapterNo) {
  const book = findBook(lang, bookNo);
  if (!book) return null;
  const chapter = book.chapterList.find((item) => item.number === Number(chapterNo));
  if (!chapter) return null;
  const prev = book.chapterList.find((item) => item.number === chapter.number - 1);
  const next = book.chapterList.find((item) => item.number === chapter.number + 1);
  return {
    book: { n: book.n, name: book.name },
    chapter: chapter.number,
    totalChapters: book.chapterCount,
    chapters: chaptersOf(book),
    verses: chapter.verses,
    prev: prev ? prev.number : null,
    next: next ? next.number : null,
  };
}

export function getQuarters(lang) {
  return {
    quarters: quarterly[lang].list.map((quarter) => ({
      key: quarter.key,
      label: quarter.label,
      title: quarter.title,
      lessons: quarter.lessonList.map((lesson) => ({
        n: lesson.n,
        title: lesson.title,
        date: lesson.date,
      })),
    })),
  };
}

export function getLesson(lang, quarterKey, lessonNo) {
  const quarter = quarterly[lang].list.find((item) => item.key === String(quarterKey));
  if (!quarter) return null;
  const lesson = quarter.lessonList.find((item) => item.n === Number(lessonNo));
  if (!lesson) return null;
  const index = quarter.lessonList.indexOf(lesson);
  return {
    quarter: { key: quarter.key, label: quarter.label, title: quarter.title },
    lesson: {
      n: lesson.n,
      title: lesson.title,
      date: lesson.date,
      ref: lesson.ref,
      sections: lesson.sections,
    },
    prev: index > 0 ? quarter.lessonList[index - 1].n : null,
    next: index < quarter.lessonList.length - 1 ? quarter.lessonList[index + 1].n : null,
  };
}

export function getEgwBooks(lang) {
  const other = lang === 'sw' ? 'en' : 'sw';
  return {
    lang,
    books: egw[lang].list.map((book) => ({
      id: book.id,
      title: book.title,
      chapters: book.chapterCount,
      lang,
    })),
    other: egw[other].list.map((book) => ({
      id: book.id,
      title: book.title,
      chapters: book.chapterCount,
      lang: other,
    })),
  };
}

export function getEgwBookInfo(lang, bookId) {
  const book = egw[lang].list.find((item) => item.id === String(bookId));
  if (!book) return null;
  return {
    book: { id: book.id, title: book.title, lang },
    totalChapters: book.chapterCount,
    chapters: book.chapterList.map((chapter) => ({
      number: chapter.number,
      title: chapter.title,
    })),
  };
}

export function getEgwChapter(lang, bookId, chapterNo) {  const book = egw[lang].list.find((item) => item.id === String(bookId));
  if (!book) return null;
  const index = book.chapterList.findIndex((item) => item.number === Number(chapterNo));
  if (index < 0) return null;
  const chapter = book.chapterList[index];
  const prev = index > 0 ? book.chapterList[index - 1].number : null;
  const next = index < book.chapterList.length - 1 ? book.chapterList[index + 1].number : null;
  return {
    book: { id: book.id, title: book.title },
    chapter: chapter.number,
    title: chapter.title,
    totalChapters: book.chapterCount,
    chapters: book.chapterList.map((item) => ({ number: item.number, title: item.title })),
    sections: chapter.sections,
    prev,
    next,
  };
}

export function getVerseOfDay(lang) {
  const refs = dailyRefs[lang];
  if (!refs.length) return null;
  const now = new Date();
  const day = Math.floor(
    Date.UTC(now.getFullYear(), now.getMonth(), now.getDate()) / 86400000,
  );
  const pick = refs[day % refs.length];
  const doc = bibleByRef[lang].get(pick.ref.toLowerCase());
  if (!doc) return null;
  return {
    ref: doc.ref,
    text: doc.text,
    book: doc.book,
    bookNo: BOOK_NAMES[lang].indexOf(doc.book) + 1,
    chapter: doc.chapter,
    verse: doc.verse,
    topic: pick.topic,
  };
}
