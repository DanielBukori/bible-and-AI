const STRINGS = {
  sw: {
    brand: 'Biblia na Unabii',
    tagline: 'Mwalimu wa Biblia na Roho ya Unabii',
    heroEyebrow: 'Biblia · Mafundisho · Roho ya Unabii',
    heroTitle: 'Uliza, tujifunze Neno la Mungu',
    heroText:
      'Majibu yote huchukuliwa kutoka Biblia, mafundisho ya robo mwaka, na vitabu vya Roho ya Unabii pekee. Kila jibu linaambatana na marejeo ya kitabu, sura, ukurasa, au mstari.',
    placeholder: 'Andika swali lako au nisalimie...',
    send: 'Tuma',
    thinking: 'Natafuta katika vitabu...',
    sources: 'Vyanzo',
    quotesNotice: 'Jibu hili limekusanywa kwa maneno halisi ya vitabu. Tafadhali soma vyanzo na marejeo yaliyo hapa chini.',
    aiNotice: 'Jibu limeandaliwa kwa maneno ya vitabu pekee. Tafadhali angalia marejeo.',
    error: 'Kumetokea hitilafu ya mtandao. Tafadhali jaribu tena.',
    aboutTitle: 'Vyanzo vilivyomo',
    aboutBtn: 'Vyanzo',
    aboutNote:
      'Vitabu vya Roho ya Unabii vinapatikana kwa Kiswahili: Hatua Za Ukamilifu Katika Kristo, Tumaini la Vizazi Vyote, Pambano Kuu, Pendo Lisilo Kifani, na Mashujaa wa Imani. Vitabu vingine vipo kwa lugha ya Kiingereza na vimewekwa alama EN.',
    close: 'Funga',
    more: 'Zaidi',
    less: 'Punguza',
    clear: 'Anza upya',
    docsLabel: 'Sehemu',
    aiOn: 'AI ya mazungumzo imewekwa',
    assistantName: 'Mwalimu',
    aiOff:
      'AI ya mazungumzo haijawekwa; kwa hiyo majibu yanaonekana kama nukuu halisi zenye marejeo. Ili kuwasha majibu ya mazungumzo, weka ufunguo wa AI katika faili server/.env.',
    typeNames: { bible: 'Biblia', egw: 'Roho ya Unabii', quarterly: 'Mafundisho' },
    examples: [
      'Sabato ni siku gani, na kwa nini tunaishika?',
      'Yesu alifufuka siku gani?',
      'Biblia inasema nini kuhusu hali ya wafu?',
      'Nini maana ya unabii wa Danieli 7?',
    ],
    noAnswer: 'Samahani, sikupata jibu katika vitabu vilivyowekwa. Tafadhali uliza kwa maneno mengine.',
    tabs: { home: 'Nyumbani', bible: 'Biblia', lessons: 'Masomo', books: 'Vitabu', chat: 'Mazungumzo' },
    verseOfDay: 'Neno la Leo',
    readChapter: 'Soma sura',
    bibleVersion: 'Biblia Takatifu (SUV)',
    lessonsVersion: 'Mafundisho ya Robo Mwaka',
    egwVersion: 'Vitabu vya Roho ya Unabii',
    oldTestament: 'Agano la Kale',
    newTestament: 'Agano Jipya',
    chapter: 'Sura',
    chapters: 'Sura',
    verses: 'Mistari',
    back: 'Rudi',
    prevChapter: 'Sura iliyopita',
    nextChapter: 'Sura ifuatayo',
    prevLesson: 'Somo lililopita',
    nextLesson: 'Somo linalofuata',
    lesson: 'Somo',
    lessons: 'Masomo',
    quartersLabel: 'Robo Mwaka',
    quartersCount: 'robo mwaka',
    date: 'Tarehe',
    loading: 'Inapakia maudhui...',
    loadError: 'Imeshindwa kupakia maudhui. Tafadhali jaribu tena.',
    retry: 'Jaribu tena',
    bibleShort: 'Vitabu 66 vya Biblia',
    lessonsShort: 'Masomo ya robo mwaka',
    booksShort: 'Roho ya Unabii',
    chatShort: 'Uliza swali la Biblia',
    languageNames: { sw: 'Kiswahili', en: 'Kiingereza' },
  },
  en: {
    brand: 'Bible & Prophecy',
    tagline: 'Teacher of the Bible and the Spirit of Prophecy',
    heroEyebrow: 'Bible · Study Guide · Spirit of Prophecy',
    heroTitle: 'Ask, and let us study the Word of God',
    heroText:
      'All answers are drawn only from the Bible, the Sabbath School lessons, and the books of the Spirit of Prophecy. Every answer is accompanied by a reference to book, chapter, page, or verse.',
    placeholder: 'Write your question, or greet me...',
    send: 'Send',
    thinking: 'Searching the books...',
    sources: 'Sources',
    quotesNotice: 'This answer is composed from the actual words of the books. Please read the sources and references below.',
    aiNotice: 'The answer is composed only from the words of the books. Please review the references.',
    error: 'A network error has occurred. Please try again.',
    aboutTitle: 'Included sources',
    aboutBtn: 'Sources',
    aboutNote:
      'The Spirit of Prophecy books are available in Swahili (Steps to Christ, The Desire of Ages, The Great Controversy, The Story of Redemption, Heroes of Faith) and in English. Books not yet translated appear in English with an EN badge.',
    close: 'Close',
    more: 'More',
    less: 'Less',
    clear: 'Start over',
    docsLabel: 'Sections',
    aiOn: 'Conversational AI is enabled',
    assistantName: 'Teacher',
    aiOff:
      'Conversational AI is not enabled; answers therefore appear as direct quotations with references. To enable conversational answers, add an AI key in server/.env.',
    typeNames: { bible: 'Bible', egw: 'Spirit of Prophecy', quarterly: 'Study Guide' },
    examples: [
      'Which day is the Sabbath, and why do we keep it?',
      'On which day did Jesus rise from the dead?',
      'What does the Bible say about the state of the dead?',
      'What is the meaning of Daniel 7?',
    ],
    noAnswer: 'I am sorry, I could not find an answer in the books provided. Please rephrase your question.',
    tabs: { home: 'Home', bible: 'Bible', lessons: 'Lessons', books: 'Books', chat: 'Chat' },
    verseOfDay: 'Verse of the Day',
    readChapter: 'Read chapter',
    bibleVersion: 'King James Version',
    lessonsVersion: 'Sabbath School Quarterly',
    egwVersion: 'Books of the Spirit of Prophecy',
    oldTestament: 'Old Testament',
    newTestament: 'New Testament',
    chapter: 'Chapter',
    chapters: 'Chapters',
    verses: 'Verses',
    back: 'Back',
    prevChapter: 'Previous chapter',
    nextChapter: 'Next chapter',
    prevLesson: 'Previous lesson',
    nextLesson: 'Next lesson',
    lesson: 'Lesson',
    lessons: 'Lessons',
    quartersLabel: 'Quarterly Lessons',
    quartersCount: 'quarters',
    date: 'Date',
    loading: 'Loading content...',
    loadError: 'Could not load the content. Please try again.',
    retry: 'Try again',
    bibleShort: '66 books of the Bible',
    lessonsShort: 'Quarterly lessons',
    booksShort: 'Spirit of Prophecy',
    chatShort: 'Ask a Bible question',
    languageNames: { sw: 'Swahili', en: 'English' },
  },
};

