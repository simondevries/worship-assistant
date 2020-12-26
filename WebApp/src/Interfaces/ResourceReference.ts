import IVerse from './Verse';
import ISong from './Song';

export default interface IResourceReference {
  index: number;
  id: string;
  resourceType: string;
}
