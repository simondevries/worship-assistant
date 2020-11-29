import { songsRepo } from '../../Storage/songsRepository';
import { useContext } from 'react';
import AppEvent from '../Domain/appEvent';
import SongCreatedEvent, {
  SongCreated,
} from '../Domain/songCreatedEvent';
import { Context } from '../../App';

const Channel_Name = 'Controller';
let bc = new BroadcastChannel('Channel_Name');

const useAppStateEventProcessors = () => {
  const [state, dispatch] = useContext(Context);

  const SongCreatedEventHandler = (event: SongCreatedEvent) => {
    if (event.eventType !== SongCreated || !event.addToSchedule)
      return;

    const updatedSchedule = {
      ...state.currentSchedule,
      resources: state.currentSchedule.resources.concat({
        id: event.song.id,
        index: state.currentSchedule.resources.length,
        resourceType: 'SONG',
      }),
      activeSongs: [event.song],
    };

    dispatch({
      type: 'setCurrentSchedule',
      payload: updatedSchedule,
    });
  };

  const arr = [SongCreatedEventHandler];
  return [arr];
};

export default useAppStateEventProcessors;
