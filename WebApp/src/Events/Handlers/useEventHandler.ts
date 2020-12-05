import { songsRepo } from '../../Storage/songsRepository';
import { useContext } from 'react';
import AppEvent from '../Domain/appEvent';
import songCreatedEvent, {
  SongCreated as SongCreatedEvent,
} from '../Domain/songCreatedEvent';
import { Context } from '../../App';
import useBroadcastMessageEventProcessor from './useBroadcastMessageEventProcessor';
import useAppStateEventProcessors from './useAppStateEventProcessor';
import useIndexDbEventProcessor from './useIndexDbEventProcessor';

export default () => {
  const [
    broadCastEventProcessors,
  ] = useBroadcastMessageEventProcessor();
  const [appStateEventProcessors] = useAppStateEventProcessors();
  const [indexDbEventProcessors] = useIndexDbEventProcessor();

  const raiseEvent = (event) => {
    broadCastEventProcessors.forEach((handler) => handler(event));
    appStateEventProcessors.forEach((handler) => handler(event));
    indexDbEventProcessors.forEach((handler) => handler(event));
  };

  return [raiseEvent];
};
