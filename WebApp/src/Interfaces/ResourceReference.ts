import IVerse from './Verse';
import ISong from './Song';

// todo (sdv) rename to resource
export default interface IResourceReference {
  index: number;
  id: string;
  resourceType: string;
  content: string; // Song - in use?
  bibleVerseContent: string; // Bible verse
  book: string; // Bible verse
  chapter: string; // Bible verse
  verse: string; // Bible verse
  source: string; // Bible verse
  translation: string; // Bible verse
  embeddedPowerPointUrl: string; // SlideShow
  lyrics: string; // song
  youTubeUrl: string; // youtube
  videoTitle: string;
}
