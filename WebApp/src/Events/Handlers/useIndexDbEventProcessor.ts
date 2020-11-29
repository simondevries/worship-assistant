import { songsRepo } from '../../Storage/songsRepository';
import { useContext } from 'react';
import AppEvent from '../Domain/appEvent';
import SongCreatedEvent, {
  SongCreated,
} from '../Domain/songCreatedEvent';
import { Context } from '../../App';

const Channel_Name = 'Controller';
let bc = new BroadcastChannel('Channel_Name');

const SongCreatedEventHandler = (event: SongCreatedEvent) => {
  if (
    event.eventType !== SongCreated ||
    !event.addToSchedule ||
    event.isExternalEvent
  )
    return;

  bc.postMessage(JSON.stringify(event));
};

export default [SongCreatedEventHandler];
