import { BibleVerseContent } from '../Interfaces/BibleVerse';
//
export const getBibleVerse = async (searchValue: string, translation: string) => {
  const res = await fetch(
    `https://bible-api.com/${searchValue}?translation=${translation}`,
  );

  const result: Response = await res.json();

  const bibleContent: BibleVerseContent[] = result.verses.map(verse => {
    return {
      bookId: verse.book_id,
      bookName: verse.book_name,
      chapter: Number(verse.chapter),
      text: verse.text,
      verse: Number(verse.verse)
    } as BibleVerseContent
  })

  return bibleContent;
};


export interface Vers {
  book_id: string;
  book_name: string;
  chapter: number;
  verse: number;
  text: string;
}

export interface Response {
  reference: string;
  verses: Vers[];
  text: string;
  translation_id: string;
  translation_name: string;
  translation_note: string;
}
