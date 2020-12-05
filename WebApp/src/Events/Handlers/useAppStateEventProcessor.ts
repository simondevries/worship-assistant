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
import SongResourceReference from '../../Interfaces/SongResourceReference';

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
      } as SongResourceReference),
      activeSongs: [event.song],
    };

    dispatch({
      type: 'setCurrentSchedule',
      payload: updatedSchedule,
    });

    dispatch({
      type: 'addActiveSong',
      payload: event.song,
    });
  };

  const SongAddedToScheduleEventHandler = (
    event: SongAddedToSchedule,
  ) => {
    if (event.eventType !== SongAddedToScheduleEventName) return;

    dispatch({
      type: 'addResourceToSchedule',
      payload: { id: event.song.id, index: event.index },
    });

    dispatch({
      type: 'addActiveSong',
      payload: event.song,
    });
  };

  const arr = [
    SongCreatedEventHandler,
    SongAddedToScheduleEventHandler,
  ];
  return [arr];
};

export default useAppStateEventProcessors;
