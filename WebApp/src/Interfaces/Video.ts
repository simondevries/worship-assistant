import IResource from './resource';
export default interface IVideo extends IResource {
  title: string;
  filePath: string;
}
