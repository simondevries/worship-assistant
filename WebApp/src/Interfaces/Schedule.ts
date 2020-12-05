import Song from './Song';
import ResourceReference from './ResourceReference';

export default interface Schedule {
  id: string;
  date: string;
  activeResourcePointer: any;
  resources: ResourceReference[];
  activeSongs: Song[];
  title: string;
}
