import Resource from './resource';
export default interface Video extends Resource {
  title: string;
  filePath: string;
}
