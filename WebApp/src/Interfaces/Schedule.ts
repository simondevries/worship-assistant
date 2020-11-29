import Verse from './Verse';
import Song from './Song';

export default interface Schedule {
  id: string;
  date: string;
  activeResourcePointer: any;
  resources: any[];
  activeSongs: Song[];
  title: string;
}
