import AppEvent from './appEvent';
import ISong from '../../Interfaces/Song/Song';
import { defaultTheme, ITheme } from '../../Interfaces/themes';

export const SongCreatedEventName = 'SongCreated';

export default class SongCreatedEvent extends AppEvent {
  song: ISong;
  source: any;
  theme: ITheme;
  constructor(isExternalEvent, song, theme = defaultTheme) {
    super(SongCreatedEventName, isExternalEvent);
    this.song = song;
    this.theme = theme;
  }
}
