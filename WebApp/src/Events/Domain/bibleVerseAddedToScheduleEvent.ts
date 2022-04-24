import AppEvent from './appEvent';
import BibleVerse from '../../Interfaces/BibleVerse';

export const BibleVerseAddedToScheduleEventName =
  'BibleVerseAddedToSchedule2';

export default class BibleVerseAddedToScheduleEvent extends AppEvent {
  bibleVerse: BibleVerse;
  index: number;
  constructor(isExternalEvent, bibleVerse, index) {
    super(BibleVerseAddedToScheduleEventName, isExternalEvent);
    this.bibleVerse = bibleVerse;
    this.index = index;
  }
}
