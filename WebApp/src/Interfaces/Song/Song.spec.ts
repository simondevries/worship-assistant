import { SongBuilder } from 'testBuilders/songBuilder';
import { songSelectors } from "./Song"

describe('toInternalVerseTag', () => {
    it('should map tags', () => {

        const toInternalVerseTag = songSelectors.toInternalVerseTag;
        expect(toInternalVerseTag('verse1')).toBe('v1');
        expect(toInternalVerseTag('v1')).toBe('v1');
        expect(toInternalVerseTag('verses1')).toBe('v1');
        expect(toInternalVerseTag('verses 1')).toBe('v1');
        expect(toInternalVerseTag(' verses 1 ')).toBe('v1');
        expect(toInternalVerseTag(' verses     1 ')).toBe('v1');
        expect(toInternalVerseTag('verse')).toBe('v');

        expect(toInternalVerseTag('bridge1')).toBe('b1');
        expect(toInternalVerseTag('b1')).toBe('b1');
        expect(toInternalVerseTag('bridgeses1')).toBe('b1');
        expect(toInternalVerseTag('bridgeses 1')).toBe('b1');
        expect(toInternalVerseTag('bridge')).toBe('b');

        expect(toInternalVerseTag('chrous')).toBe('c');
        expect(toInternalVerseTag('b1')).toBe('b1');
        expect(toInternalVerseTag('bridgeses1')).toBe('b1');
        expect(toInternalVerseTag('bridge')).toBe('b');

        expect(toInternalVerseTag('caa')).toBe('caa');
        expect(toInternalVerseTag('vab')).toBe('vab');
        expect(toInternalVerseTag('cbd')).toBe('cbd');
        expect(toInternalVerseTag('bridge')).toBe('b');
    })


    it('should return default with invalid inputs', () => {
        const toInternalVerseTag = songSelectors.toInternalVerseTag;
        expect(toInternalVerseTag('1')).toBe('-');
        expect(toInternalVerseTag('')).toBe('-');
        expect(toInternalVerseTag('vrese')).toBe('-');
        expect(toInternalVerseTag('caa part two')).toBe('-');

    })

});


describe('lyricsInUserSpecificedOrder', () => {
    it('put in correct order', () => {
        const song = new SongBuilder().withVerseOrder(['v2', 'v1']).withLyricTags(['v1', 'v2']).build()
        const result = songSelectors.lyricsInUserSpecificedOrder(song);

        expect(result.map(l => l.name)).toStrictEqual(['v2', 'v1'])
    })

    it('handles when tag does not exist', () => {
        const song = new SongBuilder().withVerseOrder(['v1', 'b']).withLyricTags(['v1', 'v2']).build()
        const result = songSelectors.lyricsInUserSpecificedOrder(song);

        expect(result.map(l => l.name)).toStrictEqual(['v1', 'v2'])
    })


    it('handles empty verse order', () => {
        const song = new SongBuilder().withVerseOrder([]).withLyricTags(['v1', 'v2']).build()
        const result = songSelectors.lyricsInUserSpecificedOrder(song);

        expect(result.map(l => l.name)).toStrictEqual(['v1', 'v2'])
    })

    it('handles null verse order', () => {
        const song = new SongBuilder().withNullVerseOrder().build()
        const result = songSelectors.lyricsInUserSpecificedOrder(song);

        expect(result.map(l => l.name)).toStrictEqual(['v1', 'v2'])
    })


    it('should append lyrics that do not have a matching tag to the end', () => {
        const song = new SongBuilder().withVerseOrder(['v1']).withLyricTags(['v1', 'v2']).build()
        const result = songSelectors.lyricsInUserSpecificedOrder(song);


        expect(result.map(l => l.name)).toStrictEqual(['v1', 'v2'])
    })
})