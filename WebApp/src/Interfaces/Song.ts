import IResource from './resource';
import { ITheme } from './themes';
export default interface Song extends IResource {
  id: string;
  lyrics: Lyrics[];
  resourceType: string,
  theme: ITheme,
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
