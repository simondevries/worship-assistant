import AppEvent from './appEvent';
import ISong from '../../Interfaces/Song/Song';
import { defaultTheme, ITheme } from '../../Interfaces/themes';

export const SongAddedToScheduleEventName = 'SongAddedToSchedule';

export default class extends AppEvent {
  index: number;
  song: ISong;
  theme: ITheme;
  constructor(index, isExternalEvent, song, theme = defaultTheme) {
    super(SongAddedToScheduleEventName, isExternalEvent);
    this.index = index;
    this.song = song;
    this.theme = theme;
  }
}
