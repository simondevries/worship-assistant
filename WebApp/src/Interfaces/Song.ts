import IResource from './resource';
export default interface Song extends IResource {
  lyrics: Lyrics[];
  properties: {
    title: string;
    artist: string;
    release_date: string;
  };
}

export interface Lyrics {
  name: string;
  content: string;
}
