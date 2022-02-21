import { UpdateSettingsEventName } from './../Domain/updateSettingsEvent';
import { Type } from './../../Components/Dialogs/ImageSelectionDialog/ImageResult';
import { songsRepo } from '../../Storage/songsRepository';
import { scheduleRepo } from '../../Storage/scheduleRepository';
import { settingsRepo } from '../../Storage/settingsRepository';
import { useContext } from 'react';
import SongCreatedEvent, {
  SongCreatedEventName,
} from '../Domain/songCreatedEvent';
import { Context } from '../../Common/Store/Store';
import SongAddedToSchedule, {
  SongAddedToScheduleEventName,
} from '../Domain/songAddedToScheduleEvent';
import NewScheduleCreatedEvent, {
  NewScheduleCreatedEventName,
} from '../Domain/newScheduleCreatedEvent';
import SlideShowAddedToScheduleEvent, {
  SlideShowAddedToScheduleEventName,
} from '../Domain/slideShowAddedToScheduleEvent';
import MoveResourceEvent, {
  MoveResourceEventName,
} from '../Domain/moveResourceEvent';
import reducers from '../../Reducers/reducers';
import IState from '../../Interfaces/State';
import RemoveResourceFromScheduleEvent, {
  RemoveResourceFromScheduleEventName,
} from '../Domain/removeResourceFromScheduleEvent';
import newId from '../../Helpers/newId';
import BibleVerseAddedToScheduleEvent, {
  BibleVerseAddedToScheduleEventName,
} from '../Domain/bibleVerseAddedToScheduleEvent';
import videoCreatedEvent, {
  VideoCreatedEventName,
} from '../Domain/videoCreatedEvent';
import LoadScheduleEvent, {
  LoadScheduleEventName,
} from '../Domain/loadScheduleEvent';
import SongEditedEvent, {
  SongEditedEventEventName,
} from '../Domain/songEditedEvent';
import { userFileHandlerRepo } from '../../Storage/userFileHandlerRepository';
import UpdateSettingsEvent from 'Events/Domain/updateSettingsEvent';

const useIndexDbEventProcessor = () => {
  const [state, dispatch] = useContext(Context);

  const SongCreatedEventHandler = (event: SongCreatedEvent) => {
    if (
      event.eventType !== SongCreatedEventName ||
      event.isExternalEvent
    )
      return;

    songsRepo.add(event.song, event.song.id);
  };

  const SongAddedToScheduleEventHandler = (
    event: SongAddedToSchedule,
  ) => {
    if (
      event.eventType !== SongAddedToScheduleEventName ||
      event.isExternalEvent
    )
      return;

    const updatedState = reducers(state, {
      type: 'addResourceToSchedule',
      payload: {
        id: event.song.id,
        resourceType: 'SONG',
        index: event.index,
      },
    });

    scheduleRepo.set(
      updatedState.currentSchedule,
      updatedState.currentSchedule.id,
    );
  };

  const SongEditedEventHandler = (event: SongEditedEvent) => {
    if (
      event.eventType !== SongEditedEventEventName ||
      event.isExternalEvent
    )
      return;

    songsRepo.set(event.song, event.song.id);
  };

  const SlideShowAddedToScheduleEventHandler = (
    event: SlideShowAddedToScheduleEvent,
  ) => {
    if (
      event.eventType !== SlideShowAddedToScheduleEventName ||
      event.isExternalEvent
    )
      return;

    const updatedState = reducers(state, {
      type: 'addResourceToSchedule',
      payload: {
        id: event.id,
        resourceType: 'SLIDESHOW',
        embeddedPowerPointUrl: event.embeddedPowerPointUrl,
      },
    });

    scheduleRepo.set(
      updatedState.currentSchedule,
      updatedState.currentSchedule.id,
    );
  };

  const NewScheduleCreatedEventHandler = (
    event: NewScheduleCreatedEvent,
  ) => {
    if (
      event.eventType !== NewScheduleCreatedEventName ||
      event.isExternalEvent
    )
      return;

    scheduleRepo.add(event.schedule, event.schedule.id);

    settingsRepo.setCurrentService(event.schedule.id);
  };

  const MoveResourceEventHandler = (event: MoveResourceEvent) => {
    if (
      event.eventType !== MoveResourceEventName ||
      event.isExternalEvent
    )
      return;

    const updatedState: IState = reducers(state, {
      type: 'moveResourcePosition',
      payload: { id: event.id, direction: event.direction },
    });

    scheduleRepo.set(
      updatedState.currentSchedule,
      updatedState.currentSchedule.id,
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

    const updatedState = reducers(state, {
      type: 'removeResourceFromSchedule',
      payload: event.id,
    });

    scheduleRepo.set(
      updatedState.currentSchedule,
      updatedState.currentSchedule.id,
    );
  };

  const BibleVerseAddedToScheduleEventHandler = (
    event: BibleVerseAddedToScheduleEvent,
  ) => {
    if (
      event.eventType !== BibleVerseAddedToScheduleEventName ||
      event.isExternalEvent
    )
      return;

    const updatedState = reducers(state, {
      type: 'addResourceToSchedule',
      payload: {
        ...event.bibleVerse,
        id: newId(),
        resourceType: 'BIBLEVERSE',
        index: event.index,
      },
    });

    scheduleRepo.set(
      updatedState.currentSchedule,
      updatedState.currentSchedule.id,
    );
  };

  const VideoCreatedEventHandler = (event: videoCreatedEvent) => {
    if (
      event.eventType !== VideoCreatedEventName ||
      event.isExternalEvent
    )
      return;

    const updatedState = reducers(state, {
      type: 'addResourceToSchedule',
      payload: {
        resourceType: 'VIDEO',
        index: event.index,
        id: event.id,
      },
    });

    scheduleRepo.set(
      updatedState.currentSchedule,
      updatedState.currentSchedule.id,
    );

    userFileHandlerRepo.set(event.fileHandle, event.id);
  };

  const LoadScheduleEventHandler = (event: LoadScheduleEvent) => {
    if (
      event.eventType !== LoadScheduleEventName ||
      event.isExternalEvent
    )
      return;

    dispatch({
      type: 'setCurrentSchedule',
      payload: event.schedule,
    });
    // settingsRepo.setCurrentService(schedule.id);
  };

  const UpdateSettingsEventHandler = (event: UpdateSettingsEvent) => {

    const shouldContinue = event.eventType === UpdateSettingsEventName;

    if (!shouldContinue) return;

    settingsRepo.set(event.settings, 'settings');
  }

  const arr = [
    VideoCreatedEventHandler,
    SongCreatedEventHandler,
    SongAddedToScheduleEventHandler,
    NewScheduleCreatedEventHandler,
    MoveResourceEventHandler,
    RemoveResourceFromScheduleEventHandler,
    SongEditedEventHandler,
    SlideShowAddedToScheduleEventHandler,
    BibleVerseAddedToScheduleEventHandler,
    LoadScheduleEventHandler,
    UpdateSettingsEventHandler];
  return [arr];
};

export default useIndexDbEventProcessor;