const TAB_KEYS = ['home', 'bible', 'lessons', 'books', 'chat'];
const savedTab = localStorage.getItem('bnu.tab');

const state = {
  lang: localStorage.getItem('bnu.lang') === 'en' ? 'en' : 'sw',
  tab: TAB_KEYS.includes(savedTab) ? savedTab : 'chat',
  messages: [],
  busy: false,
  stats: null,
  expanded: new Set(),
  seen: new WeakSet(),
  cache: new Map(),
  nav: {
    bible: { book: null, chapter: null },
    lessons: { quarter: null, lesson: null },
    books: { book: null, chapter: null },
  },
};

let renderToken = 0;

const $ = (sel) => document.querySelector(sel);

const els = {
  brandName: $('#brandName'),
  brandTag: $('#brandTag'),
  btnClear: $('#btnClear'),
  btnAbout: $('#btnAbout'),
  langSw: $('#langSw'),
  langEn: $('#langEn'),
  main: $('#main'),
  composer: $('#composer'),
  form: $('#composerForm'),
  q: $('#q'),
  send: $('#send'),
  note: $('#composerNote'),
  modalRoot: $('#modalRoot'),
  tabButtons: [...document.querySelectorAll('.tab-btn')],
  tabLabels: [...document.querySelectorAll('[data-tab-label]')],
};

const t = () => STRINGS[state.lang];

const ICONS = {
  chevron:
    '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9.5 6.5 15 12l-5.5 5.5" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>',
  back:
    '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M14.5 6.5 9 12l5.5 5.5" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>',
  bible:
    '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 4.6h9.2c1 0 1.8.8 1.8 1.8v13H6.8A1.8 1.8 0 0 1 5 17.6zm12 0h2v14.8h-2" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/><path d="M9.4 8.2h4.4M9.4 11.4h4.4" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/></svg>',
  lessons:
    '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4.4 5.6A1.6 1.6 0 0 1 6 4h4.2A1.8 1.8 0 0 1 12 5.8v13a1.4 1.4 0 0 0-1.4-1.2H4.4zm15.2 0A1.6 1.6 0 0 0 18 4h-4.2A1.8 1.8 0 0 0 12 5.8v13a1.4 1.4 0 0 1 1.4-1.2h6.2z" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/></svg>',
  books:
    '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 4.4v15.2M4.6 6.6h4.2a3.2 3.2 0 0 1 3.2 3.2v9.8a2.6 2.6 0 0 0-2.6-2.6H4.6zm14.8 0h-4.2A3.2 3.2 0 0 0 12 9.8v9.8a2.6 2.6 0 0 1 2.6-2.6h4.8z" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>',
  chat:
    '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20.4 11.5c0 4-3.8 7.2-8.4 7.2-1 0-2-.2-2.9-.5L4.4 20l1.3-3.7a6.7 6.7 0 0 1-2.1-4.8C3.6 7.5 7.4 4.3 12 4.3s8.4 3.2 8.4 7.2z" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/></svg>',
};

function make(tag, className, text) {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (text != null) node.textContent = text;
  return node;
}

function icon(name) {
  const span = make('span', 'icon');
  span.innerHTML = ICONS[name] || ICONS.chevron;
  return span;
}

function format(n) {
  return Number(n || 0).toLocaleString();
}

async function getJSON(url) {
  if (state.cache.has(url)) return state.cache.get(url);
  const res = await fetch(url);
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const data = await res.json();
  state.cache.set(url, data);
  return data;
}

