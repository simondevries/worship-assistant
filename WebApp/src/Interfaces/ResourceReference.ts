import Verse from './Verse';
import Song from './Song';

export default interface ResourceReference {
  index: number;
  id: string;
  resourceType: string;
}
