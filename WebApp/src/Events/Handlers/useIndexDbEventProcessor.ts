import { songsRepo } from '../../Storage/songsRepository';
import { scheduleRepo } from '../../Storage/scheduleRepository';
import { settingsRepo } from '../../Storage/settingsRepository';
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

const _handleScheduleUpdated = (state, inx, song) => {
  console.log('ns1', inx);
};

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
    if (event.eventType !== RemoveResourceFromScheduleEventName)
      return;

    const updatedState = reducers(state, {
      type: 'removeResourceFromSchedule',
      id: event.id,
    });

    scheduleRepo.set(
      updatedState.currentSchedule,
      updatedState.currentSchedule.id,
    );
  };

  const BibleVerseAddedToScheduleEventHandler = (
    event: BibleVerseAddedToScheduleEvent,
  ) => {
    if (event.eventType !== BibleVerseAddedToScheduleEventName)
      return;

    const updatedState = reducers(state, {
      type: 'addResourceToSchedule',
      payload: {
        ...event.bibleVerse,
        id: newId(),
        resourceType: 'BIBLEVERSE',
      },
    });

    scheduleRepo.set(
      updatedState.currentSchedule,
      updatedState.currentSchedule.id,
    );
  };

  const arr = [
    SongCreatedEventHandler,
    SongAddedToScheduleEventHandler,
    NewScheduleCreatedEventHandler,
    MoveResourceEventHandler,
    RemoveResourceFromScheduleEventHandler,
    SlideShowAddedToScheduleEventHandler,
    BibleVerseAddedToScheduleEventHandler,
  ];
  return [arr];
};

export default useIndexDbEventProcessor;
