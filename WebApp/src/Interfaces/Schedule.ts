import Song from './Song';
import ResourceReference from './ResourceReference';
import newId from '../Helpers/newId';
import ActiveResourcePointer from './ActiveResourcePointer';

export default interface Schedule {
  id: string;
  date: string;
  activeResourcePointer: ActiveResourcePointer;
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
    activeSongs: [],
  };
};
