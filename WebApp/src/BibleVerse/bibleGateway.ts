import BibleVerse from '../Interfaces/BibleVerse';
//
export const getBibleVerse = async (bibleVerse: BibleVerse) => {
  const res = await fetch(
    `https://bible-api.com/${bibleVerse.book}+${bibleVerse.chapter}:${bibleVerse.verse}?translation=${bibleVerse.translation}`,
  );

  const res2: any = await res.json();
  return res2.text;
};
 