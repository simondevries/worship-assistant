import Resource from './resource';

export default interface BibleVerse extends Resource {
  book: string;
  chapter: string;
  verse: string;
  source: string;
  translation: string;
  bibleVerseContent: string;
}

export const initNewBibleVerse = (
  id,
  book,
  chapter,
  verse,
  translation,
  source,
  bibleVerseContent,
) => {
  return {
    id: id,
    resourceType: 'BIBLEVERSE',
    book: book,
    chapter: chapter,
    verse: verse,
    translation: translation,
    source: source,
    bibleVerseContent: bibleVerseContent,
  } as BibleVerse;
};

export const addBibleVerseContent = (
  bibleVerse,
  bibleVerseContent,
) => {
  return { ...bibleVerse, bibleVerseContent };
};
