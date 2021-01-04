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
import videoCreatedEvent, {
  VideoCreatedEventName,
} from '../Domain/videoCreatedEvent';
import LoadScheduleEvent, {
  LoadScheduleEventName,
} from '../Domain/loadScheduleEvent';
import SlideChangeEvent, {
  SlideChangedEventName,
} from '../Domain/slideChangeEvent';

const useDomEventsProcessor = () => {
  const SlideChangeEventHandler = (event: SlideChangeEvent) => {
    if (event.eventType !== SlideChangedEventName) return;

    const element = document.getElementById(
      'slide' + event.slideIndex + 'resource' + event.resourceId,
    );
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
        inline: 'center',
      });
    } else {
      console.error('Could not find slide');
    }

    setTimeout(() => {
      const element = document.getElementById(
        'focusable-object--' + event.resourceId,
      );
      if (!element) {
        console.warn('Could not find focusable object!');
        return;
      }
      element?.focus();
    }, 1000);
  };

  const arr = [SlideChangeEventHandler];
  return [arr];
};

export default useDomEventsProcessor;
