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
import SlideShowAddedToScheduleEvent, {
  SlideShowAddedToScheduleEventName,
} from '../Domain/slideShowAddedToScheduleEvent';
import SongEditedEvent, { 
  SongEditedEventEventName 
} from '../Domain/songEditedEvent';

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

  const SongEditedEventHandler = (event: SongEditedEvent) => {
    if (event.eventType !== SongEditedEventEventName)
      return;
    dispatch({
      type: 'editSong',
      payload: event.song,
    });

    dispatch({
      type: 'addSongToActiveSongs',
      payload: event.song,
    });
  };

  const SlideShowAddedToScheduleEventHandler = (
    event: SlideShowAddedToScheduleEvent,
  ) => {
    if (event.eventType !== SlideShowAddedToScheduleEventName) return;

    dispatch({
      type: 'addResourceToSchedule',
      payload: {
        id: event.id,
        resourceType: 'SLIDESHOW',
        embeddedPowerPointUrl: event.embeddedPowerPointUrl,
      },
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
    SlideShowAddedToScheduleEventHandler,
    SongEditedEventHandler,
  ];
  return [arr];
};

export default useAppStateEventProcessors;