function scrollTop() {
  window.scrollTo({ top: 0, behavior: 'instant' });
}

/* Chat rendering */

function appendAnswer(container, text) {
  String(text)
    .split(/\n+/)
    .filter((part) => part.trim())
    .forEach((paragraph) => {
      const p = document.createElement('p');
      paragraph.split(/(\[\d+\])/g).forEach((chunk) => {
        if (/^\[\d+\]$/.test(chunk)) {
          p.appendChild(make('span', 'cite', chunk));
        } else if (chunk) {
          p.appendChild(document.createTextNode(chunk));
        }
      });
      container.appendChild(p);
    });
}

function heroNode() {
  const s = t();
  const section = make('section', 'hero');
  section.appendChild(make('p', 'eyebrow', s.heroEyebrow));
  section.appendChild(make('h1', null, s.heroTitle));
  section.appendChild(make('p', 'hero-text', s.heroText));

  const chips = make('div', 'chips');
  s.examples.forEach((example) => {
    const button = make('button', 'chip', example);
    button.type = 'button';
    button.addEventListener('click', () => ask(example));
    chips.appendChild(button);
  });
  section.appendChild(chips);
  return section;
}

function thinkingNode() {
  const box = make('div', 'msg assistant thinking');
  const dots = make('span', 'dots');
  dots.setAttribute('aria-hidden', 'true');
  for (let i = 0; i < 3; i += 1) dots.appendChild(document.createElement('i'));
  box.appendChild(dots);
  box.appendChild(make('span', null, t().thinking));
  return box;
}

function sourceCard(source, key) {
  const s = t();
  const card = make('article', `source type-${source.type}`);

  const head = make('div', 'source-head');
  head.appendChild(make('span', 'source-n', String(source.n)));
  head.appendChild(make('span', 'badge', s.typeNames[source.type] || source.type));
  if (source.lang !== state.lang) {
    head.appendChild(make('span', 'lang-badge', source.lang.toUpperCase()));
  }
  head.appendChild(make('span', 'source-ref', source.ref));
  card.appendChild(head);

  if (source.title) card.appendChild(make('p', 'source-title', source.title));

  const long = source.text.length > 280;
  const expanded = state.expanded.has(key);
  const textNode = make(
    'p',
    'source-text',
    expanded || !long ? source.text : `${source.text.slice(0, 280).trimEnd()}...`,
  );
  card.appendChild(textNode);

  if (long) {
    const toggle = make('button', 'link', expanded ? s.less : s.more);
    toggle.type = 'button';
    toggle.addEventListener('click', () => {
      const isOpen = state.expanded.has(key);
      if (isOpen) state.expanded.delete(key);
      else state.expanded.add(key);
      textNode.textContent = isOpen ? `${source.text.slice(0, 280).trimEnd()}...` : source.text;
      toggle.textContent = isOpen ? s.more : s.less;
    });
    card.appendChild(toggle);
  }

  return card;
}

function assistantNode(message, messageIndex) {
  const s = t();
  const wrap = make('div', 'msg assistant');
  if (state.seen.has(message)) wrap.classList.add('no-anim');
  else state.seen.add(message);

  if (['ai', 'quotes', 'chat'].includes(message.mode)) {
    const head = make('div', 'assistant-head');
    const orb = make('span', 'orb');
    orb.innerHTML =
      '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2.4l2.5 7.1 7.1 2.5-7.1 2.5L12 21.6l-2.5-7.1L2.4 12l7.1-2.5z"/></svg>';
    head.appendChild(orb);
    head.appendChild(make('span', 'assistant-name', s.assistantName));
    wrap.appendChild(head);
  }

  if (message.mode === 'ai' && message.answer) appendAnswer(wrap, message.answer);
  if (message.mode === 'ai') wrap.appendChild(make('p', 'notice', s.aiNotice));
  if (message.mode === 'quotes' && message.answer) appendAnswer(wrap, message.answer);
  if (message.mode === 'quotes') wrap.appendChild(make('p', 'notice', s.quotesNotice));
  if (message.mode === 'chat') wrap.appendChild(make('p', 'answer-plain', message.answer));
  if (message.mode === 'empty') {
    wrap.appendChild(make('p', 'answer-plain', message.answer || s.noAnswer));
  }
  if (message.mode === 'error') {
    wrap.appendChild(make('p', 'answer-plain error', message.answer || s.error));
  }
  if (message.notice) wrap.appendChild(make('p', 'notice warn', message.notice));

  if (message.sources?.length) {
    const box = make('div', 'sources');
    box.appendChild(make('p', 'sources-label', s.sources));
    message.sources.forEach((source, sourceIndex) => {
      box.appendChild(sourceCard(source, `${messageIndex}:${sourceIndex}`));
    });
    wrap.appendChild(box);
  }

  return wrap;
}

function renderChat() {
  if (state.messages.length === 0) {
    els.main.appendChild(heroNode());
    return;
  }

  const thread = make('section', 'thread');
  state.messages.forEach((message, index) => {
    if (message.role === 'user') {
      const node = make('div', 'msg user', message.text);
      if (state.seen.has(message)) node.classList.add('no-anim');
      else state.seen.add(message);
      thread.appendChild(node);
    } else {
      thread.appendChild(assistantNode(message, index));
    }
  });
  if (state.busy) thread.appendChild(thinkingNode());
  els.main.appendChild(thread);

  requestAnimationFrame(() => {
    window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
  });
}

/* Shared page pieces */

