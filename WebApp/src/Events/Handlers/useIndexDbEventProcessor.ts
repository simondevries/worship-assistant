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
import SongResourceReference from '../../Interfaces/SongResourceReference';
import NewScheduleCreatedEvent, {
  NewScheduleCreatedEventName,
} from '../Domain/newScheduleCreatedEvent';

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
      } as SongResourceReference),
    };

    scheduleRepo.set(updatedSchedule, updatedSchedule.id);
  };

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
  ];
  return [arr];
};

export default useIndexDbEventProcessor;