export const SEARCH_FIELDS = ['text', 'book', 'ref', 'title'];

export const STORE_FIELDS = [
  'id',
  'lang',
  'type',
  'book',
  'chapter',
  'verse',
  'ref',
  'title',
  'text',
  'page',
  'source',
];

const STOPWORDS = new Set([
  'na', 'ya', 'wa', 'kwa', 'ni', 'za', 'la', 'katika', 'hii', 'hiyo', 'hilo',
  'yake', 'wake', 'zake', 'kama', 'au', 'lakini', 'ndiyo', 'sio', 'kuwa', 'kwamba',
  'gani', 'nini', 'je', 'vipi', 'lini', 'wapi', 'nani', 'mbona', 'kwanini', 'ipi',
  'yupi', 'kipi', 'hivi', 'kweli', 'eleza', 'nieleze', 'tuambie', 'niambie',
  'the', 'and', 'of', 'to', 'in', 'a', 'an', 'is', 'are', 'was', 'were', 'be', 'been',
  'that', 'this', 'these', 'those', 'it', 'its', 'for', 'on', 'with', 'as', 'by',
  'from', 'or', 'at', 'but', 'not', 'have', 'has', 'had', 'do', 'does', 'did',
  'which', 'what', 'why', 'when', 'where', 'who', 'whom', 'how', 'explain', 'tell',
]);

export function queryTerms(query) {
  const words = String(query || '')
    .toLowerCase()
    .match(/[\p{L}\p{N}']+/gu) || [];
  return [...new Set(words.filter((word) => word.length > 2 && !STOPWORDS.has(word)))];
}

export const MINI_OPTIONS = {
  idField: 'id',
  fields: SEARCH_FIELDS,
  storeFields: STORE_FIELDS,
  processTerm: (term) => {
    const value = String(term).toLowerCase();
    if (value.length < 2 || STOPWORDS.has(value)) return null;
    return value;
  },
};

export const SEARCH_OPTIONS = {
  boost: { text: 2, title: 1.1, book: 0.5, ref: 0.3 },
  fuzzy: 0.2,
  prefix: true,
};
