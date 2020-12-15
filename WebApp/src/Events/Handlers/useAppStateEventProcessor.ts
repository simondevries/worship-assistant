import { songsRepo } from '../../Storage/songsRepository';
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
import SlideChangeEvent, {
  SlideChangedEventName,
} from '../Domain/slideChangeEvent';
import NewScheduleCreatedEvent, {
  NewScheduleCreatedEventName,
} from '../Domain/newScheduleCreatedEvent';

const Channel_Name = 'Controller';
let bc = new BroadcastChannel('Channel_Name');

const useAppStateEventProcessors = () => {
  const [state, dispatch] = useContext(Context);

  const SongCreatedEventHandler = (event: SongCreatedEvent) => {
    if (event.eventType !== SongCreatedEventName) return;

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

  const SlideChangeEventHandler = (event: SlideChangeEvent) => {
    if (event.eventType !== SlideChangedEventName) return;

    dispatch({
      type: 'setActiveResourcePointer',
      payload: {
        resourceIndex: event.resourceIndex,
        slideIndex: event.slideIndex,
      },
    });
  };

  const NewScheduleCreatedEventHandler = (
    event: NewScheduleCreatedEvent,
  ) => {
    if (event.eventType !== NewScheduleCreatedEventName) return;

    dispatch({ type: 'setCurrentSchedule', payload: event.schedule });

    dispatch({ type: 'clearActiveSongs' });
  };

  const arr = [
    SongCreatedEventHandler,
    SongAddedToScheduleEventHandler,
    SlideChangeEventHandler,
    NewScheduleCreatedEventHandler,
  ];
  return [arr];
};

export default useAppStateEventProcessors;
