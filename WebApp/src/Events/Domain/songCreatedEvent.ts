import AppEvent from './appEvent';
import Song from '../../Interfaces/Song';

export const SongCreated = 'SongCreated';

export default class extends AppEvent {
  song: Song;
  addToSchedule: any;
  source: any;
  constructor(isExternalEvent, song, addToSchedule) {
    super(SongCreated, isExternalEvent);
    this.song = song;
    this.addToSchedule = addToSchedule;
  }
}
