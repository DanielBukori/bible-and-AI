const REFUSAL = {
  sw: 'Samahani, sikupata jibu la swali hili katika vitabu vilivyowekwa. Tafadhali uliza kwa maneno mengine, au wasiliana na mwalimu wako.',
  en: 'I am sorry, but I could not find an answer to this question in the books provided. Please rephrase your question, or consult your teacher.',
};

const SYSTEM = `You are a knowledgeable, clear, and respectful AI study assistant.

Rules:
1. Answer the user's question directly and completely in natural language.
2. For Bible, Adventist theology, Sabbath School, or Spirit of Prophecy questions, use the SOURCE EXCERPTS as the primary evidence. Explain and synthesize their meaning, not only copy them.
3. Distinguish clearly between a direct statement from the sources and your explanation.
4. Cite supporting source excerpts as [1], [2], and so on.
5. Never invent or misquote a Bible verse, page number, book title, or source.
6. If the excerpts do not support a claim, say that explicitly. You may provide general context only when it is clearly distinguished from the source evidence.
7. Use the requested language only.
8. Keep a warm, formal but conversational tone, suitable for phone use.
9. Use short paragraphs and simple headings when helpful. Plain text is preferred; do not add citations unless supported by an excerpt.
10. Follow the conversation history and refer to earlier questions when the user asks a follow-up.`;

export function llmStatus() {
  if (process.env.GEMINI_API_KEY) {
    return { provider: 'gemini', model: process.env.GEMINI_MODEL || 'gemini-flash-latest' };
  }
  if (process.env.OPENAI_API_KEY) {
    return { provider: 'openai', model: process.env.OPENAI_MODEL || 'gpt-4o-mini' };
  }
  return null;
}

export function refusalFor(lang) {
  return REFUSAL[lang] || REFUSAL.en;
}

function buildPrompt(question, lang, sources, history = []) {
  const languageName = lang === 'sw' ? 'Kiswahili' : 'English';
  const excerpts = sources
    .map((source, index) => `[${index + 1}] ${source.ref}\n${source.text.slice(0, 1800)}`)
    .join('\n\n');

  return {
    system: `${SYSTEM}

Answer language: ${languageName}.
The excerpts must not be presented as direct quotes unless their wording is reproduced faithfully.
If the excerpts are insufficient for a specifically religious claim, use the exact refusal sentence below rather than inventing an answer:
"${refusalFor(lang)}"`,
    user: `${history.length ? `CONVERSATION HISTORY:\n${history.map((item, index) => `${index + 1}. ${item}`).join('\n')}\n\n` : ''}QUESTION:\n${question}\n\nSOURCE EXCERPTS:\n${excerpts}`,
  };
}

async function callOpenAI(prompt, maxTokens = 800) {
  const base = (process.env.OPENAI_BASE_URL || 'https://api.openai.com/v1').replace(/\/$/, '');
  const res = await fetch(`${base}/chat/completions`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
    },
    body: JSON.stringify({
      model: process.env.OPENAI_MODEL || 'gpt-4o-mini',
      temperature: 0.1,
      max_tokens: maxTokens,
      messages: [
        { role: 'system', content: prompt.system },
        { role: 'user', content: prompt.user },
      ],
    }),
    signal: AbortSignal.timeout(90000),
  });
  if (!res.ok) throw new Error(`OpenAI HTTP ${res.status}`);
  const data = await res.json();
  return data?.choices?.[0]?.message?.content ?? '';
}

async function callGemini(prompt, maxTokens = 2500) {
  const model = process.env.GEMINI_MODEL || 'gemini-flash-latest';
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${process.env.GEMINI_API_KEY}`;
  const body = JSON.stringify({
    systemInstruction: { parts: [{ text: prompt.system }] },
    contents: [{ role: 'user', parts: [{ text: prompt.user }] }],
    generationConfig: { temperature: 0.1, maxOutputTokens: maxTokens },
  });

  for (let attempt = 0; attempt < 3; attempt += 1) {
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body,
      signal: AbortSignal.timeout(90000),
    });
    if (res.ok) {
      const data = await res.json();
      const parts = data?.candidates?.[0]?.content?.parts ?? [];
      return parts
        .filter((part) => !part.thought)
        .map((part) => part.text ?? '')
        .join('');
    }
    if (res.status === 429 || res.status >= 500) {
      await new Promise((resolve) => setTimeout(resolve, 1500 * (attempt + 1)));
      continue;
    }
    throw new Error(`Gemini HTTP ${res.status}`);
  }
  throw new Error('Gemini HTTP 503');
}

export async function composeAnswer({ question, lang, sources, history = [] }) {
  const status = llmStatus();
  if (!status) throw new Error('No LLM configured');
  const prompt = buildPrompt(question, lang, sources, history);
  const text = status.provider === 'gemini' ? await callGemini(prompt) : await callOpenAI(prompt);
  const answer = String(text || '').trim();
  if (!answer) throw new Error('Empty LLM response');
  return answer;
}

const CHAT_SYSTEM = `You are the conversation layer of a Bible study assistant for the Seventh-day Adventist (Sabbath-keeping) faith.

Rules:
1. Reply briefly (2-4 sentences) in a dignified, formal, and courteous tone, as a respected Bible teacher would speak.
2. Do not teach doctrine and do not invent any religious facts.
3. Invite the user to ask a Bible question.
4. If you mention the sources, say that answers about faith are quoted from the Bible, the Sabbath School lessons, and the books of the Spirit of Prophecy, with references.
5. Use complete sentences and respectful address; avoid slang, abbreviations, and casual chatter.
6. Reply in the requested language only.
7. Write plain text only; do not use Markdown or bullet symbols.`;

function buildChatPrompt(question, lang) {
  const languageName = lang === 'sw' ? 'Kiswahili' : 'English';
  return {
    system: `${CHAT_SYSTEM}\n\nAnswer language: ${languageName}.`,
    user: question,
  };
}

export async function composeChat({ question, lang }) {
  const status = llmStatus();
  if (!status) throw new Error('No LLM configured');
  const prompt = buildChatPrompt(question, lang);
  const text =
    status.provider === 'gemini'
      ? await callGemini(prompt, 2000)
      : await callOpenAI(prompt, 500);
  const answer = String(text || '').trim();
  if (!answer) throw new Error('Empty LLM response');
  return answer;
}
