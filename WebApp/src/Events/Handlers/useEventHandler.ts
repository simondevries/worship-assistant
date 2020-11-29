import { songsRepo } from '../../Storage/songsRepository';
import { useContext } from 'react';
import AppEvent from '../Domain/appEvent';
import songCreatedEvent, {
  SongCreated as SongCreatedEvent,
} from '../Domain/songCreatedEvent';
import { Context } from '../../App';
import useBroadcastMessageEventProcessor from './useBroadcastMessageEventProcessor';
import useAppStateEventProcessors from './useAppStateEventProcessor';

export default () => {
  const [
    broadCastEventProcessors,
  ] = useBroadcastMessageEventProcessor();
  const [appStateEventProcessors] = useAppStateEventProcessors();
  const raiseEvent = (event) => {
    broadCastEventProcessors.forEach((handler) => handler(event));
    appStateEventProcessors.forEach((handler) => handler(event));

    // switch (event.eventType) {
    //   case SongCreatedEvent:
    //     songsRepo.add(event.song, event.song.id);
    //     if (event.addToSchedule) {
    //       // broad
    //     }

    //   default:
    //     throw new Error('no event handler found');
    // }
  };

  return [raiseEvent];
};
