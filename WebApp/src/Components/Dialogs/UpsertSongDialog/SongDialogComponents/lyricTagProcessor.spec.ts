import { lyricTagProcessor, splitByNewLineAndSpace, trimBlankSpacesAroundTags } from "./lyricTagProcessor";

const ExampleSong = `Chorus
Great is Thy faithfulness
Great is Thy faithfulness
Morning by morning
New mercies I see
All I have needed
Thy hand hath provided
Great is Thy faithfulness
Lord unto me

Verse 1
Great is Thy faithfulness
O God my Father
There is no shadow
Of turning with Thee
Thou changest not
Thy compassions they fail not
As Thou hast been
Thou forever wilt be`;


describe('tests for manipulating the lyrics so they contain standardized tags', () => {


    it('should convert example song [Chorus]', () => {

        const result = lyricTagProcessor(ExampleSong);

        expect(result).toBe(`[Chorus]
Great is Thy faithfulness
Great is Thy faithfulness
Morning by morning
New mercies I see
All I have needed
Thy hand hath provided
Great is Thy faithfulness
Lord unto me

[Verse 1]
Great is Thy faithfulness
O God my Father
There is no shadow
Of turning with Thee
Thou changest not
Thy compassions they fail not
As Thou hast been
Thou forever wilt be`)
    })

    it('should convert Verse to [Verse]', () => {
        const result = lyricTagProcessor('Verse');

        expect(result).toBe('[Verse]')
    })

    it('should leave "a" as "a"', () => {
        const result = lyricTagProcessor('a');

        expect(result).toBe('a')
    })

    it('should not blow up on empty', () => {
        const result = lyricTagProcessor('');
        expect(result).toBe('')
    })


    // it('should only add if on a new line', () => {
    //     const result = lyricTagProcessor(`
    //     [Verse]`);

    //     expect(result).toBe(`
    //     [Verse]`)
    // })

    it('should convert [Verse] to [Verse]', () => {
        const result = lyricTagProcessor('[Verse]');

        expect(result).toBe('[Verse]')
    })

    it('should fix casing verse to [Verse]', () => {
        const result = lyricTagProcessor('verse');

        expect(result).toBe('[Verse]')
    })

    it('should not do strange things when open tag without close tag', () => {
        const result = lyricTagProcessor('Amazing [hello grace');

        expect(result).toBe('Amazing [hello grace')
    })

    it('should convert [  Verse ] to [Verse] ', () => {
        const result = lyricTagProcessor('[  Verse ]');

        expect(result).toBe('[Verse]')
    })

    it('should leave random tags [  foo bar ]', () => {
        const result = lyricTagProcessor('[  foo bar ]');

        // todo (sdv) ideally this wouldn't trim
        expect(result).toBe('[foo bar]')
    })

    it('should convert Amazing[  Verse ] to Amazing[Verse] ', () => {
        const result = lyricTagProcessor('Amazing[  Verse ]');

        expect(result).toBe('Amazing[Verse]')
    })

    it('should not trim spaces in between words in tags [ Pre Chorus ] as [ Pre Chorus ] ', () => {
        const result = lyricTagProcessor('[Pre Chorus]');

        expect(result).toBe('[Pre Chorus]')
    })
    it('should keep [Chorus]Amazing as [Chorus]Amazing', () => {
        const result = lyricTagProcessor('[Chorus]Amazing');

        expect(result).toBe('[Chorus]Amazing')
    })

    // double space?

    it('should convert Verse 1 to [Verse 1]', () => {
        const result = lyricTagProcessor('Verse 1 amazing grace');

        expect(result).toBe('[Verse 1] amazing grace')
    })

    it('all should support numbers', () => {
        const result = lyricTagProcessor('Instrumental solo 1 Wow');
        const result2 = lyricTagProcessor('Pre Chorus 1 Wow');

        expect(result).toBe('[Instrumental Solo 1] Wow')
        expect(result2).toContain('[Pre Chorus 1] Wow')
    })

    it('should convert pre chorus to [Pre Chorus]', () => {
        const result = lyricTagProcessor('pre chorus');

        expect(result).toBe('[Pre Chorus]')
    })

    it('should convert ChoRUS to [Chorus]', () => {
        const result = lyricTagProcessor('CHoRUS');

        expect(result).toBe('[Chorus]')
    })

    it('should convert Bridge to [Bridge]', () => {
        const result = lyricTagProcessor('Bridge');

        expect(result).toBe('[Bridge]')
    })

    it('should convert Instrumental Solo to [Instrumental Solo]', () => {
        const result = lyricTagProcessor('Instrumental Solo');

        expect(result).toBe('[Instrumental Solo]')
    })

    it('should convert Instrumental Solo to [Instrumental Solo]', () => {
        const result = lyricTagProcessor('CHoRUS');

        expect(result).toBe('[Chorus]')
    })

    it('trim spaces around tags should work', () => {
        const result = trimBlankSpacesAroundTags('[ Pre Chorus ]')

        expect(result).toBe('[Pre Chorus]')
    })

    it('trim spaces around tags should work when word before', () => {
        const result = trimBlankSpacesAroundTags('Amazing[ Pre Chorus ]')

        expect(result).toBe('Amazing[Pre Chorus]');
    })

    it('trim spaces around tags should work without spaces around word', () => {
        const result = trimBlankSpacesAroundTags('[Pre Chorus]')

        expect(result).toBe('[Pre Chorus]')
    })

    it('trim spaces around tags should work with lots of spaces', () => {
        const result = trimBlankSpacesAroundTags('[   Pre Chorus   ]')

        expect(result).toBe('[Pre Chorus]')
    })

    it('trim spaces around tags should include orphaned open brakets', () => {
        const result = trimBlankSpacesAroundTags('[ Amazin Grace')

        expect(result).toBe('[ Amazin Grace')
    })

    it('trim spaces around tags should work with text after', () => {
        const result = trimBlankSpacesAroundTags('[   Pre Chorus   ] Amazing Grace')

        expect(result).toBe('[Pre Chorus] Amazing Grace')
    })

    it('Should split by new line and space', () => {
        const result = splitByNewLineAndSpace('hello\nworld\n wow');
        expect(result.length).toBe(3);
        expect(result[0].word).toBe('hello');
        expect(result[0].spacer).toBe('\n');
        expect(result[1].word).toBe('world');
        expect(result[1].spacer).toBe('\n ');
        expect(result[2].word).toBe('wow');
        expect(result[2].spacer).toBe('');
    })

    it('Should split bytab', () => {
        const result = splitByNewLineAndSpace('hello\tworld wow');
        expect(result.length).toBe(3);
    })
})