function loadingNode() {
  const box = make('div', 'msg assistant thinking page-loading');
  const dots = make('span', 'dots');
  dots.setAttribute('aria-hidden', 'true');
  for (let i = 0; i < 3; i += 1) dots.appendChild(document.createElement('i'));
  box.appendChild(dots);
  box.appendChild(make('span', null, t().loading));
  return box;
}

function errorNode() {
  const s = t();
  const box = make('div', 'page-error');
  box.appendChild(make('p', null, s.loadError));
  const button = make('button', 'chip', s.retry);
  button.type = 'button';
  button.addEventListener('click', () => renderMain());
  box.appendChild(button);
  return box;
}

function backButton(label, onClick) {
  const button = make('button', 'back-btn');
  button.type = 'button';
  button.appendChild(icon('back'));
  button.appendChild(make('span', null, label));
  button.addEventListener('click', onClick);
  return button;
}

function pageHead({ backLabel, onBack, eyebrow, title, sub }) {
  const head = make('div', 'page-head');
  if (onBack) head.appendChild(backButton(backLabel || t().back, onBack));
  if (eyebrow) head.appendChild(make('p', 'eyebrow', eyebrow));
  head.appendChild(make('h1', 'page-title', title));
  if (sub) head.appendChild(make('p', 'page-sub', sub));
  return head;
}

function rowButton(title, meta, onClick, badge) {
  const button = make('button', 'list-row');
  button.type = 'button';
  const text = make('div', 'list-row-text');
  text.appendChild(make('span', 'list-row-title', title));
  if (meta) text.appendChild(make('span', 'list-row-meta', meta));
  button.appendChild(text);
  if (badge) button.appendChild(make('span', 'lang-badge', badge));
  button.appendChild(icon('chevron'));
  button.addEventListener('click', onClick);
  return button;
}

function pager(prev, next, onPrev, onNext, labels = {}) {
  const s = t();
  const box = make('div', 'pager');
  const prevButton = make('button', 'pager-btn');
  prevButton.type = 'button';
  prevButton.textContent = labels.prev || s.prevChapter;
  prevButton.disabled = prev == null;
  if (prev != null) prevButton.addEventListener('click', onPrev);
  box.appendChild(prevButton);
  const nextButton = make('button', 'pager-btn next');
  nextButton.type = 'button';
  nextButton.textContent = labels.next || s.nextChapter;
  nextButton.disabled = next == null;
  if (next != null) nextButton.addEventListener('click', onNext);
  box.appendChild(nextButton);
  return box;
}

/* Home */

function homePage(data) {
  const s = t();
  const page = make('section', 'page home-page');

  const hero = make('section', 'hero hero-home');
  hero.appendChild(make('p', 'eyebrow', s.heroEyebrow));
  hero.appendChild(make('h1', null, s.heroTitle));
  hero.appendChild(make('p', 'hero-text', s.heroText));
  page.appendChild(hero);

  if (data.verse) {
    const verse = data.verse;
    const card = make('article', 'daily');
    const head = make('div', 'daily-head');
    head.appendChild(make('span', 'daily-label', s.verseOfDay));
    head.appendChild(make('span', 'daily-ref', verse.ref));
    card.appendChild(head);
    card.appendChild(make('p', 'daily-text', `\u201c${verse.text}\u201d`));
    const action = make('button', 'daily-action', s.readChapter);
    action.type = 'button';
    action.appendChild(icon('chevron'));
    action.addEventListener('click', () => openBibleAt(verse.bookNo, verse.book, verse.chapter));
    card.appendChild(action);
    page.appendChild(card);
  }

  const grid = make('div', 'shortcut-grid');
  const shortcuts = [
    ['bible', s.tabs.bible, s.bibleShort, () => showTab('bible')],
    ['lessons', s.tabs.lessons, s.lessonsShort, () => showTab('lessons')],
    ['books', s.tabs.books, s.booksShort, () => showTab('books')],
    ['chat', s.tabs.chat, s.chatShort, () => showTab('chat')],
  ];
  shortcuts.forEach(([name, title, sub, action]) => {
    const card = make('button', 'shortcut');
    card.type = 'button';
    const mark = make('span', 'shortcut-icon');
    mark.innerHTML = ICONS[name];
    card.appendChild(mark);
    const text = make('span', 'shortcut-text');
    text.appendChild(make('span', 'shortcut-title', title));
    text.appendChild(make('span', 'shortcut-sub', sub));
    card.appendChild(text);
    card.appendChild(icon('chevron'));
    card.addEventListener('click', action);
    grid.appendChild(card);
  });
  page.appendChild(grid);

  const counts = data.counts || {};
  const meta = make('p', 'home-meta');
  meta.textContent = `${format(counts.verses)} ${s.verses.toLowerCase()} · ${data.quarters.length} ${s.quartersCount} · ${
    data.books.length + data.otherBooks.length
  } ${s.tabs.books.toLowerCase()}`;
  page.appendChild(meta);

  return page;
}

async function renderHome(token) {
  els.main.replaceChildren(loadingNode());
  let data;
  try {
    data = await getJSON(`/api/content/home?lang=${state.lang}`);
  } catch {
    if (token === renderToken) els.main.replaceChildren(errorNode());
    return;
  }
  if (token !== renderToken) return;
  els.main.replaceChildren(homePage(data));
}

/* Bible */

