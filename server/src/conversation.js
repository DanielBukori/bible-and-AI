const FILLER = /^(yako|wako|nawe|sana|tu|tena|za|ya|wa|leo|sasa|vipi|asubuhi|mchana|jioni|usiku|ndugu|rafiki|bwana|dada|mwalimu|there|everyone|all|again|today|now|my|friend|teacher|morning|afternoon|evening)$/i;

const GREETING = /^(habari|hujambo|sijambo|mambo|shikamoo|marahaba|salama|hello|hi|hey|greetings|good\s+(morning|afternoon|evening|day))\b/i;

const CAPABILITY = new Set([
  'unaweza nini',
  'unaweza kufanya nini',
  'unafanya kazi vipi',
  'unafanya kazi gani',
  'naweza kuuliza nini',
  'nisaidie',
  'nisaidie tafadhali',
  'msaada',
  'help',
  'help me',
  'what can you do',
  'how do you work',
  'what can i ask',
  'how does this work',
]);

const IDENTITY = /^(wewe ni nani|nani wewe|jina lako|jina lako nani|who are you|what are you|what is your name)\b/i;

function normalize(text) {
  return String(text || '')
    .toLowerCase()
    .replace(/[!.,?;:]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

export function detectSmallTalk(text) {
  const clean = normalize(text);
  if (!clean) return null;
  const words = clean.split(' ');

  if (GREETING.test(clean)) {
    const rest = clean.replace(GREETING, '').trim();
    const restWords = rest ? rest.split(' ') : [];
    if (restWords.every((word) => FILLER.test(word))) return 'greeting';
  }
  if (CAPABILITY.has(clean)) return 'capability';
  if (IDENTITY.test(clean) && words.length <= 8) return 'identity';
  if (/^(asante|asanteni|shukran|thank you|thanks)\b/.test(clean) && words.length <= 5) {
    return 'thanks';
  }
  if (/^(kwaheri|tutaonana|bye|goodbye|see you|good night|lala salama)\b/.test(clean) && words.length <= 4) {
    return 'farewell';
  }
  return null;
}

const REPLIES = {
  sw: {
    greeting: [
      'Habari, ndugu mpendwa. Karibu katika somo la Neno la Mungu. Mimi ni mwalimu wako wa Biblia na Roho ya Unabii. Tafadhali uliza swali lako, nami nitakujibu kwa maneno halisi ya vitabu, pamoja na marejeo.',
      'Habari, na karibu sana. Tuko tayari kujifunza pamoja. Unaweza kuuliza kuhusu Sabato, unabii, hali ya wafu, afya, maombi, zaka, ndoa, au somo lolote la Biblia.',
    ],
    identity: [
      'Mimi ni msaidizi wa kufundisha Biblia, mafundisho ya robo mwaka, na vitabu vya Roho ya Unabii kwa imani ya Kisabato. Majibu yote huchukuliwa kutoka vitabu halisi vilivyowekwa, pamoja na marejeo ya kitabu, sura, na mstari.',
    ],
    capability: [
      'Nitakusaidia kuelewa Biblia, mafundisho ya robo mwaka, na vitabu vya Roho ya Unabii. Kila jibu huonyesha nukuu halisi pamoja na marejeo yake. Mada ninazozijua vyema ni Sabato, unabii wa Danieli, hali ya wafu, ufufuo, afya, maombi, zaka, ubatizo, na ndoa. Tafadhali uliza swali lako ili tuanze.',
    ],
    thanks: ['Karibu, ndugu. Ikiwa una swali lingine, niko tayari kukusaidia.'],
    farewell: ['Kwaheri, ndugu. Mungu akubariki. Nitakuwa hapa kila unapokuwa na swali lingine.'],
  },
  en: {
    greeting: [
      'Greetings, and welcome to the study of the Word of God. I am your teacher for the Bible and the Spirit of Prophecy. Please ask your question, and I will answer with the actual words of the books, together with their references.',
      'Greetings, and you are most welcome. We are ready to study together. You may ask about the Sabbath, prophecy, the state of the dead, health, prayer, tithes, marriage, or any Bible lesson.',
    ],
    identity: [
      'I am an assistant for teaching the Bible, the Sabbath School lessons, and the books of the Spirit of Prophecy in the Seventh-day Adventist faith. Every answer is drawn from the actual books provided, with references to book, chapter, and verse.',
    ],
    capability: [
      'I will help you understand the Bible, the Sabbath School lessons, and the books of the Spirit of Prophecy. Every answer presents the actual quotations together with their references. The subjects I know well include the Sabbath, Daniel\u2019s prophecies, the state of the dead, the resurrection, health, prayer, tithes, baptism, and marriage. Please ask your question so that we may begin.',
    ],
    thanks: ['You are welcome. If you have another question, I am ready to assist you.'],
    farewell: ['Farewell. God bless you. I shall be here whenever you have another question.'],
  },
};

export function smallTalkReply(intent, lang, { aiEnabled = false } = {}) {
  const pack = REPLIES[lang] || REPLIES.sw;
  const options = pack[intent] || pack.greeting;
  const base = options[Math.floor(Math.random() * options.length)];

  if (intent === 'capability' && !aiEnabled) {
    return lang === 'en'
      ? `${base} (Conversational AI is not yet enabled; answers therefore appear as direct quotations from the books.)`
      : `${base} (AI ya mazungumzo bado haijawekwa; kwa hiyo majibu yanaonekana kama nukuu halisi kutoka vitabuni.)`;
  }
  return base;
}
