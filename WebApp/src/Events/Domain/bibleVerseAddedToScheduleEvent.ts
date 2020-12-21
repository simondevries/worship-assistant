import AppEvent from './appEvent';
import BibleVerse from '../../Interfaces/BibleVerse';

export const BibleVerseAddedToScheduleEventName =
  'BibleVerseAddedToSchedule';

export default class extends AppEvent {
  index: number;
  bibleVerse: BibleVerse;
  constructor(index, isExternalEvent, bibleVerse) {
    super(BibleVerseAddedToScheduleEventName, isExternalEvent);
    this.index = index;
    this.bibleVerse = bibleVerse;
  }
}