function renderBibleBooks(token) {
  const s = t();
  els.main.replaceChildren(loadingNode());
  getJSON(`/api/content/bible/books?lang=${state.lang}`)
    .then((data) => {
      if (token !== renderToken) return;
      const page = make('section', 'page');
      page.appendChild(
        pageHead({
          eyebrow: s.bibleVersion,
          title: s.tabs.bible,
          sub: `${data.books.length} ${s.tabs.books.toLowerCase()} · ${format(
            data.books.reduce((sum, book) => sum + book.chapters, 0),
          )} ${s.chapters.toLowerCase()}`,
        }),
      );

      const groups = [
        [s.oldTestament, data.books.filter((book) => book.n <= 39)],
        [s.newTestament, data.books.filter((book) => book.n > 39)],
      ];
      groups.forEach(([title, books]) => {
        const block = make('section', 'list-block');
        block.appendChild(make('h2', 'section-title', title));
        const list = make('div', 'list');
        books.forEach((book) => {
          list.appendChild(
            rowButton(book.name, `${book.chapters} ${s.chapters.toLowerCase()}`, () =>
              openBibleBook(book),
            ),
          );
        });
        block.appendChild(list);
        page.appendChild(block);
      });

      els.main.replaceChildren(page);
      scrollTop();
    })
    .catch(() => {
      if (token === renderToken) els.main.replaceChildren(errorNode());
    });
}

function renderBibleBook(token) {
  const s = t();
  const nav = state.nav.bible;
  els.main.replaceChildren(loadingNode());
  getJSON(`/api/content/bible/book?lang=${state.lang}&book=${nav.book.n}`)
    .then((data) => {
      if (token !== renderToken) return;
      const page = make('section', 'page');
      page.appendChild(
        pageHead({
          backLabel: s.tabs.bible,
          onBack: () => {
            nav.book = null;
            renderMain();
          },
          eyebrow: s.bibleVersion,
          title: data.book.name,
          sub: `${data.totalChapters} ${s.chapters.toLowerCase()}`,
        }),
      );

      const grid = make('div', 'chapter-grid');
      data.chapters.forEach((chapter) => {
        const button = make('button', 'chapter-btn');
        button.type = 'button';
        button.appendChild(make('span', 'chapter-n', String(chapter.number)));
        button.appendChild(make('span', 'chapter-c', String(chapter.verses)));
        button.addEventListener('click', () => {
          nav.chapter = chapter.number;
          renderMain();
        });
        grid.appendChild(button);
      });
      page.appendChild(grid);
      els.main.replaceChildren(page);
      scrollTop();
    })
    .catch(() => {
      if (token === renderToken) els.main.replaceChildren(errorNode());
    });
}

function renderBibleChapter(token) {
  const s = t();
  const nav = state.nav.bible;
  els.main.replaceChildren(loadingNode());
  getJSON(`/api/content/bible/chapter?lang=${state.lang}&book=${nav.book.n}&chapter=${nav.chapter}`)
    .then((data) => {
      if (token !== renderToken) return;
      const page = make('section', 'page');
      page.appendChild(
        pageHead({
          backLabel: data.book.name,
          onBack: () => {
            nav.chapter = null;
            renderMain();
          },
          eyebrow: s.bibleVersion,
          title: `${data.book.name} ${data.chapter}`,
          sub: `${data.verses.length} ${s.verses.toLowerCase()} · ${s.chapter} ${data.chapter} / ${data.totalChapters}`,
        }),
      );

      const list = make('div', 'verse-list');
      data.verses.forEach((verse) => {
        const row = make('div', 'verse');
        row.appendChild(make('span', 'verse-n', String(verse.v)));
        row.appendChild(make('span', 'verse-text', verse.text));
        list.appendChild(row);
      });
      page.appendChild(list);
      page.appendChild(
        pager(
          data.prev,
          data.next,
          () => {
            nav.chapter = data.prev;
            renderMain();
          },
          () => {
            nav.chapter = data.next;
            renderMain();
          },
        ),
      );
      els.main.replaceChildren(page);
      scrollTop();
    })
    .catch(() => {
      if (token === renderToken) els.main.replaceChildren(errorNode());
    });
}

function openBibleBook(book) {
  state.nav.bible.book = { n: book.n, name: book.name };
  state.nav.bible.chapter = null;
  renderMain();
}

function openBibleAt(bookNo, bookName, chapter) {
  state.nav.bible.book = { n: bookNo, name: bookName };
  state.nav.bible.chapter = chapter;
  showTab('bible');
}

function renderBible(token) {
  const nav = state.nav.bible;
  if (nav.book && nav.chapter) return renderBibleChapter(token);
  if (nav.book) return renderBibleBook(token);
  return renderBibleBooks(token);
}

/* Lessons */

function renderLessonsQuarters(token) {
  const s = t();
  els.main.replaceChildren(loadingNode());
  getJSON(`/api/content/lessons?lang=${state.lang}`)
    .then((data) => {
      if (token !== renderToken) return;
      const page = make('section', 'page');
      page.appendChild(
        pageHead({
          eyebrow: s.lessonsVersion,
          title: s.quartersLabel,
          sub: `${data.quarters.length} ${s.quartersCount} · ${data.quarters.reduce(
            (sum, quarter) => sum + quarter.lessons.length,
            0,
          )} ${s.lessons.toLowerCase()}`,
        }),
      );

      const list = make('div', 'quarter-list');
      data.quarters.forEach((quarter) => {
        const card = make('button', 'quarter-card');
        card.type = 'button';
        card.appendChild(make('span', 'quarter-badge', quarter.label));
        card.appendChild(make('span', 'quarter-title', quarter.title));
        const meta = make('span', 'quarter-meta');
        meta.appendChild(make('span', null, `${quarter.lessons.length} ${s.lessons.toLowerCase()}`));
        meta.appendChild(icon('chevron'));
        card.appendChild(meta);
        card.addEventListener('click', () => {
          state.nav.lessons.quarter = quarter.key;
          state.nav.lessons.lesson = null;
          renderMain();
        });
        list.appendChild(card);
      });
      page.appendChild(list);
      els.main.replaceChildren(page);
      scrollTop();
    })
    .catch(() => {
      if (token === renderToken) els.main.replaceChildren(errorNode());
    });
}

