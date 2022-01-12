import { mapFromInternalToHumanReadableTags } from './internalToHumanReadableTags';
import { humanReadableTagsToInternal } from './humanReadableTagsToInternal';
import Song, { Lyrics, songSelectors } from 'Interfaces/Song/Song';

const songReducers = {
    updateSongTitle: (song: Song, title: string) => {
        return {
            ...song,
            properties: {
                ...song.properties,
                title: title,
            },
        }
    },

    updateVerseOrder: (song: Song, verseOrder: string): Song => {

        const contentArr =
            !!verseOrder && verseOrder.length ? verseOrder.split(',') : [];

        return {
            ...song,
            properties: {
                ...song.properties,
                verseOrder: contentArr.map((item) =>
                    songSelectors.toInternalVerseTag(item),
                ),
                verseOrderDisplayValueFromUser: contentArr
                    .map((item) => item.trim().replace(/\s\s+/g, ' '))
                    .join(', '),
            },
        }
    },

    mapFromHumanReadableToInternal: (song: Song, updatedLyrics: string): Song => {
        const verses = updatedLyrics.split('[').filter((v) => !!v);
        const versesMapped = verses.map((v) => {
            const sections = v.split(']');

            const doesSectionHaveTag = sections.length > 1;
            if (!doesSectionHaveTag) {

                return {
                    name: '',
                    content: sections[0],
                } as Lyrics;
            }

            const name = humanReadableTagsToInternal(sections[0]);
            const content = sections[1];

            return {
                name,
                content,
            } as Lyrics;
        });
        return { ...song, lyrics: versesMapped };
    },

    mapFromInternalToHumanReadable: (lyrics: Lyrics[]): string => {
        if (!lyrics) return '';
        let workingResult = '';


        lyrics.forEach((l, i) => {
            workingResult += `[${mapFromInternalToHumanReadableTags(l.name)}]\n${l.content?.trim() ?? ''}`;
            if (i < lyrics.length - 1) {
                workingResult += '\n\n'
            }
        })


        return workingResult;
    }

}

export default songReducers;