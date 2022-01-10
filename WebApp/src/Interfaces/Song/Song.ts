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


export interface SongTagDetails {
  readableValue: string;
  color: string;
  background: string;
}

export const songSelectors = {
  toInternalVerseTag: (tag: string) => {

    if (!tag) {
      return '-';
    }


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
  },
  lyricsInUserSpecificedOrder: (song: Song | undefined): Lyrics[] => {
    if (!song) return []

    if (!song.properties?.verseOrder || !song.properties.verseOrder.length) {
      return song.lyrics;
    }

    let res: Lyrics[] = [];
    song.properties?.verseOrder.forEach(tag => {
      const found = song.lyrics.find(l => l.name === tag);
      if (found)
        res = res.concat([found])
    });

    const missedSections = song.lyrics.filter(section => res.some(res => songSelectors.toInternalVerseTag(res.name) === section.name) === false)

    return res.concat(missedSections);
  },
  toStringForEditingLyrics: (song: Song) => {
    return song.lyrics?.map((lyric) => '[' + lyric.name + ']' + lyric.content)
      .join('\n')
  },

  getSongTagDetails: (name: string): SongTagDetails => {
    if (name === '' || name.length >= 4) return { background: 'black', color: 'white', readableValue: 'Unspecified' };
    const remainder = name.slice(1).replace(/ */, '').toUpperCase();


    if (name && name.toLowerCase().startsWith('v')) {
      return {
        readableValue: `Verse ${remainder ? remainder : ''}`.trim(),
        color: 'black',
        background: '#ffd6a5'
      }
    }

    if (name && name.toLowerCase().startsWith('c')) {

      return {
        readableValue: `Chorus ${remainder ? remainder : ''}`.trim(),
        color: 'black',
        background: '#ffadad'
      }
    }

    if (name && name.toLowerCase().startsWith('b')) {
      return {
        readableValue: `Bridge ${remainder ? remainder : ''}`.trim(),
        color: 'black',
        background: '#9bf6ff'
      }
    }

    if (name && name.toLowerCase().startsWith('p')) {
      return {
        readableValue: `Pre-Chorus ${remainder ? remainder : ''}`.trim(),
        color: 'black',
        background: '#fffffc'
      }
    }


    if (name && name.toLowerCase().startsWith('e')) {
      return {
        readableValue: `Ending ${remainder ? remainder : ''}`.trim(),
        color: 'black',
        background: '#caffbf'
      }
    }

    if (name && name.toLowerCase().startsWith('i')) {
      return {
        readableValue: `Intro ${remainder ? remainder : ''}`.trim(),
        color: 'black',
        background: '#bdb2ff'
      }
    }

    if (name && name.toLowerCase().startsWith('m')) {
      return {
        readableValue: `Middle ${remainder ? remainder : ''}`.trim(),
        color: 'black',
        background: '#ffc6ff'
      }
    }

    if (name && name.toLowerCase().startsWith('s')) {
      return {
        readableValue: `Solo ${remainder ? remainder : ''}`.trim(),
        color: 'black',
        background: '#fdffb6'
      }
    }

    if (name && name.toLowerCase().startsWith('o')) {
      return {
        readableValue: `Outro ${remainder ? remainder : ''}`.trim(),
        color: 'black',
        background: '#a0c4ff'
      }
    }

    return {
      readableValue: name,
      color: 'white',
      background: 'black'
    };
  }
}

