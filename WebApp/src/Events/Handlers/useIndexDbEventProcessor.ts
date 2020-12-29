import { songsRepo } from '../../Storage/songsRepository';
import { scheduleRepo } from '../../Storage/scheduleRepository';
import { settingsRepo } from '../../Storage/settingsRepository';
import { useContext } from 'react';
import AppEvent from '../Domain/appEvent';
import SongCreatedEvent, {
  SongCreatedEventName,
} from '../Domain/songCreatedEvent';
import { Context } from '../../App';
import SongAddedToSchedule, {
  SongAddedToScheduleEventName,
} from '../Domain/songAddedToScheduleEvent';
import ISongResourceReference from '../../Interfaces/SongResourceReference';
import NewScheduleCreatedEvent, {
  NewScheduleCreatedEventName,
} from '../Domain/newScheduleCreatedEvent';
import SlideShowAddedToScheduleEvent, {
  SlideShowAddedToScheduleEventName,
} from '../Domain/slideShowAddedToScheduleEvent';
import SongEditedEvent from '../Domain/songEditedEvent';

const _handleScheduleUpdated = (state, inx, song) => {
  console.log('ns1', inx);
};

const useIndexDbEventProcessor = () => {
  const [state, dispatch] = useContext(Context);

  const SongCreatedEventHandler = (event: SongCreatedEvent) => {
    if (
      event.eventType !== SongCreatedEventName ||
      event.isExternalEvent
    )
      return;

    songsRepo.add(event.song, event.song.id);
  };

  const SongAddedToScheduleEventHandler = (
    event: SongAddedToSchedule,
  ) => {
    if (
      event.eventType !== SongAddedToScheduleEventName ||
      event.isExternalEvent
    )
      return;

    // Hacks this is duplicate from the reducer
    const updatedSchedule = {
      ...state.currentSchedule,
      resources: state.currentSchedule.resources.concat({
        index: event.index,
        id: event.song.id,
        resourceType: 'SONG',
      } as ISongResourceReference),
    };

    scheduleRepo.set(updatedSchedule, updatedSchedule.id);
  };

  const SongEditedEventHandler = (event: SongEditedEvent) => {
    // todo (Sdv) double check this logic
    if (event.eventType !== SongEditedEvent || event.isExternalEvent)
      return;

    // todo (Sdv) not tested
    songsRepo.set(event.song, event.song.id);
  };

  // const SlideShowAddedToScheduleEventHandler = (
  //   event: SlideShowAddedToScheduleEvent,
  // ) => {
  //   if (
  //     event.eventType !== SlideShowAddedToScheduleEventName ||
  //     event.isExternalEvent
  //   )
  //     return;

  //   // Hacks this is duplicate from the reducer
  //   const updatedSchedule = {
  //     ...state.currentSchedule,
  //     resources: state.currentSchedule.resources.concat({
  //       id: event.id,
  //       resourceType: 'SLIDESHOW',
  //       embeddedPowerPointUrl: event.embeddedPowerPointUrl,
  //     } as ISongResourceReference),
  //   };

  //   scheduleRepo.set(updatedSchedule, updatedSchedule.id);
  // };

  const NewScheduleCreatedEventHandler = (
    event: NewScheduleCreatedEvent,
  ) => {
    if (
      event.eventType !== NewScheduleCreatedEventName ||
      event.isExternalEvent
    )
      return;
    console.log('event.schedule', event.schedule.id);
    scheduleRepo.add(event.schedule, event.schedule.id);

    settingsRepo.setCurrentService(event.schedule.id);
  };

  const arr = [
    SongCreatedEventHandler,
    SongAddedToScheduleEventHandler,
    NewScheduleCreatedEventHandler,
    SongEditedEventHandler,
    // SlideShowAddedToScheduleEventHandler,
  ];
  return [arr];
};

export default useIndexDbEventProcessor;