function renderLessonsList(token) {
  const s = t();
  const nav = state.nav.lessons;
  els.main.replaceChildren(loadingNode());
  getJSON(`/api/content/lessons?lang=${state.lang}`)
    .then((data) => {
      if (token !== renderToken) return;
      const quarter = data.quarters.find((item) => item.key === nav.quarter);
      if (!quarter) {
        nav.quarter = null;
        renderMain();
        return;
      }
      const page = make('section', 'page');
      page.appendChild(
        pageHead({
          backLabel: s.quartersLabel,
          onBack: () => {
            nav.quarter = null;
            renderMain();
          },
          eyebrow: s.lessonsVersion,
          title: quarter.title,
          sub: `${quarter.label} · ${quarter.lessons.length} ${s.lessons.toLowerCase()}`,
        }),
      );

      const list = make('div', 'lesson-list');
      quarter.lessons.forEach((lesson) => {
        const button = make('button', 'lesson-row');
        button.type = 'button';
        button.appendChild(make('span', 'lesson-n', String(lesson.n)));
        const text = make('div', 'lesson-text');
        text.appendChild(make('span', 'lesson-title', lesson.title));
        if (lesson.date) text.appendChild(make('span', 'lesson-date', `${s.date}: ${lesson.date}`));
        button.appendChild(text);
        button.appendChild(icon('chevron'));
        button.addEventListener('click', () => {
          nav.lesson = lesson.n;
          renderMain();
        });
        list.appendChild(button);
      });
      page.appendChild(list);
      els.main.replaceChildren(page);
      scrollTop();
    })
    .catch(() => {
      if (token === renderToken) els.main.replaceChildren(errorNode());
    });
}

function renderLessonPage(token) {
  const s = t();
  const nav = state.nav.lessons;
  els.main.replaceChildren(loadingNode());
  getJSON(`/api/content/lesson?lang=${state.lang}&quarter=${encodeURIComponent(nav.quarter)}&lesson=${nav.lesson}`)
    .then((data) => {
      if (token !== renderToken) return;
      const page = make('section', 'page');
      page.appendChild(
        pageHead({
          backLabel: data.quarter.label,
          onBack: () => {
            nav.lesson = null;
            renderMain();
          },
          eyebrow: `${data.quarter.label} · ${s.lesson} ${data.lesson.n}`,
          title: data.lesson.title,
          sub: data.lesson.date ? `${s.date}: ${data.lesson.date}` : data.quarter.title,
        }),
      );

      data.lesson.sections.forEach((section) => {
        const article = make('article', 'study-section');
        if (section.title && section.title !== data.lesson.title) {
          article.appendChild(make('h3', null, section.title));
        }
        String(section.text)
          .split(/\n+/)
          .filter((part) => part.trim())
          .forEach((part) => article.appendChild(make('p', null, part)));
        page.appendChild(article);
      });

      page.appendChild(
        pager(
          data.prev,
          data.next,
          () => {
            nav.lesson = data.prev;
            renderMain();
          },
          () => {
            nav.lesson = data.next;
            renderMain();
          },
          { prev: s.prevLesson, next: s.nextLesson },
        ),
      );

      els.main.replaceChildren(page);
      scrollTop();
    })
    .catch(() => {
      if (token === renderToken) els.main.replaceChildren(errorNode());
    });
}

function renderLessons(token) {
  const nav = state.nav.lessons;
  if (nav.quarter && nav.lesson) return renderLessonPage(token);
  if (nav.quarter) return renderLessonsList(token);
  return renderLessonsQuarters(token);
}

/* Spirit of Prophecy books */

function renderEgwBooks(token) {
  const s = t();
  els.main.replaceChildren(loadingNode());
  getJSON(`/api/content/egw?lang=${state.lang}`)
    .then((data) => {
      if (token !== renderToken) return;
      const page = make('section', 'page');
      page.appendChild(
        pageHead({
          eyebrow: s.egwVersion,
          title: s.tabs.books,
          sub: `${data.books.length + data.other.length} ${s.tabs.books.toLowerCase()}`,
        }),
      );

      const pushGroup = (title, books, badge) => {
        if (!books.length) return;
        const block = make('section', 'list-block');
        block.appendChild(make('h2', 'section-title', title));
        const list = make('div', 'list');
        books.forEach((book) => {
          list.appendChild(
            rowButton(
              book.title,
              `${book.chapters} ${s.chapters.toLowerCase()}`,
              () => {
                state.nav.books.book = book;
                state.nav.books.chapter = null;
                renderMain();
              },
              badge,
            ),
          );
        });
        block.appendChild(list);
        page.appendChild(block);
      };

      pushGroup(s.languageNames[data.lang], data.books, null);
      if (data.other.length) {
        const otherLang = data.other[0].lang;
        pushGroup(s.languageNames[otherLang], data.other, otherLang.toUpperCase());
      }
      els.main.replaceChildren(page);
      scrollTop();
    })
    .catch(() => {
      if (token === renderToken) els.main.replaceChildren(errorNode());
    });
}

