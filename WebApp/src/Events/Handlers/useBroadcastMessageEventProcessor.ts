import SongCreatedEvent, {
  SongCreatedEventName,
} from '../Domain/songCreatedEvent';
import SongAddedToSchedule, {
  SongAddedToScheduleEventName,
} from '../Domain/songAddedToScheduleEvent';
import SlideChangeEvent, {
  SlideChangedEventName,
} from '../Domain/slideChangeEvent';
import newScheduleCreatedEvent, {
  NewScheduleCreatedEventName,
} from '../Domain/newScheduleCreatedEvent';
import RemoveResourceFromScheduleEvent, {
  RemoveResourceFromScheduleEventName,
} from '../Domain/removeResourceFromScheduleEvent';
import VideoCreatedEvent, {
  VideoCreatedEventName,
} from '../Domain/videoCreatedEvent';
import SlideShowAddedToScheduleEvent, {
  SlideShowAddedToScheduleEventName,
} from '../Domain/slideShowAddedToScheduleEvent';
import AddActiveVideoEvent, {
  AddActiveVideoEventName,
} from '../Domain/addActiveVideoEvent';
import SongEditedEvent, {
  SongEditedEventEventName,
} from '../Domain/songEditedEvent';
import VideoModeChangeEvent, {
  VideoMoodeChangeEventName,
} from '../Domain/VideoModeChangeEvent';
import BibleVerseAddedToScheduleEvent, {
  BibleVerseAddedToScheduleEventName,
} from '../Domain/bibleVerseAddedToScheduleEvent';
import ProjectorWindowClosedEvent, {
  ProjectorWindowClosedEventName,
} from '../Domain/projectorWindowClosedEvent';

let bc = new BroadcastChannel('worshipAssistApp');

export default () => {
  const SongCreatedEventHandler = (event: SongCreatedEvent) => {
    if (
      event.eventType !== SongCreatedEventName ||
      event.isExternalEvent
    )
      return;

    bc.postMessage(
      JSON.stringify({ ...event, isExternalEvent: true }),
    );
  };

  const SongAddedToScheduleEventHandler = (
    event: SongAddedToSchedule,
  ) => {
    if (
      event.eventType !== SongAddedToScheduleEventName ||
      event.isExternalEvent
    )
      return;

    bc.postMessage(
      JSON.stringify({ ...event, isExternalEvent: true }),
    );
  };

  const SlideChangeEventHandler = (event: SlideChangeEvent) => {
    if (
      event.eventType !== SlideChangedEventName ||
      event.isExternalEvent
    )
      return;

    bc.postMessage(
      JSON.stringify({ ...event, isExternalEvent: true }),
    );
  };

  const NewScheduleCreatedEventHandler = (
    event: newScheduleCreatedEvent,
  ) => {
    if (
      event.eventType !== NewScheduleCreatedEventName ||
      event.isExternalEvent
    )
      return;

    bc.postMessage(
      JSON.stringify({ ...event, isExternalEvent: true }),
    );
  };

  const RemoveResourceFromScheduleEventHandler = (
    event: RemoveResourceFromScheduleEvent,
  ) => {
    if (
      event.eventType !== RemoveResourceFromScheduleEventName ||
      event.isExternalEvent
    )
      return;

    bc.postMessage(
      JSON.stringify({ ...event, isExternalEvent: true }),
    );
  };

  const VideoAddedToScheduleEventHandler = (
    event: VideoCreatedEvent,
  ) => {
    if (
      event.eventType !== VideoCreatedEventName ||
      event.isExternalEvent
    )
      return;

    bc.postMessage(
      JSON.stringify({ ...event, isExternalEvent: true }),
    );
  };

  const SlideShowAddedToScheduleEventHandler = (
    event: SlideShowAddedToScheduleEvent,
  ) => {
    if (
      event.eventType !== SlideShowAddedToScheduleEventName ||
      event.isExternalEvent
    )
      return;

    bc.postMessage(
      JSON.stringify({ ...event, isExternalEvent: true }),
    );
  };

  const VideoCreatedEventHandler = (event: VideoCreatedEvent) => {
    if (
      event.eventType !== VideoCreatedEventName ||
      event.isExternalEvent
    )
      return;

    bc.postMessage(
      JSON.stringify({ ...event, isExternalEvent: true }),
    );
  };

  const AddActiveVideoEventHandler = (event: AddActiveVideoEvent) => {
    if (
      event.eventType !== AddActiveVideoEventName ||
      event.isExternalEvent
    )
      return;

    bc.postMessage(
      JSON.stringify({ ...event, isExternalEvent: true }),
    );
  };

  const SongEditedEventHandler = (event: SongEditedEvent) => {
    if (
      event.eventType !== SongEditedEventEventName ||
      event.isExternalEvent
    )
      return;

    bc.postMessage(
      JSON.stringify({ ...event, isExternalEvent: true }),
    );
  };

  const VideoModeChangeEventHandler = (
    event: VideoModeChangeEvent,
  ) => {
    if (
      event.eventType !== VideoMoodeChangeEventName ||
      event.isExternalEvent
    )
      return;

    bc.postMessage(
      JSON.stringify({ ...event, isExternalEvent: true }),
    );
  };

  const BibleVerseAddedToScheduleEventHandler = (
    event: BibleVerseAddedToScheduleEvent,
  ) => {
    if (
      event.eventType !== BibleVerseAddedToScheduleEventName ||
      event.isExternalEvent
    ) {
      return;
    }

    bc.postMessage(
      JSON.stringify({ ...event, isExternalEvent: true }),
    );
  };

  const ProjectorWindowClosedEventHandler = (
    event: ProjectorWindowClosedEvent,
  ) => {
    if (
      event.eventType !== ProjectorWindowClosedEventName ||
      !event.isExternalEvent
    ) {
      return;
    }

    bc.postMessage(
      JSON.stringify({ ...event, isExternalEvent: false }),
    );
  };

  // Chrome extension
  // const activeResource =
  //   state.currentSchedule.resources[resourceId];

  // if (
  //   activeResource.resourceType &&
  //   activeResource.resourceType.toUpperCase() === 'VIDEO' &&
  //   activeResource.filePath
  // ) {
  //   changeTab(activeResource.filePath);
  // }

  // if (
  //   activeResource.resourceType &&
  //   activeResource.resourceType.toUpperCase() === 'SONG'
  // ) {
  //   changeTab('/project');
  // }

  const arr: Function[] = [
    SongCreatedEventHandler,
    SongAddedToScheduleEventHandler,
    SlideChangeEventHandler,
    NewScheduleCreatedEventHandler,
    RemoveResourceFromScheduleEventHandler,
    VideoAddedToScheduleEventHandler,
    SlideShowAddedToScheduleEventHandler,
    VideoCreatedEventHandler,
    AddActiveVideoEventHandler,
    SongEditedEventHandler,
    VideoModeChangeEventHandler,
    BibleVerseAddedToScheduleEventHandler,
    ProjectorWindowClosedEventHandler,
  ];
  return [arr];
};
