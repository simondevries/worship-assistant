import { BibleVerseContent } from './../Interfaces/BibleVerse';
import IResourceReference from "../Interfaces/ResourceReference";

export class ResourceReferenceBuilder {
    bibleVerseContent: BibleVerseContent[] = [new BibleVerseContentBuilder().build()];
    id: string = 'anid';


    withId(id): ResourceReferenceBuilder {
        this.id = id;
        return this;
    }

    withBibleVerseContent = (bibleVerseContent: BibleVerseContent[]) => {
        this.bibleVerseContent = bibleVerseContent;
        return this;
    }

    withoutBibleVerse = () => {
        this.bibleVerseContent = [];
        return this;
    }

    build(): IResourceReference {
        return {
            id: this.id,
            bibleVerseContent: this.bibleVerseContent
        }
    }
}

export class BibleVerseContentBuilder {
    bookId: string = 'NUM';
    bookName: string = 'Numbers';
    chapter: number = 1;
    text: string = 'versetext';
    verse: number = 1;


    build(): BibleVerseContent {
        return {
            bookId: this.bookId,
            bookName: this.bookName,
            chapter: this.chapter,
            verse: this.verse,
            text: this.text
        }
    }
}