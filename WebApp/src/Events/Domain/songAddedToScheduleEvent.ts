import AppEvent from './appEvent';
import Song from '../../Interfaces/Song';

export const SongAddedToScheduleEventName = 'SongAddedToSchedule';

export default class extends AppEvent {
  index: number;
  song: Song;
  constructor(index, isExternalEvent, song) {
    super(SongAddedToScheduleEventName, isExternalEvent);
    this.index = index;
    this.song = song;
  }
}
