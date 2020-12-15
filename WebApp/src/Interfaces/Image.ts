import IResource from './resource';
export default interface IImage extends IResource {
  title: string;
  filePath: string;
}
