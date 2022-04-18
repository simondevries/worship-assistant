import { BibleVerseContent } from './BibleVerse';
import IVerse from './Verse';
import ISong from './Song/Song';
import State from './State';
import IResource from './resource';
export type ResourceType = 'SONG' | 'BIBLEVERSE' | 'VIDEO' | 'IMAGE' | 'SLIDESHOW'

// todo (sdv) rename to resource
export default interface IResourceReference {
  index?: number;
  id: string;
  resourceType?: ResourceType;
  content?: string; // Song - in use?
  bibleVerseContent?: BibleVerseContent[]; // Bible verse
  passageReference?: string; // Bible verse
  embeddedPowerPointUrl?: string; // SlideShow
  lyrics?: string; // song
  youTubeUrl?: string; // youtube
  videoTitle?: string;
}

