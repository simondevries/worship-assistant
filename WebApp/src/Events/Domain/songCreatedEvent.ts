import AppEvent from './appEvent';
import ISong from '../../Interfaces/Song';
import { defaultSongTheme, ITheme } from '../../Interfaces/themes';

export const SongCreatedEventName = 'SongCreated';

export default class extends AppEvent {
  song: ISong;
  source: any;
  theme: ITheme;
  constructor(isExternalEvent, song, theme=defaultSongTheme) {
    super(SongCreatedEventName, isExternalEvent);
    this.song = song;
    this.theme = theme;
  }
}
