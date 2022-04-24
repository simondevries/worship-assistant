import { BibleVerseContent } from './BibleVerse';
import State from './State';

// todo (sdv) rename to resource
export default interface IResourceReference {
  index?: number;
  id: string;
  resourceType?: string;
  content?: string; // Song - in use?
  bibleVerseContent?: BibleVerseContent[]; // Bible verse
  passageReference?: string; // Bible verse
  embeddedPowerPointUrl?: string; // SlideShow
  lyrics?: string; // song
  youTubeUrl?: string; // youtube
  videoTitle?: string;
}


export const resolveTitle = (state: State, resourceReference: IResourceReference) => {
  if (!resourceReference || !resourceReference.resourceType) {
    return '';
  }

  switch (resourceReference.resourceType.toLowerCase()) {
    case 'song':
      const song = state.currentSchedule.activeSongs.find(
        (s) => s.id === resourceReference.id,
      );
      return song?.properties.title;
    case 'bibleverse':
      const bibleVerse = state.currentSchedule.resources.find(
        (s) => s.id === resourceReference.id,
      );
      return bibleVerse?.passageReference;
    case 'video':
      const video = state.currentSchedule.resources.find(
        (s) => s.id === resourceReference.id,
      );
      return (
        (video && video.videoTitle) || 'Video'
        // <input type="text" id="video-title" />
      );

    default:
      return '';
  }
};