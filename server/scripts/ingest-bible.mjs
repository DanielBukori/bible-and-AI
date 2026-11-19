import path from 'node:path';
import { XMLParser } from 'fast-xml-parser';
import { DATA, fetchText, writeJson, cleanText } from './lib.mjs';

const BOOKS = {
  sw: [
    'Mwanzo', 'Kutoka', 'Mambo ya Walawi', 'Hesabu', 'Kumbukumbu la Torati',
    'Yoshua', 'Waamuzi', 'Ruthu', '1 Samweli', '2 Samweli',
    '1 Wafalme', '2 Wafalme', '1 Mambo ya Nyakati', '2 Mambo ya Nyakati', 'Ezra',
    'Nehemia', 'Esta', 'Ayubu', 'Zaburi', 'Mithali',
    'Mhubiri', 'Wimbo Ulio Bora', 'Isaya', 'Yeremia', 'Maombolezo',
    'Ezekieli', 'Danieli', 'Hosea', 'Yoeli', 'Amosi',
    'Obadia', 'Yona', 'Mika', 'Nahumu', 'Habakuki',
    'Sefania', 'Hagai', 'Zekaria', 'Malaki', 'Mathayo',
    'Marko', 'Luka', 'Yohana', 'Matendo ya Mitume', 'Warumi',
    '1 Wakorintho', '2 Wakorintho', 'Wagalatia', 'Waefeso', 'Wafilipi',
    'Wakolosai', '1 Wathesalonike', '2 Wathesalonike', '1 Timotheo', '2 Timotheo',
    'Tito', 'Filemoni', 'Waebrania', 'Yakobo', '1 Petro',
    '2 Petro', '1 Yohana', '2 Yohana', '3 Yohana', 'Yuda', 'Ufunuo',
  ],
  en: [
    'Genesis', 'Exodus', 'Leviticus', 'Numbers', 'Deuteronomy',
    'Joshua', 'Judges', 'Ruth', '1 Samuel', '2 Samuel',
    '1 Kings', '2 Kings', '1 Chronicles', '2 Chronicles', 'Ezra',
    'Nehemiah', 'Esther', 'Job', 'Psalms', 'Proverbs',
    'Ecclesiastes', 'Song of Solomon', 'Isaiah', 'Jeremiah', 'Lamentations',
    'Ezekiel', 'Daniel', 'Hosea', 'Joel', 'Amos',
    'Obadiah', 'Jonah', 'Micah', 'Nahum', 'Habakkuk',
    'Zephaniah', 'Haggai', 'Zechariah', 'Malachi', 'Matthew',
    'Mark', 'Luke', 'John', 'Acts', 'Romans',
    '1 Corinthians', '2 Corinthians', 'Galatians', 'Ephesians', 'Philippians',
    'Colossians', '1 Thessalonians', '2 Thessalonians', '1 Timothy', '2 Timothy',
    'Titus', 'Philemon', 'Hebrews', 'James', '1 Peter',
    '2 Peter', '1 John', '2 John', '3 John', 'Jude', 'Revelation',
  ],
};

const SOURCES = {
  sw: {
    url: 'https://raw.githubusercontent.com/Beblia/Holy-Bible-XML-Format/master/SwahiliSUVBible.xml',
    version: 'SUV',
    label: 'Biblia Takatifu (SUV)',
  },
  en: {
    url: 'https://raw.githubusercontent.com/Beblia/Holy-Bible-XML-Format/master/EnglishKJBible.xml',
    version: 'KJV',
    label: 'King James Version',
  },
};

const parser = new XMLParser({
  ignoreAttributes: false,
  attributeNamePrefix: '',
  textNodeName: 'text',
  parseTagValue: false,
  trimValues: true,
});

const asArray = (value) => (value == null ? [] : Array.isArray(value) ? value : [value]);

function verseText(node) {
  if (typeof node === 'string') return node;
  if (typeof node === 'number') return String(node);
  const raw = node?.text;
  if (typeof raw === 'string') return raw;
  if (Array.isArray(raw)) return raw.map((part) => (typeof part === 'string' ? part : part?.text ?? '')).join(' ');
  return '';
}

async function ingest(lang, source) {
  const xml = await fetchText(source.url, { tries: 4 });
  if (!xml) throw new Error(`Imeshindwa kupakua Biblia ya ${lang}`);

  const doc = parser.parse(xml);
  const testaments = asArray(doc?.bible?.testament);
  const docs = [];
  let bookIndex = 0;

  for (const testament of testaments) {
    for (const book of asArray(testament?.book)) {
      bookIndex += 1;
      const name = BOOKS[lang][bookIndex - 1] ?? `Kitabu ${bookIndex}`;
      for (const chapter of asArray(book?.chapter)) {
        const chapterNum = Number(chapter?.number);
        for (const verse of asArray(chapter?.verse)) {
          const verseNum = Number(verse?.number);
          const text = cleanText(verseText(verse));
          if (!text) continue;
          docs.push({
            id: `bible:${lang}:${bookIndex}:${chapterNum}:${verseNum}`,
            lang,
            type: 'bible',
            book: name,
            chapter: chapterNum,
            verse: verseNum,
            ref: `${name} ${chapterNum}:${verseNum}`,
            title: '',
            text,
            source: source.label,
          });
        }
      }
    }
  }

  await writeJson(path.join(DATA, 'docs', `bible-${lang}.json`), docs);
  console.log(`Biblia ${lang}: mistari ${docs.length}`);
}

for (const [lang, source] of Object.entries(SOURCES)) {
  await ingest(lang, source);
}
