import { songsRepo } from '../../Storage/songsRepository';
import { useContext } from 'react';
import AppEvent from '../Domain/appEvent';
import SongCreatedEvent, {
  SongCreated,
} from '../Domain/songCreatedEvent';
import { Context } from '../../App';
import SongAddedToSchedule, {
  SongAddedToScheduleEventName,
} from '../Domain/songAddedToSchedule';

const Channel_Name = 'Controller';
let bc = new BroadcastChannel('Channel_Name');

export default () => {
  const SongCreatedEventHandler = (event: SongCreatedEvent) => {
    if (
      event.eventType !== SongCreated ||
      !event.addToSchedule ||
      event.isExternalEvent
    )
      return;

    bc.postMessage(JSON.stringify(event));
  };

  const SongAddedToScheduleEventHandler = (
    event: SongAddedToSchedule,
  ) => {
    if (
      event.eventType !== SongAddedToScheduleEventName ||
      event.isExternalEvent
    )
      return;

    bc.postMessage(JSON.stringify(event));
  };

  const arr: Function[] = [
    SongCreatedEventHandler,
    SongAddedToScheduleEventHandler,
  ];
  return [arr];
};
