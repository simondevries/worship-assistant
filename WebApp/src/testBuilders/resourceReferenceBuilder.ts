import IResourceReference from "../Interfaces/ResourceReference";

export class ResourceReferenceBuilder {
    bibleVerseContent?: string = 'abibleversecontent'

    withBibleVerse = (bibleVerse: string) => {
        this.bibleVerseContent = bibleVerse;
        return this;
    }

    withoutBibleVerse = () => {
        this.bibleVerseContent = undefined;
        return this;
    }


    build(): IResourceReference {
        return {
            id: 'anid',
            bibleVerseContent: this.bibleVerseContent
        }
    }
}