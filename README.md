# Biblia na Unabii

Mwalimu wa Biblia na Roho ya Unabii kwa Kiswahili na Kiingereza.
Majibu yanatoka kwenye vitabu halisi pekee, yenye marejeo (kitabu, sura,
ukurasa au mstari). Hakuna maandishi ya kubahatisha.

## Vyanzo vilivyomo

- **Biblia**: Swahili Union Version (SUV) na King James Version (KJV)
- **Mafundisho ya Robo Mwaka**: Adventech Sabbath School lessons (SW + EN)
- **Roho ya Unabii kwa Kiswahili** (egwwritings.org): Hatua Za Ukamilifu
  Katika Kristo, Tumaini la Vizazi Vyote, Pambano Kuu, Manabii na wafalme,
  Pendo Lisilo Kifani
- **Roho ya Unabii kwa Kiingereza**: vitabu 10 vya Ellen G. White —
  Steps to Christ, The Desire of Ages, The Great Controversy,
  Patriarchs and Prophets, Prophets and Kings, The Ministry of Healing,
  Thoughts from the Mount of Blessing, Christ's Object Lessons,
  The Acts of the Apostles, Education

## Kuendesha

```bash
cd server
npm install
npm run ingest        # hupakua vitabu na kujenga index (dakika kadhaa)
npm start             # app: http://localhost:4000
```

Fungua http://localhost:4000 kwenye browser. Kwenye simu tumia
"Add to Home screen" kuifanya kama app.

Kuongeza AI (si lazima): nakili `.env.example` kuwa `.env`, kisha weka
`GEMINI_API_KEY` au `OPENAI_API_KEY`. Bila ufunguo, app inaonyesha nukuu
halisi pekee.

## Hali mbili za majibu

- **Hali ya nukuu (bila ufunguo wa AI)**: app inaandaa jibu kwa sentensi
  zilizotolewa moja kwa moja kwenye vitabu, zenye marejeo, na kuonyesha
  vyanzo halisi. Hakuna maneno ya AI.
- **Hali ya AI (ukiweka ufunguo)**: AI inaandaa jibu kwa kutumia nukuu
  zilizopatikana pekee; ikikosa, inasema wazi kuwa haikupata jibu.

Salamu na mazungumzo ya msingi (habari, asante, kwaheri, "wewe ni nani",
"unaweza nini") hujibiwa katika hali zote mbili — kwa Kiswahili au
Kiingereza. Kwa ufunguo wa AI, majibu ya mazungumzo huandaliwa na AI;
bila ufunguo, app hutumia majibu ya kudumu yenye taarifa sahihi.

## Kumbuka kuhusu hati miliki

- Maandishi ya asili ya Ellen G. White (Kiingereza) ni public domain.
- Tafsiri za Kiswahili zinatolewa na Ellen G. White Estate kupitia
  egwwritings.org; zinatumika kama zilivyo bila kubadilishwa.
- Biblia ya SUV (1952/1997) ina hati miliki ya Chama cha Biblia cha
  Tanzania na Kenya. Kwa matumizi ya kanisa, omba idhini rasmi.
- Mafundisho ya robo mwaka yana hati miliki ya General Conference.
  Tumia kwa huduma ya kanisa na uzingatie masharti yao.
