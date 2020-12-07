import AppEvent from './appEvent';
import Song from '../../Interfaces/Song';

export const SongCreatedEventName = 'SongCreated';

export default class extends AppEvent {
  song: Song;
  source: any;
  constructor(isExternalEvent, song) {
    super(SongCreatedEventName, isExternalEvent);
    this.song = song;
  }
}
