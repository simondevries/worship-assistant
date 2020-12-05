import Resource from './resource';
export default interface Song extends Resource {
  title: string;
  lyrics: any;
}
