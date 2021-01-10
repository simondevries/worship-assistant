import { useContext } from 'react';
import SongCreatedEvent, {
  SongCreatedEventName,
} from '../Domain/songCreatedEvent';
import { Context } from '../../App';
import SongAddedToSchedule, {
  SongAddedToScheduleEventName,
} from '../Domain/songAddedToScheduleEvent';
import SlideChangeEvent, {
  SlideChangedEventName,
} from '../Domain/slideChangeEvent';
import NewScheduleCreatedEvent, {
  NewScheduleCreatedEventName,
} from '../Domain/newScheduleCreatedEvent';
import removeResourceFromScheduleEvent, {
  RemoveResourceFromScheduleEventName,
} from '../Domain/removeResourceFromScheduleEvent';
import BibleVerseAddedToScheduleEvent, {
  BibleVerseAddedToScheduleEventName,
} from '../Domain/bibleVerseAddedToScheduleEvent';
import newId from '../../Helpers/newId';
import SlideShowAddedToScheduleEvent, {
  SlideShowAddedToScheduleEventName,
} from '../Domain/slideShowAddedToScheduleEvent';
import MoveResourceEvent, {
  MoveResourceEventName,
} from '../Domain/moveResourceEvent';
import VideoCreatedEvent, {
  VideoCreatedEventName,
} from '../Domain/videoCreatedEvent';
import LoadScheduleEvent, {
  LoadScheduleEventName,
} from '../Domain/loadScheduleEvent';
import getUrlFromFileHandle from '../../Helpers/getUrlFromFileHandle';
import addActiveVideoEvent, {
  AddActiveVideoEventName,
} from '../Domain/addActiveVideoEvent';
import SongEditedEvent, {
  SongEditedEventEventName,
} from '../Domain/songEditedEvent';
import ProjectorWindowClosedEvent, {
  ProjectorWindowClosedEventName,
} from '../Domain/projectorWindowClosedEvent';

const useAppStateEventProcessors = () => {
  const [state, dispatch] = useContext(Context);

  const SongCreatedEventHandler = (event: SongCreatedEvent) => {
    if (event.eventType !== SongCreatedEventName) return;

    dispatch({
      type: 'addSongToActiveSongs',
      payload: event.song,
    });
  };

  const VideoCreatedEventHandler = (event: VideoCreatedEvent) => {
    if (event.eventType !== VideoCreatedEventName) return;

    dispatch({
      type: 'addResourceToSchedule',
      payload: {
        resourceType: 'VIDEO',
        index: event.index,
        id: event.id,
      },
    });
  };

  const SongAddedToScheduleEventHandler = (
    event: SongAddedToSchedule,
  ) => {
    if (event.eventType !== SongAddedToScheduleEventName) return;

    dispatch({
      type: 'addResourceToSchedule',
      payload: {
        id: event.song.id,
        resourceType: 'SONG',
        index: event.index,
      },
    });

    dispatch({
      type: 'addSongToActiveSongs',
      payload: event.song,
    });
  };

  const SongEditedEventHandler = (event: SongEditedEvent) => {
    if (event.eventType !== SongEditedEventEventName) return;
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
    event: BibleVerseAddedToScheduleEvent,
  ) => {
    if (event.eventType !== BibleVerseAddedToScheduleEventName)
      return;

    dispatch({
      type: 'addResourceToSchedule',
      payload: {
        ...event.bibleVerse,
        id: event.bibleVerse.id,
        index: event.index,
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
    dispatch({ type: 'clearActiveVideos' });
  };

  const RemoveResourceFromScheduleEventHandler = (
    event: removeResourceFromScheduleEvent,
  ) => {
    if (event.eventType !== RemoveResourceFromScheduleEventName)
      return;

    dispatch({ type: 'removeResourceFromSchedule', id: event.id });
  };

  const MoveResourceEventHandler = (event: MoveResourceEvent) => {
    if (event.eventType !== MoveResourceEventName) return;

    if (event.direction !== -1 && event.direction !== 1) {
      console.error(`Invalid resource direction ${event?.direction}`);
      return;
    }
    dispatch({
      type: 'moveResourcePosition',
      payload: { id: event.id, direction: event.direction },
    });
  };

  const LoadScheduleEventHandler = (event: LoadScheduleEvent) => {
    if (event.eventType !== LoadScheduleEventName) return;

    dispatch({
      type: 'setCurrentSchedule',
      payload: event.schedule,
    });
  };

  const AddActiveVideoEventHandler = (event: addActiveVideoEvent) => {
    if (event.eventType !== AddActiveVideoEventName) return;

    dispatch({
      type: 'addVideoToActiveVideos',
      payload: { id: event.resourceId, url: event.url },
    });
  };

  const ProjectorWindowClosedEventHandler = (event: ProjectorWindowClosedEvent) => {
    if (event.eventType !== ProjectorWindowClosedEventName) return;

    dispatch({
      type: 'hasProjectorsAttached',
      payload: false,
    });
  };
  const arr = [
    SongCreatedEventHandler,
    SongAddedToScheduleEventHandler,
    SlideChangeEventHandler,
    NewScheduleCreatedEventHandler,
    RemoveResourceFromScheduleEventHandler,
    BibleVerseAddedToScheduleEventHandler,
    SlideShowAddedToScheduleEventHandler,
    MoveResourceEventHandler,
    VideoCreatedEventHandler,
    LoadScheduleEventHandler,
    AddActiveVideoEventHandler,
    SongEditedEventHandler,
    ProjectorWindowClosedEventHandler,
  ];
  return [arr];
};

export default useAppStateEventProcessors;
