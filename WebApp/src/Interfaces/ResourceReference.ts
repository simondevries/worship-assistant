import IVerse from './Verse';
import ISong from './Song/Song';
import State from './State';

// todo (sdv) rename to resource
export default interface IResourceReference {
  index?: number;
  id: string;
  resourceType?: string;
  content?: string; // Song - in use?
  bibleVerseContent?: string; // Bible verse
  book?: string; // Bible verse
  chapter?: string; // Bible verse
  verse?: string; // Bible verse
  source?: string; // Bible verse
  translation?: string; // Bible verse
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
      return `${bibleVerse?.book}  ${bibleVerse?.chapter}:${bibleVerse?.verse}`;
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