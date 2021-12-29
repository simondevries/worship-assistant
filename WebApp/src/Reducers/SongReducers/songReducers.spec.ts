import { SongBuilder } from 'testBuilders/songBuilder';
import songReducers from "./songReducers"


describe('mapFromHumanReadableToInternal', () => {

    it('should work for empty string', () => {

        const song = new SongBuilder().build();

        const lyrics = '';

        const result = songReducers.mapFromHumanReadableToInternal(song, lyrics)


        expect(result.id).toBe(song.id)
        expect(result.lyrics.length).toBe(0)
    })

    it('should find two verses', () => {

        const song = new SongBuilder().build();

        const lyrics = '[v1]verseOne[v2]verseTwo';

        const result = songReducers.mapFromHumanReadableToInternal(song, lyrics)


        expect(result.lyrics.length).toBe(2)
        expect(result.lyrics[0].content).toBe('verseOne')
        expect(result.lyrics[1].content).toBe('verseTwo')
        expect(result.lyrics[0].name).toBe('v1')
        expect(result.lyrics[1].name).toBe('v2')
    })

    it('should convert from human readable tags to internal', () => {

        const song = new SongBuilder().build();

        const lyrics = '[Verse 1]verseOne[Verse 2]verseTwo';

        const result = songReducers.mapFromHumanReadableToInternal(song, lyrics)

        expect(result.lyrics.length).toBe(2)
        expect(result.lyrics[0].name).toBe('v1')
        expect(result.lyrics[1].name).toBe('v2')
    })
})