function renderEgwChapters(token) {
  const s = t();
  const nav = state.nav.books;
  const book = nav.book;
  els.main.replaceChildren(loadingNode());
  getJSON(`/api/content/egw/book?lang=${book.lang}&book=${encodeURIComponent(book.id)}`)
    .then((data) => {
      if (token !== renderToken) return;
      const page = make('section', 'page');
      page.appendChild(
        pageHead({
          backLabel: s.tabs.books,
          onBack: () => {
            nav.book = null;
            renderMain();
          },
          eyebrow: `${s.egwVersion}${book.lang !== state.lang ? ` · ${book.lang.toUpperCase()}` : ''}`,
          title: data.book.title,
          sub: `${data.totalChapters} ${s.chapters.toLowerCase()}`,
        }),
      );

      const list = make('div', 'list');
      data.chapters.forEach((chapter) => {
        list.appendChild(
          rowButton(
            chapter.title || `${s.chapter} ${chapter.number}`,
            `${s.chapter} ${chapter.number}`,
            () => {
              nav.chapter = chapter.number;
              renderMain();
            },
          ),
        );
      });
      page.appendChild(list);
      els.main.replaceChildren(page);
      scrollTop();
    })
    .catch(() => {
      if (token === renderToken) els.main.replaceChildren(errorNode());
    });
}

function renderEgwChapter(token) {
  const s = t();
  const nav = state.nav.books;
  const book = nav.book;
  els.main.replaceChildren(loadingNode());
  getJSON(`/api/content/egw/chapter?lang=${book.lang}&book=${encodeURIComponent(book.id)}&chapter=${nav.chapter}`)
    .then((data) => {
      if (token !== renderToken) return;
      const page = make('section', 'page');
      page.appendChild(
        pageHead({
          backLabel: data.book.title,
          onBack: () => {
            nav.chapter = null;
            renderMain();
          },
          eyebrow: `${s.egwVersion}${book.lang !== state.lang ? ` · ${book.lang.toUpperCase()}` : ''}`,
          title: data.title,
          sub: `${data.book.title} · ${s.chapter} ${data.chapter} / ${data.totalChapters}`,
        }),
      );

      const body = make('div', 'egw-body');
      data.sections.forEach((section) => {
        body.appendChild(make('p', 'egw-para', section.text));
        if (book.lang === 'en' && section.ref) {
          body.appendChild(make('p', 'egw-ref', section.ref));
        }
      });
      page.appendChild(body);
      page.appendChild(
        pager(
          data.prev,
          data.next,
          () => {
            nav.chapter = data.prev;
            renderMain();
          },
          () => {
            nav.chapter = data.next;
            renderMain();
          },
        ),
      );
      els.main.replaceChildren(page);
      scrollTop();
    })
    .catch(() => {
      if (token === renderToken) els.main.replaceChildren(errorNode());
    });
}

function renderBooks(token) {
  const nav = state.nav.books;
  if (nav.book && nav.chapter) return renderEgwChapter(token);
  if (nav.book) return renderEgwChapters(token);
  return renderEgwBooks(token);
}

/* Shell */

function renderHeader() {
  const s = t();
  els.brandName.textContent = s.brand;
  els.brandTag.textContent = s.tagline;
  els.btnClear.textContent = s.clear;
  els.btnClear.setAttribute('aria-label', s.clear);
  els.btnAbout.textContent = s.aboutBtn;
  els.langSw.classList.toggle('active', state.lang === 'sw');
  els.langEn.classList.toggle('active', state.lang === 'en');
  document.documentElement.lang = state.lang;

  els.tabLabels.forEach((label) => {
    label.textContent = s.tabs[label.dataset.tabLabel] || '';
  });
  els.tabButtons.forEach((button) => {
    const active = button.dataset.tab === state.tab;
    button.classList.toggle('active', active);
    if (active) button.setAttribute('aria-current', 'page');
    else button.removeAttribute('aria-current');
  });
}

function updateComposer() {
  const s = t();
  els.q.placeholder = s.placeholder;
  els.q.setAttribute('aria-label', s.placeholder);
  els.send.querySelector('.sr-only').textContent = s.send;
  els.composer.hidden = state.tab !== 'chat';
  els.btnClear.hidden = state.tab !== 'chat' || state.messages.length === 0;
  els.send.disabled = state.busy || els.q.value.trim().length < 3;

  const total = state.stats?.meta?.docs
    ? Object.values(state.stats.meta.docs).reduce((sum, count) => sum + count, 0)
    : 0;
  els.note.textContent =
    total > 0 ? `${s.tagline} · ${total.toLocaleString()} ${s.docsLabel.toLowerCase()}` : s.tagline;
}

function renderMain() {
  const token = ++renderToken;
  document.body.classList.toggle('tab-chat', state.tab === 'chat');
  els.main.replaceChildren();

  if (state.tab === 'chat') return renderChat();
  if (state.tab === 'home') return renderHome(token);
  if (state.tab === 'bible') return renderBible(token);
  if (state.tab === 'lessons') return renderLessons(token);
  if (state.tab === 'books') return renderBooks(token);
  return undefined;
}

function renderAll() {
  renderHeader();
  renderMain();
  updateComposer();
}

