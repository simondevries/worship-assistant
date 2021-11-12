import IResourceReference from "../Interfaces/ResourceReference";
import ISong from 'Interfaces/Song';

export class SongBuilder {
    id: string = 'anid'


    withReference(identifier: string): SongBuilder {
        this.id = identifier;
        return this;
    }

    build(): ISong {
        return {
            id: this.id,
            lyrics: [{
                name: "v1", content: `Oh Lord, my God\n
When I, in awesome wonder\n
Consider all the worlds Thy hands have made
I see the stars, I hear the rolling thunder
Thy power throughout the universe displayed`},
            {
                name: "v2", content: `Then sings \nmy soul, my Savior God to Thee\n
How great Thou art, how great Thou art\n
Then sings my soul, my Savior God to Thee\n
How great Thou art, how great Thou art\n`}],
            properties: {
                artist: "anArtist",
                release_date: "2020",
                title: "How Great Tho Art"
            },
            resourceType: 'SONG',
        }
    }
}

