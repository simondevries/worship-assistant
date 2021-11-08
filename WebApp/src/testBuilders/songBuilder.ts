import IResourceReference from "../Interfaces/ResourceReference";
import ISong from 'Interfaces/Song';

export class SongBuilder {
  id: string = 'aSongId'

    withReference(identifier: string):SongBuilder {
        this.id = identifier;
        return this;
    }

    build(): ISong {
        return {
            id: this.id,
            lyrics: [{name:"v1", content: `Oh Lord, my God
            When I, in awesome wonder
            Consider all the worlds Thy hands have made
            I see the stars, I hear the rolling thunder
            Thy power throughout the universe displayed`},
            {name:"v2", content: `Then sings my soul, my Savior God to Thee
            How great Thou art, how great Thou art
            Then sings my soul, my Savior God to Thee
            How great Thou art, how great Thou art`}],
            properties: {
                artist: "anArtist",
                release_date: "2020",
                title: "How Great Tho Art"
            },
            resourceType: 'SONG',
        }
    }
}

