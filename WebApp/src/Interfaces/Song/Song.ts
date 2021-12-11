import IResource from '../resource';
import { ITheme } from '../themes';
// Based off https://docs.openlyrics.org/en/latest/dataformat.html#basic-structure

export default interface Song extends IResource {
  id: string;
  lyrics: Lyrics[];

  resourceType: string,
  theme?: ITheme,
  properties: {
    title: string;
    artist: string;
    release_date: string;
    verseOrder?: string[];
    verseOrderDisplayValueFromUser?: string;
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


export const toInternalVerseTag = (tag: string) => {

  console.log('1')
  if (!tag) {
    return '-';
  }
  console.log('1')


  const tagHasNumber = /\d/.test(tag);
  const tagFormatted = tag.toLowerCase().trim();


  const number = tagFormatted.replace(/^\D+/g, '')
  const numberOfLetters = tagFormatted.replace(/[0-9]/g, '').length;
  const hasOneLetter = numberOfLetters < 2;

  if ((tagFormatted.startsWith("v") && hasOneLetter) || tagFormatted.startsWith("verse")) {
    return `v${number}`;
  }


  if ((tagFormatted.startsWith("c") && hasOneLetter) || tagFormatted.startsWith("chorus") || tagFormatted.startsWith("ch")) {
    return `c${number}`;
  }

  if ((tagFormatted.startsWith("p") && hasOneLetter) || tagFormatted.startsWith("pre-chorus") || tagFormatted.startsWith("pre-chorus")) {
    return `p${number}`;
  }

  if ((tagFormatted.startsWith("b") && hasOneLetter) || tagFormatted.startsWith("br") || tagFormatted.startsWith("bridge")) {
    return `b${number}`;
  }

  if ((tagFormatted.startsWith("e") && hasOneLetter) || tagFormatted.startsWith("end") || tagFormatted.startsWith("ending")) {
    return `e${number}`;
  }

  if ((tagFormatted.startsWith("i") && hasOneLetter) || tagFormatted.startsWith("inst") || tagFormatted.startsWith("instrument") || tagFormatted.startsWith("instrumental")) {
    return `i${number}`;
  }

  if ((tagFormatted.startsWith("m") && hasOneLetter) || tagFormatted.startsWith("instrumentalmiddle") || tagFormatted.startsWith("middle")) {
    return `m${number}`;
  }

  if ((tagFormatted.startsWith("o") && hasOneLetter) || tagFormatted.startsWith("instrumentaloutro") || tagFormatted.startsWith("outro")) {
    return `o${number}`;
  }

  if ((tagFormatted.startsWith("s") && hasOneLetter) || tagFormatted.startsWith("instrumentalsolo") || tagFormatted.startsWith("solo")) {
    return `s${number}`;
  }

  // for cases such as chorus part a -> Cab
  if (!tagHasNumber && tagFormatted.length <= 3) {
    return tagFormatted;
  }

  return '-'
}