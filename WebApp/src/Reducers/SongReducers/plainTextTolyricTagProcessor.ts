const specialWord: string[] = ['chorus', 'verse', 'outro', 'bridge', 'instrumental', 'ending', 'pre-chorus', 'prechorus', 'pre']; //instrumental outro, instrumental solo, instrumental into, pre chorus

export const plainTextTolyricTagProcessor = (lyrics: string): string => {
    if (!lyrics) return '';

    let lyricsWithTrimmedTags = trimBlankSpacesAroundTags(lyrics)
    let words = splitByNewLineAndSpace(lyricsWithTrimmedTags);
    let result = '';
    for (let i = 0; i < words.length; i++) {

        const currentWord = words[i];

        if (currentWord.word === '') {
            if (currentWord.spacer) {
                result += currentWord.spacer;
                continue;
            }
            result += ' ';
            continue;
        }

        const isSpecialWord = specialWord.some(word => word.toLowerCase() === withoutColonAtEnd(currentWord.word).toLowerCase())

        if (!isSpecialWord) {
            result += currentWord.word + currentWord.spacer;
        } else {

            const nextWord = i + 1 >= words.length ? undefined : words[i + 1]

            if (nextWord && isMultiWordSpecialCase(currentWord.word, nextWord.word)) {
                const indexAtEndOfTwoWords = i + 1
                if (nextWord && isNextWordANumber(words, indexAtEndOfTwoWords)) {
                    const indexOfPartNumber = indexAtEndOfTwoWords + 1;
                    const partNumber = words[indexOfPartNumber]
                    // i.e. Instrumental Outro 1 
                    result += `[${correctCasing(currentWord)} ${correctCasing(nextWord)} ${partNumber.word}]${partNumber.spacer}`
                    i += 2;
                } else if (nextWord && isNextWordANumber(words, indexAtEndOfTwoWords)) {
                    const indexOfPartNumber = indexAtEndOfTwoWords + 1;
                    const partNumber = words[indexOfPartNumber]
                    // i.e. Instrumental Outro 1 
                    result += `[${correctCasing(currentWord)} ${correctCasing(nextWord)} ${partNumber.word}]${partNumber.spacer}`
                    i += 2;
                } else if (nextWord && isNextWordAColon(words, indexAtEndOfTwoWords)) {
                    const indexOfPartNumber = indexAtEndOfTwoWords + 1;
                    const partNumber = words[indexOfPartNumber]
                    // i.e. Instrumental Outro 1 
                    result += `[${correctCasing(currentWord)} ${correctCasing(nextWord)} ${partNumber.word}]${partNumber.spacer}`
                    i += 2;
                } else {
                    // i.e. Pre Chorus
                    result += `[${correctCasing(currentWord)} ${correctCasing(nextWord)}]${nextWord.spacer}`
                    i++;
                }
            } else {

                if (nextWord && isNextWordAColon(words, i)) {
                    // i.e. 'Bridge :'
                    result += `[${correctCasing(currentWord)}]${nextWord?.spacer}`
                    i++;
                } else if (nextWord && isNextWordANumber(words, i)) {
                    const nextWordWithoutColon = nextWord.word.replace(/:$/, '');

                    // i.e. Bridge 2
                    result += `[${correctCasing(currentWord)} ${nextWordWithoutColon}]${nextWord?.spacer}`
                    i++;
                } else {
                    // i.e. Bridge
                    const currentWordWithoutColon: IWord = { ...currentWord, word: currentWord.word.replace(/:$/, '') };
                    result += `[${correctCasing(currentWordWithoutColon)}]${currentWord.spacer}`
                }
            }
        }
    }


    return result
}

const withoutColonAtEnd = (str: string): string => {
    return str?.replace(/:$/, '');
}

export const splitByNewLineAndSpace = (lyrics: string): IWord[] => {
    let result: IWord[] = [];
    let workingWord = '';
    let workingGap = '';

    for (let i = 0; i < lyrics.length; i++) {
        const foundGap = lyrics[i] === ' ' || lyrics[i] === '\t' || lyrics[i] === '\n';
        if (foundGap) {
            workingGap += lyrics[i]
        } else {
            const foundNextWord = workingGap.length;
            if (foundNextWord) {
                result = result.concat({
                    word: workingWord, spacer: workingGap
                } as IWord)
                workingGap = '';
                workingWord = '';
            }

            workingWord += lyrics[i];
        }
    }

    if (workingWord) {
        result = result.concat({
            word: workingWord, spacer: workingGap
        } as IWord)
    }

    return result;
}

const isMultiWordSpecialCase = (currentWord: string, nextWord: string) => {
    const nextWordWithoutColon = withoutColonAtEnd(nextWord);

    const isInstrumentalSolo = currentWord.toLowerCase() === 'instrumental' && nextWordWithoutColon.toLowerCase() === 'solo';
    const isInstrumentalOutro = currentWord.toLowerCase() === 'instrumental' && nextWordWithoutColon.toLowerCase() === 'outro';
    const isInstrumentalIntro = currentWord.toLowerCase() === 'instrumental' && nextWordWithoutColon.toLowerCase() === 'intro';
    const isPreChorus = currentWord.toLowerCase() === 'pre' && nextWordWithoutColon.toLowerCase() === 'chorus';

    return isInstrumentalSolo || isInstrumentalOutro || isInstrumentalIntro || isPreChorus;
}

export const trimBlankSpacesAroundTags = (lyrics: string) => {
    // let result = '';
    // for (let i = 0; i < lyrics.length; i++) {
    //     if (lyrics[i] !== '[') {
    //         result += lyrics[i];
    //         continue;
    //     }

    //     const indexOfClosingTag = lyrics.substring(i).indexOf(']')
    //     const closingTagNotFound = indexOfClosingTag === -1;
    //     if (closingTagNotFound) {
    //         result += lyrics[i];
    //         continue;
    //     } else {
    //         const tag = lyrics.substring(i + 1, i + indexOfClosingTag);
    //         result += `[${tag?.trim()}]`

    //         i = i + indexOfClosingTag;
    //     }

    // }

    return lyrics;
}

const isNextWordANumber = (lyrics: IWord[], index: number) => {
    const nextWord = index + 1 >= lyrics.length ? undefined : lyrics[index + 1]
    if (nextWord === undefined) return false
    const nextWordWithoutColon = nextWord.word.replace(/:$/, '');
    // @ts-ignore
    const isNextWordANumber = !isNaN(nextWordWithoutColon)
    return isNextWordANumber;
}

const isNextWordAColon = (lyrics: IWord[], index: number) => {
    const nextWord = index + 1 >= lyrics.length ? undefined : lyrics[index + 1]
    if (nextWord === undefined) return false
    // @ts-ignore
    const isNextWordANumber = nextWord.word === ":"
    return isNextWordANumber;
}

const correctCasing = (word: IWord) => {
    if (!word) return word;

    switch (withoutColonAtEnd(word.word).toLowerCase()) {
        case 'chorus':
            return 'Chorus';
        case 'verse':
            return 'Verse';
        case 'pre':
            return 'Pre'
        case 'bridge':
            return 'Bridge'

        case 'intro':
        case 'introduction':
            return 'Intro'

        case 'outro':
            return 'Outro'

        case 'solo':
            return 'Solo'
        case 'prechrous':
            return 'Pre Chorus'

        case 'instrumental':
            return 'Instrumental'

        case 'ending':
            return 'Ending'

        default: return word
    }
}

interface IWord {
    word: string;
    spacer: string;
}