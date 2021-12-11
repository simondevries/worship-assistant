import Song from './Song/Song';
import ResourceReference from './ResourceReference';
import newId from '../Helpers/newId';
import ActiveResourcePointer from './ActiveResourcePointer';
import ISong from './Song/Song';
import IResourceReference from './ResourceReference';
import IActiveVideo from './ActiveVideo';

export default interface ISchedule {
  id: string;
  date: string;
  activeResourcePointer: ActiveResourcePointer;
  resourceOrder: string[];
  resources: ResourceReference[];
  activeSongs: Song[];
  activeVideos: IActiveVideo[];
  title: string;
}

export const empty = () => {
  return {
    id: newId(),
    resources: [],
    date: new Date(),
    title: '', // title not really needed
    activeResourcePointer: {
      slideIndex: 0,
      resourceId: null,
    },
    resourceOrder: [],
    activeSongs: [],
  };
};

export const hasUserFileHandler = (schedule: ISchedule) => {
  return schedule.resources.some(
    (r) => r.resourceType === 'VIDEO' || r.resourceType === 'IMAGE',
  );
};
