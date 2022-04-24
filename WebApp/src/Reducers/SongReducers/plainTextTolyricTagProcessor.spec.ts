import { plainTextTolyricTagProcessor, splitByNewLineAndSpace } from "./plainTextTolyricTagProcessor";

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

        const result = plainTextTolyricTagProcessor(ExampleSong);

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
        const result = plainTextTolyricTagProcessor('Verse');

        expect(result).toBe('[Verse]')
    })

    it('should leave "a" as "a"', () => {
        const result = plainTextTolyricTagProcessor('a');

        expect(result).toBe('a')
    })

    it('should not blow up on empty', () => {
        const result = plainTextTolyricTagProcessor('');
        expect(result).toBe('')
    })


    // it('should only add if on a new line', () => {
    //     const result = plainTextTolyricTagProcessor(`
    //     [Verse]`);

    //     expect(result).toBe(`
    //     [Verse]`)
    // })

    it('should convert [Verse] to [Verse]', () => {
        const result = plainTextTolyricTagProcessor('[Verse]');

        expect(result).toBe('[Verse]')
    })

    it('should fix casing verse to [Verse]', () => {
        const result = plainTextTolyricTagProcessor('verse');

        expect(result).toBe('[Verse]')
    })

    it('should not do strange things when open tag without close tag', () => {
        const result = plainTextTolyricTagProcessor('Amazing [hello grace');

        expect(result).toBe('Amazing [hello grace')
    })

    // it('should convert [  Verse ] to [Verse] ', () => {
    //     const result = plainTextTolyricTagProcessor('[  Verse ]');

    //     expect(result).toBe('[Verse]')
    // })

    // it('should leave random tags [  foo bar ]', () => {
    //     const result = plainTextTolyricTagProcessor('[  foo bar ]');

    //     // todo (sdv) ideally this wouldn't trim
    //     expect(result).toBe('[foo bar]')
    // })

    // it('should convert Amazing[  Verse ] to Amazing[Verse] ', () => {
    //     const result = plainTextTolyricTagProcessor('Amazing[  Verse ]');

    //     expect(result).toBe('Amazing[Verse]')
    // })

    it('should not trim spaces in between words in tags [ Pre Chorus ] as [ Pre Chorus ] ', () => {
        const result = plainTextTolyricTagProcessor('[Pre Chorus]');

        expect(result).toBe('[Pre Chorus]')
    })
    it('should keep [Chorus]Amazing as [Chorus]Amazing', () => {
        const result = plainTextTolyricTagProcessor('[Chorus]Amazing');

        expect(result).toBe('[Chorus]Amazing')
    })

    // double space?

    it('should convert Verse 1 to [Verse 1]', () => {
        const result = plainTextTolyricTagProcessor('Verse 1 amazing grace');

        expect(result).toBe('[Verse 1] amazing grace')
    })

    it('all should support numbers', () => {
        const result = plainTextTolyricTagProcessor('Instrumental solo 1 Wow');
        const result2 = plainTextTolyricTagProcessor('Pre Chorus 1 Wow');

        expect(result).toBe('[Instrumental Solo 1] Wow')
        expect(result2).toContain('[Pre Chorus 1] Wow')
    })

    it('should convert pre chorus to [Pre Chorus]', () => {
        const result = plainTextTolyricTagProcessor('pre chorus');

        expect(result).toBe('[Pre Chorus]')
    })

    it('should convert ChoRUS to [Chorus]', () => {
        const result = plainTextTolyricTagProcessor('CHoRUS');

        expect(result).toBe('[Chorus]')
    })

    it('should convert Bridge to [Bridge]', () => {
        const result = plainTextTolyricTagProcessor('Bridge');

        expect(result).toBe('[Bridge]')
    })

    it('should convert Instrumental Solo to [Instrumental Solo]', () => {
        const result = plainTextTolyricTagProcessor('Instrumental Solo');

        expect(result).toBe('[Instrumental Solo]')
    })

    it('should convert Instrumental Solo to [Instrumental Solo]', () => {
        const result = plainTextTolyricTagProcessor('CHoRUS');

        expect(result).toBe('[Chorus]')
    })

    it("should allow new line before first tag", () => {
        const result = plainTextTolyricTagProcessor("\nchorus");
        expect(result).toBe('\n[Chorus]')
    })

    it("should allow multiple new lines before first tag", () => {
        const result = plainTextTolyricTagProcessor("\n\nchorus");
        expect(result).toBe('\n\n[Chorus]')
    })

    it("should convert tags with colons at the end", () => {
        const result = plainTextTolyricTagProcessor("\n\nchorus:");
        expect(result).toBe('\n\n[Chorus]')
    })

    it("should convert tags with part and colons at the end", () => {
        const result = plainTextTolyricTagProcessor("\n\nchorus 1:");
        expect(result).toBe('\n\n[Chorus 1]')
    })

    it("NOT IMPLEMENTED should convert special cases with part and colons with at the end", () => {
        const result = plainTextTolyricTagProcessor("\n\npre chorus 1:");
        expect(result).toBe('\n\n[Pre Chorus 1:]')
        // expect(result).toBe('\n\n[Pre Chorus 1]')
    })

    it("should convert special cases with colons at the end", () => {
        const result = plainTextTolyricTagProcessor("\n\npre chorus:");
        expect(result).toBe('\n\n[Pre Chorus]')
    })

    // todo (sdv) implement this
    it("space at the end of multi part is not yet implemented", () => {
        const result = plainTextTolyricTagProcessor("\n\nchorus 1 :");
        expect(result).toBe('\n\n[Chorus 1] :')
        // Should be
        // expect(result).toBe('\n\n[Chorus 1]')
    })

    it("should convert tags with colon and space at the end", () => {
        const result = plainTextTolyricTagProcessor("\n\nchorus :");
        expect(result).toBe('\n\n[Chorus]')
    })

    it("should allow tag char line before first verse tag", () => {
        const result = plainTextTolyricTagProcessor("\tchorus");
        expect(result).toBe('\t[Chorus]')
    })


    it("should not insert new line in the scenario [bug]", () => {
        const result = plainTextTolyricTagProcessor("[\n[Chorus]");
        expect(result).toBe('[\n[Chorus]')
    })


});

// describe('trimBlankSpacesAroundTags', () => {

//     it('trim spaces around tags should work', () => {
//         const result = trimBlankSpacesAroundTags('[ Pre Chorus ]')

//         expect(result).toBe('[Pre Chorus]')
//     })


//     it('trim spaces around tags should work when word before', () => {
//         const result = trimBlankSpacesAroundTags('Amazing[ Pre Chorus ]')

//         expect(result).toBe('Amazing[Pre Chorus]');
//     })

//     it('trim spaces around tags should work without spaces around word', () => {
//         const result = trimBlankSpacesAroundTags('[Pre Chorus]')

//         expect(result).toBe('[Pre Chorus]')
//     })

//     it('trim spaces around tags should work with lots of spaces', () => {
//         const result = trimBlankSpacesAroundTags('[   Pre Chorus   ]')

//         expect(result).toBe('[Pre Chorus]')
//     })

//     it('trim spaces around tags should include orphaned open brakets', () => {
//         const result = trimBlankSpacesAroundTags('[ Amazin Grace')

//         expect(result).toBe('[ Amazin Grace')
//     })

//     it('trim spaces around tags should work with text after', () => {
//         const result = trimBlankSpacesAroundTags('[   Pre Chorus   ] Amazing Grace')

//         expect(result).toBe('[Pre Chorus] Amazing Grace')
//     })
// });


describe('splitByNewLineAndSpace', () => {

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