function showTab(tab) {
  if (!TAB_KEYS.includes(tab)) return;
  state.tab = tab;
  localStorage.setItem('bnu.tab', tab);
  renderAll();
  scrollTop();
}

function resetNav(tab) {
  if (tab === 'bible') state.nav.bible = { book: null, chapter: null };
  if (tab === 'lessons') state.nav.lessons = { quarter: null, lesson: null };
  if (tab === 'books') state.nav.books = { book: null, chapter: null };
}

async function ask(question) {
  const value = String(question || '').trim();
  if (!value || state.busy) return;

  if (state.tab !== 'chat') {
    state.tab = 'chat';
    localStorage.setItem('bnu.tab', 'chat');
    document.body.classList.add('tab-chat');
  }

  const lang = state.lang;
  state.messages.push({ role: 'user', text: value });
  state.busy = true;
  els.q.value = '';
  els.q.style.height = 'auto';
  updateComposer();
  renderMain();

  try {
    const history = state.messages
      .filter((message) => message.role === 'user')
      .slice(0, -1)
      .slice(-3)
      .map((message) => message.text);
    const res = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ question: value, lang, history }),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Request failed');
    state.messages.push({ role: 'assistant', ...data });
  } catch {
    state.messages.push({ role: 'assistant', mode: 'error', answer: t().error, sources: [] });
  } finally {
    state.busy = false;
    updateComposer();
    if (state.tab === 'chat') renderMain();
  }
}

function openAbout() {
  const root = els.modalRoot;
  root.replaceChildren();

  const overlay = make('div', 'overlay');
  const modal = make('div', 'modal');
  const closeModal = () => {
    root.replaceChildren();
    document.body.classList.remove('modal-open');
    document.removeEventListener('keydown', onKey);
  };
  const onKey = (event) => {
    if (event.key === 'Escape') closeModal();
  };
  overlay.addEventListener('click', closeModal);
  modal.addEventListener('click', (event) => event.stopPropagation());
  document.addEventListener('keydown', onKey);
  document.body.classList.add('modal-open');

  const head = make('div', 'modal-head');
  head.appendChild(make('h2', null, t().aboutTitle));
  const close = make('button', 'ghost dark', t().close);
  close.type = 'button';
  close.addEventListener('click', closeModal);
  head.appendChild(close);
  modal.appendChild(head);

  const meta = state.stats?.meta;
  if (meta) {
    const grid = make('div', 'stat-grid');
    Object.entries(meta.docs || {}).forEach(([code, count]) => {
      const stat = make('div', 'stat');
      stat.appendChild(make('span', 'stat-value', Number(count).toLocaleString()));
      stat.appendChild(make('span', 'stat-label', code === 'sw' ? 'Kiswahili' : 'English'));
      grid.appendChild(stat);
    });
    modal.appendChild(grid);

    const llm = state.stats?.llm;
    modal.appendChild(
      make('p', 'modal-note', llm ? `${t().aiOn}: ${llm.provider} / ${llm.model}` : t().aiOff),
    );

    const list = make('ul', 'source-list');
    (meta.sources || []).forEach((source) => {
      const item = make('li');
      item.appendChild(make('span', null, source.label));
      item.appendChild(
        make('span', 'muted', `${source.lang.toUpperCase()} · ${Number(source.docs).toLocaleString()}`),
      );
      list.appendChild(item);
    });
    modal.appendChild(list);

    if (meta.books?.egw?.length) {
      const block = make('div', 'book-block');
      block.appendChild(make('h3', null, t().typeNames.egw));
      block.appendChild(make('p', null, meta.books.egw.join(' · ')));
      modal.appendChild(block);
    }
    if (meta.books?.quarterly?.length) {
      const block = make('div', 'book-block');
      block.appendChild(make('h3', null, t().typeNames.quarterly));
      block.appendChild(make('p', null, meta.books.quarterly.join(' · ')));
      modal.appendChild(block);
    }
  } else {
    modal.appendChild(make('p', 'muted', t().thinking));
  }

  modal.appendChild(make('p', 'modal-note', t().aboutNote));
  overlay.appendChild(modal);
  root.appendChild(overlay);
}

function setLang(lang) {
  if (lang === state.lang) return;
  state.lang = lang;
  localStorage.setItem('bnu.lang', lang);
  state.cache.clear();
  resetNav('bible');
  resetNav('lessons');
  resetNav('books');
  renderAll();
  scrollTop();
}

els.form.addEventListener('submit', (event) => {
  event.preventDefault();
  ask(els.q.value);
});

els.q.addEventListener('keydown', (event) => {
  if (event.key === 'Enter' && !event.shiftKey) {
    event.preventDefault();
    ask(els.q.value);
  }
});

els.q.addEventListener('input', () => {
  els.q.style.height = 'auto';
  els.q.style.height = `${Math.min(els.q.scrollHeight, 140)}px`;
  updateComposer();
});

els.langSw.addEventListener('click', () => setLang('sw'));
els.langEn.addEventListener('click', () => setLang('en'));
els.btnClear.addEventListener('click', () => {
  state.messages = [];
  state.expanded.clear();
  state.seen = new WeakSet();
  renderMain();
  updateComposer();
});
els.btnAbout.addEventListener('click', openAbout);

els.tabButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const tab = button.dataset.tab;
    if (tab === state.tab && tab !== 'chat') resetNav(tab);
    showTab(tab);
  });
});

renderAll();

fetch('/api/stats')
  .then((res) => res.json())
  .then((data) => {
    state.stats = data;
    updateComposer();
  })
  .catch(() => {});
