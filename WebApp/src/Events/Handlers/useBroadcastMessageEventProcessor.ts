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
    // todo remoev song
    bc.postMessage(
      JSON.stringify({ ...event, isExternalEvent: true }),
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
  ];
  return [arr];
};
