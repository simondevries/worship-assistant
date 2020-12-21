import Resource from './resource';
export default interface BibleVerse extends Resource {
  book: string;
  chapter: string;
  verse: string;
  source: string;
}
