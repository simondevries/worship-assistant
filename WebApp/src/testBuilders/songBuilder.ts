import IResourceReference from "../Interfaces/ResourceReference";
import ISong, { Lyrics } from 'Interfaces/Song/Song';

export class SongBuilder {
    id: string = 'anid'
    verseOrder: string[] | undefined = ['v1', 'v2']
    lyrics: Lyrics[] = [{
        name: "v1", content: `Oh Lord, my God\n
When I, in awesome wonder\n
Consider all the worlds Thy hands have made
I see the stars, I hear the rolling thunder
Thy power throughout the universe displayed`},
    {
        name: "v2", content: `Then sings \nmy soul, my Savior God to Thee\n
How great Thou art, how great Thou art\n
Then sings my soul, my Savior God to Thee\n
How great Thou art, how great Thou art\n`}];

    withVerseOrder(order: string[]): SongBuilder {
        this.verseOrder = order;
        return this;
    }


    withNullVerseOrder(): SongBuilder {
        this.verseOrder = undefined;
        return this;
    }

    withReference(identifier: string): SongBuilder {
        this.id = identifier;
        return this;
    }

    withLyricTags(tags: string[]): SongBuilder {
        this.lyrics = this.lyrics.map((l, indx) => {
            return { ...l, name: tags[indx] }
        });
        return this;
    }


    build(): ISong {
        return {
            id: this.id,
            lyrics: this.lyrics,
            properties: {
                artist: "anArtist",
                release_date: "2020",
                title: "How Great Tho Art",
                verseOrder: this.verseOrder
            },
            resourceType: 'SONG',
        }
    }
}

