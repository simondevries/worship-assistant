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

    it('should store lyrics even when there is no tag associated with it', () => {

        let song = new SongBuilder().build();


        const lyrics = 'verseUnderConstruction[Verse 2]verseTwo';

        const result = songReducers.mapFromHumanReadableToInternal(song, lyrics)

        expect(result.lyrics.length).toBe(2)
        expect(result.lyrics[0].name).toBe('')
        expect(result.lyrics[0].content).toBe('verseUnderConstruction')
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



describe('mapFromHumanReadableToInternal', () => {
    it('should map multiple sections', () => {
        const song = new SongBuilder().build();

        const res = songReducers.mapFromInternalToHumanReadable(song.lyrics);

        expect(res).toBe(`[Verse 1]\n${song.lyrics[0].content}\n\n[Verse 2]\n${song.lyrics[1].content}`)
    })

    it('should handle empty', () => {
        const song = new SongBuilder().thatDoesNotHaveLyrics().build();

        const res = songReducers.mapFromInternalToHumanReadable(song.lyrics);

        expect(res).toBe('')
    })

    it('should remove new lines at start of content', () => {
        let song = new SongBuilder().build();

        song.lyrics[0].content = '\n\ncontent'
        const res = songReducers.mapFromInternalToHumanReadable(song.lyrics);

        expect(res).toBe(`[Verse 1]\ncontent\n\n[Verse 2]\n${song.lyrics[1].content}`)
    })


    it('should handle null content', () => {
        let song = new SongBuilder().withNullLyricContent().build();


        const res = songReducers.mapFromInternalToHumanReadable(song.lyrics);

        expect(res).toBe(`[Verse 1]\n\n\n[Verse 2]\n`)
    })

    it('should remove new lines at end of content', () => {
        let song = new SongBuilder().build();

        song.lyrics[0].content = 'content\n\n'
        const res = songReducers.mapFromInternalToHumanReadable(song.lyrics);

        expect(res).toBe(`[Verse 1]\ncontent\n\n[Verse 2]\n${song.lyrics[1].content}`)
    })

    it('should handle null', () => {
        const res = songReducers.mapFromInternalToHumanReadable([]);

        expect(res).toBe('')
    })


});

describe('addPartToLyrics', () => {
    it('can add chorus to first row', () => {
        const res = songReducers.addPartToLyrics('Amazing grace', 'Chorus', [{ startRow: 0, endRow: 0 }])

        expect(res).toBe('[Chorus]\nAmazing grace\n');
    })
    it('should add chorus in correct place', () => {
        const res = songReducers.addPartToLyrics('Amazing grace\nHow sweet the sound', 'Chorus', [{ startRow: 1, endRow: 1 }])

        expect(res).toBe('Amazing grace\n\n[Chorus]\nHow sweet the sound\n');
    })

    it('should not add a new line when there is a new line preceeding line', () => {
        const res = songReducers.addPartToLyrics('Amazing grace\n\nHow sweet the sound', 'Chorus', [{ startRow: 2, endRow: 2 }])

        expect(res).toBe('Amazing grace\n\n[Chorus]\nHow sweet the sound\n');
    })


    it('should support multiple lines', () => {
        const res = songReducers.addPartToLyrics('Amazing grace\nHow sweet the sound\nTwas grace that saved\n[Verse]\namazing', 'Chorus', [{ startRow: 0, endRow: 2 }])

        expect(res).toBe('[Chorus]\nAmazing grace\nHow sweet the sound\nTwas grace that saved\n\n[Verse]\namazing');
    })

    it('should support empty lyrics lines', () => {
        const res = songReducers.addPartToLyrics('', 'Chorus', [{ startRow: 0, endRow: 2 }])

        expect(res).toBe('[Chorus]\n\n');
    })
})
