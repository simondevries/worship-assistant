import { SongBuilder } from 'testBuilders/songBuilder';
import { songSelectors } from "./Song"



describe('toInternalVerseTag', () => {

    it('should handle empty', () => {
        const res = songSelectors.getSongTagDetails('');
        expect(res.readableValue).toEqual('Unspecified');
        expect(res.color).toBeDefined();
        expect(res.background).toBeDefined();
    })

    it('should ignore anything longer than 4 chars', () => {
        const res = songSelectors.getSongTagDetails('verse 1');
        expect(res.readableValue).toEqual('Unspecified');
    })

    it('should get tag details for verse 1', () => {
        const res = songSelectors.getSongTagDetails('v1');
        expect(res.readableValue).toEqual('Verse 1');
    })

    it('should get tag details for verse 1b', () => {
        const res = songSelectors.getSongTagDetails('v1b');
        expect(res.readableValue).toEqual('Verse 1B');
    })

    it('should get tag details for chorus', () => {
        const res = songSelectors.getSongTagDetails('c');
        expect(res.readableValue).toEqual('Chrous');
    })

    it('should get tag details for pre-chrous', () => {
        const res = songSelectors.getSongTagDetails('p');
        expect(res.readableValue).toEqual('Pre-Chrous');
    })

    it('should ignore spaces', () => {
        const res = songSelectors.getSongTagDetails('c  1  b');
        expect(res.readableValue).toEqual('Chrous 1B');
    })

    // it('should get tag details for instrumental solo ', () => {
    //     const res = songSelectors.getSongTagDetails('i');
    //     expect(res).toBe('Pre-Chrous');
    // })

})

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

    it('lyric tags should use the internal name and not what the user typed', () => {
        const song = new SongBuilder().withVerseOrder(['v1']).withLyricTags(['verse 1', ' verse 2 ']).build()
        const result = songSelectors.lyricsInUserSpecificedOrder(song);


        expect(result.map(l => l.name)).toStrictEqual(['v1', 'v2'])
    })
})