import IResource from './resource';
import { ITheme } from './themes';
export default interface Song extends IResource {
  id: string;
  lyrics: Lyrics[];
  resourceType: string,
  theme: ITheme,
  properties: {
    title: string;
    artist: string;
    release_date: string;
  };
}

export interface Lyrics {
  name: string;
  content: string;
}

export const isLastSlideSelected = (
  activeSongs: Song[],
  resourceId: string,
  slideIndex: number,
) => {
  const activeSong = activeSongs.find((s) => s.id === resourceId);

  if (!activeSong) {
    console.warn(
      `That is odd, an active song could not be found for ${resourceId} when attempting to determin if the last slide is selected.`,
    );
    return true;
  }

  return slideIndex >= activeSong.lyrics.length - 1;
};

export const lastSlideIndex = (
  activeSongs: Song[],
  resourceId: string,
) => {
  const activeSong = activeSongs.find((s) => s.id === resourceId);

  if (!activeSong) {
    console.warn(
      `That is odd, an active song could not be found for ${resourceId} when attempting to determin if the last slide is selected.`,
    );
    return true;
  }

  return activeSong.lyrics.length - 1;
};
