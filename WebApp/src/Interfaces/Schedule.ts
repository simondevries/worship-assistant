import Song from './Song';
import ResourceReference from './ResourceReference';
import newId from '../Helpers/newId';
import ActiveResourcePointer from './ActiveResourcePointer';
import ISong from './Song';
import IResourceReference from './ResourceReference';

export default interface ISchedule {
  id: string;
  date: string;
  activeResourcePointer: ActiveResourcePointer;
  resourceOrder: string[];
  resources: ResourceReference[];
  activeSongs: Song[];
  title: string;
}

export const empty = (title: string) => {
  return {
    id: newId(),
    resources: [],
    date: new Date(),
    title: title,
    activeResourcePointer: {
      slideIndex: 0,
      resourceId: null,
    },
    resourceOrder: [],
    activeSongs: [],
  };
};
