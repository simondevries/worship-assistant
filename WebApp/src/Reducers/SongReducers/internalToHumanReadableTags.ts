export const mapFromInternalToHumanReadableTags = (tag: string) => {

    if (!tag) return '';

    const firstLetter = tag.substring(0, 1);
    let workingResult = '';

    switch (firstLetter) {
        case 'v':
            workingResult = 'Verse';
            break;
        case 'c':
            workingResult = 'Chorus';
            break;
        case 'p':
            workingResult = 'Pre-Chorus';
            break;

        case 'b':
            workingResult = 'Bridge';
            break;
        case 'e':
            workingResult = 'Ending';
            break;
        case 'i':
            workingResult = 'Intro';
            break;
        case 'm':
            workingResult = 'Middle';
            break;
        case 'o':
            workingResult = 'Outro';
            break;
        case 's':
            workingResult = 'Solo';
            break;
    }

    if (tag.substring(1)) {
        workingResult += ` ${tag.substring(1)}`
    }

    return workingResult;



}