import ISong from './Song';
import IResourceReference from './ResourceReference';

export default interface ISchedule {
  id: string;
  date: string;
  activeResourcePointer: any;
  resources: IResourceReference[];
  activeSongs: ISong[];
  title: string;
}
