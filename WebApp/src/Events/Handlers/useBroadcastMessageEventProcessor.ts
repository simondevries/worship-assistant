import { PingProjectorEventName } from './../Domain/pingProjector';
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
import RequestPongFromProjectorEvent, { PongFromProjectorToControllerEventName } from 'Events/Domain/pongFromProjectorToControllerEvent';
import { crossBrowserMessageMapper, MessageToController, MessageToProjector } from 'Events/Domain/CrossBrowserMessage';
import PongFromProjectorToControllerEvent from 'Events/Domain/pongFromProjectorToControllerEvent';
import PingProjectorEvent from '../Domain/pingProjector';

let bc = new BroadcastChannel('worshipAssistApp');

const useBroadcastMessageEventProcessor = () => {
  const SongCreatedEventHandler = (event: SongCreatedEvent) => {
    if (
      event.eventType !== SongCreatedEventName ||
      event.isExternalEvent
    )
      return;

    const message = new MessageToProjector(event);

    bc.postMessage(
      crossBrowserMessageMapper.toString(message)
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

    const message = new MessageToProjector(event);
    bc.postMessage(
      crossBrowserMessageMapper.toString(message)
    );
  };

  const SlideChangeEventHandler = (event: SlideChangeEvent) => {
    if (
      event.eventType !== SlideChangedEventName ||
      event.isExternalEvent
    )
      return;

    const message = new MessageToProjector(event);

    bc.postMessage(
      crossBrowserMessageMapper.toString(message)
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

    const message = new MessageToProjector(event);

    bc.postMessage(
      crossBrowserMessageMapper.toString(message)
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

    const message = new MessageToProjector(event);

    bc.postMessage(
      crossBrowserMessageMapper.toString(message)
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

    const message = new MessageToProjector(event);

    bc.postMessage(
      crossBrowserMessageMapper.toString(message)
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

    const message = new MessageToProjector(event);

    bc.postMessage(
      crossBrowserMessageMapper.toString(message)
    );
  };

  const VideoCreatedEventHandler = (event: VideoCreatedEvent) => {
    if (
      event.eventType !== VideoCreatedEventName ||
      event.isExternalEvent
    )
      return;

    const message = new MessageToProjector(event);

    bc.postMessage(
      crossBrowserMessageMapper.toString(message)
    );
  };

  const AddActiveVideoEventHandler = (event: AddActiveVideoEvent) => {
    if (
      event.eventType !== AddActiveVideoEventName ||
      event.isExternalEvent
    )
      return;

    const message = new MessageToProjector(event);

    bc.postMessage(
      crossBrowserMessageMapper.toString(message)
    );
  };

  const SongEditedEventHandler = (event: SongEditedEvent) => {
    if (
      event.eventType !== SongEditedEventEventName ||
      event.isExternalEvent
    )
      return;


    const message = new MessageToProjector(event);

    bc.postMessage(
      crossBrowserMessageMapper.toString(message)
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

    const message = new MessageToProjector(event);

    bc.postMessage(
      crossBrowserMessageMapper.toString(message)
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

    const message = new MessageToProjector(event);

    bc.postMessage(
      crossBrowserMessageMapper.toString(message)
    );
  };

  const ProjectorWindowClosedEventHandler = (
    event: ProjectorWindowClosedEvent,
  ) => {
    if (
      event.eventType !== ProjectorWindowClosedEventName ||
      event.isExternalEvent
    ) {
      return;
    }

    const message = new MessageToController(event);

    bc.postMessage(
      crossBrowserMessageMapper.toString(message)
    );
  };


  const RequestPongFromProjector = (event: RequestPongFromProjectorEvent) => {
    const shouldContinueWhen = event.eventType === PingProjectorEventName && !event.isExternalEvent;
    if (!shouldContinueWhen) return;
    console.log('received')
    const message = new MessageToProjector(event);

    bc.postMessage(
      crossBrowserMessageMapper.toString(message)
    );
  };

  const PingReceivedFromController = (event: RequestPongFromProjectorEvent) => {
    const shouldContinueWhen = (event.eventType === PingProjectorEventName && event.isExternalEvent);
    if (!shouldContinueWhen) return;

    const pongEvent = new PongFromProjectorToControllerEvent(true);
    const message = new MessageToController(pongEvent);

    bc.postMessage(
      crossBrowserMessageMapper.toString(message)
    );
  };

  /**
   * Notify controller of my existance
   */
  const PongToControllerInternal = (event: RequestPongFromProjectorEvent) => {
    if ((event.eventType !== PongFromProjectorToControllerEventName || event.isExternalEvent)) return;
    console.log('shoul not fire')
    const message = new MessageToController(event);

    bc.postMessage(
      crossBrowserMessageMapper.toString(message)
    );
  };

  // const PongFromProjectorToControllerEventName = (event: RequestPongFromProjectorEvent) => {
  //   if ((event.eventType !== RequestPongFromProjectorEventName)) return;

  //   const pongEvent = new PongFromProjectorToControllerEvent(true);
  //   const message = new MessageToController(pongEvent);

  //   bc.postMessage(
  //     crossBrowserMessageMapper.toString(message)
  //   );
  // };





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
    PingReceivedFromController,
    RequestPongFromProjector,
    PongToControllerInternal
  ];
  return [arr];
};


export default useBroadcastMessageEventProcessor;


