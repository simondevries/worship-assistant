import Verse from './Verse';

export default interface Song {
  id: string;
  lyrics: Verse[];
  properties: SongProperties;
}

export interface SongProperties {
  title: string;
}
