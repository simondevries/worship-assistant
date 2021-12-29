export const humanReadableTagsToInternal = (tag: string) => {

    const shortFormTagName = tag.match(/^[a-zA-Z]{1}\d{0,3}[a-zA-Z]{0,2}$/);
    if (shortFormTagName?.length === 1) {
        return shortFormTagName[0]
    }

    const randomUnicodeChar = '🏆';
    const CHORUS_UNIQUE_CODE = `${randomUnicodeChar}CHORUS${randomUnicodeChar}`;
    const VERSE_UNIQUE_CODE = `${randomUnicodeChar}VERSE${randomUnicodeChar}`;
    const BRIDGE_UNIQUE_CODE = `${randomUnicodeChar}BRIDGE${randomUnicodeChar}`;
    const PRECHORUS_UNIQUE_CODE = `${randomUnicodeChar}PRECHORUS${randomUnicodeChar} `;
    const OUTRO_UNIQUE_CODE = `${randomUnicodeChar}OUTRO${randomUnicodeChar} `;
    const INSTRUMENTALSOLO_UNIQUE_CODE = `${randomUnicodeChar}INSTRUMENTALSOLO${randomUnicodeChar} `;
    const ENDING_UNIQUE_CODE = `${randomUnicodeChar}ENDING${randomUnicodeChar} `;

    let transformedTag = tag.toLowerCase();
    transformedTag = transformedTag.replace('chorus', CHORUS_UNIQUE_CODE);
    transformedTag = transformedTag.replace('verse', VERSE_UNIQUE_CODE);
    transformedTag = transformedTag.replace('bridge', BRIDGE_UNIQUE_CODE);
    transformedTag = transformedTag.replace('pre-chorus', PRECHORUS_UNIQUE_CODE);
    transformedTag = transformedTag.replace('prechorus', PRECHORUS_UNIQUE_CODE);
    transformedTag = transformedTag.replace('pre chorus', PRECHORUS_UNIQUE_CODE);
    transformedTag = transformedTag.replace('outro', OUTRO_UNIQUE_CODE);
    transformedTag = transformedTag.replace('ending', ENDING_UNIQUE_CODE);
    transformedTag = transformedTag.replace('instrumental solo', INSTRUMENTALSOLO_UNIQUE_CODE);

    if (transformedTag.indexOf(CHORUS_UNIQUE_CODE) !== -1) {
        const remainder = transformedTag.replace(CHORUS_UNIQUE_CODE, '');
        return `c${getPartOrNumberSuffix(remainder)}`
    }

    if (transformedTag.indexOf(VERSE_UNIQUE_CODE) !== -1) {
        const remainder = transformedTag.replace(VERSE_UNIQUE_CODE, '');
        return `v${getPartOrNumberSuffix(remainder)}`
    }

    if (transformedTag.indexOf(BRIDGE_UNIQUE_CODE) !== -1) {
        const remainder = transformedTag.replace(BRIDGE_UNIQUE_CODE, '');
        return `b${getPartOrNumberSuffix(remainder)}`
    }

    if (transformedTag.indexOf(PRECHORUS_UNIQUE_CODE) !== -1) {
        const remainder = transformedTag.replace(PRECHORUS_UNIQUE_CODE, '');
        return `p${getPartOrNumberSuffix(remainder)}`
    }

    if (transformedTag.indexOf(OUTRO_UNIQUE_CODE) !== -1) {
        const remainder = transformedTag.replace(OUTRO_UNIQUE_CODE, '');
        return `p${getPartOrNumberSuffix(remainder)}`
    }

    if (transformedTag.indexOf(INSTRUMENTALSOLO_UNIQUE_CODE) !== -1) {
        const remainder = transformedTag.replace(INSTRUMENTALSOLO_UNIQUE_CODE, '');
        return `s${getPartOrNumberSuffix(remainder)}`
    }

    // if (transformedTag.indexOf(INSTRUMENTAL_UNIQUE_CODE) !== -1) {
    //     const remainder = transformedTag.replace(INSTRUMENTAL_UNIQUE_CODE, '');
    //     return `p${getPartOrNumberSuffix(remainder)}`
    // }

    return '';
}

const getPartOrNumberSuffix = (remainder: string) => {
    if (remainder.length < 5) {
        return remainder.trim().toUpperCase();
    }

    return ''
}