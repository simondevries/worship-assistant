import { BibleGatewayProvider } from 'BibleVerse/bibleVerseResolver';
import Resource from './resource';

export default interface BibleVerse extends Resource {
  passageReference: string;
  book: string;// Remove
  chapter: string; // Remove
  verse: string; // Remove
  source: BibleGatewayProvider;
  translation: string;
  bibleVerseContent: BibleVerseContent[];
}

export interface BibleVerseContent {
  bookId: string;
  bookName: string;
  chapter: number;
  verse: number;
  text: string;
}

export const initNewBibleVerseQuery = (
  id,
  translation,
  searchTerm,
  content
) => {
  return {
    id: id,
    resourceType: 'BIBLEVERSE',
    translation: translation,
    source: BibleGatewayProvider.BibleApi,
    bibleVerseContent: content,
    passageReference: searchTerm
  } as BibleVerse;
};


export const isLastSlideSelected = (
  bibleVerseContent: BibleVerseContent[] | undefined,
  slideIndex: number,
) => {

  if (!bibleVerseContent) return true;

  return slideIndex >= bibleVerseContent.length - 1;
};

export const lastSlideIndex = (
  bibleVerseContent: BibleVerseContent[] | undefined,
) => {
  if (!bibleVerseContent) return 0;
  return bibleVerseContent.length - 1;
}