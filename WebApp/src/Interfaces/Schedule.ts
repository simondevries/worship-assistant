import Song from './Song/Song';
import ResourceReference from './ResourceReference';
import newId from '../Helpers/newId';
import ActiveResourcePointer from './ActiveResourcePointer';
import IActiveVideo from './ActiveVideo';
import IActiveImage from './ActiveImage';

export default interface ISchedule {
  id: string;
  date: Date;
  activeResourcePointer: ActiveResourcePointer;
  resourceOrder: string[];
  resources: ResourceReference[];
  activeSongs: Song[];
  activeVideos: IActiveVideo[];
  activeImages: IActiveImage[];
  title: string;

  currentProjectorViewMode: {
    mode: ProjectorViewMode;
    blankColor?: 'White' | 'Black'
  }
}

export enum ProjectorViewMode {
  Blackout,
  Blank,
  Standard
}


export const emptySchedule = (): ISchedule => {

  return {
    id: newId(),
    resources: [],
    date: new Date(),
    title: '', // title not really needed
    activeResourcePointer: {
      slideIndex: 0,
      resourceId: '',
    },
    resourceOrder: [],
    activeSongs: [],
    activeVideos: [],
    activeImages: [],
    currentProjectorViewMode: { mode: ProjectorViewMode.Standard }

  };
};

export const hasUserFileHandler = (schedule: ISchedule) => {
  return schedule.resources.some(
    (r) => r.resourceType === 'VIDEO' || r.resourceType === 'IMAGE',
  );
};

export const scheduleSchemaMigrator = (schedule: ISchedule) => {
  let updatedSchedule = schedule;

  if (!schedule.currentProjectorViewMode) {
    updatedSchedule.currentProjectorViewMode = emptySchedule().currentProjectorViewMode
  }


  return updatedSchedule;
}


export const Schedule = {
  selectors: {

    isProjectorBlank: (schedule?: ISchedule) =>
      schedule?.currentProjectorViewMode?.mode === ProjectorViewMode.Blank,

    isProjectorWhiteout: (schedule?: ISchedule) =>
      schedule?.currentProjectorViewMode?.blankColor === 'White' && schedule?.currentProjectorViewMode?.mode === ProjectorViewMode.Blackout,


    isProjectorBlackout: (schedule?: ISchedule) =>
      schedule?.currentProjectorViewMode?.blankColor === 'Black' && schedule?.currentProjectorViewMode?.mode === ProjectorViewMode.Blackout,


  }

}