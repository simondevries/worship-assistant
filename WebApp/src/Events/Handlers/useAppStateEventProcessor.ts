import { AddActiveImageEventName } from './../Domain/addActiveImageEvent';
import imageCreatedEvent, { ImageCreatedEventName } from 'Events/Domain/imageCreatedEvent';
import UpdateSettingsEvent, { UpdateSettingsEventName } from './../Domain/updateSettingsEvent';
import ChangeProjectorModeEvent, { ChangeProjectorModeEventName } from 'Events/Domain/changeProjectorModeEvent';
import { defaultProjectorWidth, defaultProjectorHeight } from '../../Components/Slides/ActiveSlide/helpers/slideSizeResolver';
import { useContext } from 'react';
import SongCreatedEvent, {
  SongCreatedEventName,
} from '../Domain/songCreatedEvent';
import { Context } from '../../Common/Store/Store';
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
import addActiveVideoEvent, {
  AddActiveVideoEventName,
} from '../Domain/addActiveVideoEvent';
import SongEditedEvent, {
  SongEditedEventEventName,
} from '../Domain/songEditedEvent';
import ProjectorWindowClosedEvent, {
  ProjectorWindowClosedEventName,
} from '../Domain/projectorWindowClosedEvent';
import PongFromProjectorToControllerEvent, { PongFromProjectorToControllerEventName } from 'Events/Domain/pongFromProjectorToControllerEvent';
import addActiveImageEvent from 'Events/Domain/addActiveImageEvent';
import { ProjectorViewMode } from 'Interfaces/Schedule';

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

  const ImageCreatedEventHandler = (event: imageCreatedEvent) => {
    if (event.eventType !== ImageCreatedEventName) return;

    dispatch({
      type: 'addResourceToSchedule',
      payload: {
        resourceType: 'IMAGE',
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
        bibleVerseContent: event.bibleVerse.bibleVerseContent,
        passageReference: event.bibleVerse.passageReference,
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
    dispatch({ type: 'clearActiveImages' });
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

  const AddActiveImageEventHandler = (event: addActiveImageEvent) => {
    if (event.eventType !== AddActiveImageEventName) return;

    dispatch({
      type: 'addImageToActiveImages',
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


  const PingFromProjectorReceivedEventHandler = (event: PongFromProjectorToControllerEvent) => {
    if (event.eventType !== PongFromProjectorToControllerEventName || event.isExternalEvent === false) return;

    dispatch({
      type: 'setCurrentProjectorSize', payload:
        { width: event?.projectorDimensionsMessage?.width ?? defaultProjectorWidth, height: event?.projectorDimensionsMessage?.height ?? defaultProjectorHeight }
    })


    dispatch({
      type: 'hasProjectorsAttached',
      payload: true,
    });
  };

  const SlideBlackoutEventHandler = (event: ChangeProjectorModeEvent) => {
    const shouldContinue = event.eventType === ChangeProjectorModeEventName;
    if (!shouldContinue) return;

    if (event.projectorMode === ProjectorViewMode.Blackout) {
      dispatch({
        type: 'setProjectorViewBlackout',
        payload: event.color
      });
    }

    if (event.projectorMode === ProjectorViewMode.Blank) {
      dispatch({
        type: 'setProjectorViewBlank'
      });
    }

    if (event.projectorMode === ProjectorViewMode.Standard) {
      dispatch({
        type: 'setProjectorViewStandard'
      });
    }
  };


  const UpdateSettingsEventHandler = (event: UpdateSettingsEvent) => {
    const shouldContinue = event.eventType === UpdateSettingsEventName;
    if (!shouldContinue) return;

    dispatch({ type: 'setSettings', payload: event.settings });
  }



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
    AddActiveImageEventHandler,
    ImageCreatedEventHandler,
    LoadScheduleEventHandler,
    AddActiveVideoEventHandler,
    SongEditedEventHandler,
    ProjectorWindowClosedEventHandler,
    PingFromProjectorReceivedEventHandler,
    SlideBlackoutEventHandler,
    UpdateSettingsEventHandler,
  ];
  return [arr];
};

export default useAppStateEventProcessors;
