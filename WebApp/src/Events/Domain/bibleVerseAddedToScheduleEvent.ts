import AppEvent from './appEvent';
import BibleVerse from '../../Interfaces/BibleVerse';

export const BibleVerseAddedToScheduleEventName =
  'BibleVerseAddedToSchedule';

export default class extends AppEvent {
  bibleVerse: BibleVerse;
  constructor(isExternalEvent, bibleVerse) {
    super(BibleVerseAddedToScheduleEventName, isExternalEvent);
    this.bibleVerse = bibleVerse;
  }
}
