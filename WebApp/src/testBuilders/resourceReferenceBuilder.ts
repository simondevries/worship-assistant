import IResourceReference from "../Interfaces/ResourceReference";

export class ResourceReferenceBuilder {
    bibleVerseContent?: string = 'abibleversecontent'
    id: string = 'anid';
    
    withId(id): ResourceReferenceBuilder{
        this.id = id;
        return this;
    }

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
            id: this.id,
            bibleVerseContent: this.bibleVerseContent
        }
    }
}