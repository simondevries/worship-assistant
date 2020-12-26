import IResource from './resource';
export default interface ISong extends IResource {
  lyrics: any;
  properties: {
    title: string;
    artist: string;
    release_date: string;
  }
}
