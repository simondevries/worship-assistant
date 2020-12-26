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
import removeResourceFromScheduleEvent, {
  RemoveResourceFromScheduleEventName,
} from '../Domain/removeResourceFromScheduleEvent';
import bibleVerseAddedToScheduleEvent, {
  BibleVerseAddedToScheduleEventName,
} from '../Domain/bibleVerseAddedToScheduleEvent';
import newId from '../../Helpers/newId';

const Channel_Name = 'Controller';
let bc = new BroadcastChannel('Channel_Name');

const useAppStateEventProcessors = () => {
  const [state, dispatch] = useContext(Context);

  const SongCreatedEventHandler = (event: SongCreatedEvent) => {
    if (event.eventType !== SongCreatedEventName) return;

    dispatch({
      type: 'addSongToActiveSongs',
      payload: event.song,
    });
  };

  const SongAddedToScheduleEventHandler = (
    event: SongAddedToSchedule,
  ) => {
    if (event.eventType !== SongAddedToScheduleEventName) return;

    dispatch({
      type: 'addResourceToSchedule',
      payload: { id: event.song.id, resourceType: 'SONG' },
    });

    dispatch({
      type: 'addSongToActiveSongs',
      payload: event.song,
    });
  };

  const BibleVerseAddedToScheduleEventHandler = (
    event: bibleVerseAddedToScheduleEvent,
  ) => {
    if (event.eventType !== BibleVerseAddedToScheduleEventName)
      return;

    dispatch({
      type: 'addResourceToSchedule',
      payload: {
        ...event.bibleVerse,
        id: newId(),
        resourceType: 'BIBLEVERSE',
      },
    });
  };

  const SlideChangeEventHandler = (event: SlideChangeEvent) => {
    if (event.eventType !== SlideChangedEventName) return;

    dispatch({
      type: 'setActiveResourcePointer',
      payload: {
        resourceId: event.resourceId,
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

  const RemoveResourceFromScheduleEventHandler = (
    event: removeResourceFromScheduleEvent,
  ) => {
    if (event.eventType !== RemoveResourceFromScheduleEventName)
      return;

    dispatch({ type: 'removeResourceFromSchedule', id: event.id });
  };

  const arr = [
    SongCreatedEventHandler,
    SongAddedToScheduleEventHandler,
    SlideChangeEventHandler,
    NewScheduleCreatedEventHandler,
    RemoveResourceFromScheduleEventHandler,
    BibleVerseAddedToScheduleEventHandler,
  ];
  return [arr];
};

export default useAppStateEventProcessors;
