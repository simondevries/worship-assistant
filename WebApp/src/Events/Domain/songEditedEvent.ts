import AppEvent from './appEvent';
import ISong from '../../Interfaces/Song/Song';
import { defaultTheme, ITheme } from '../../Interfaces/themes';

export const SongEditedEventEventName = 'SongEditedEvent';

export default class extends AppEvent {
  index: number;
  song: ISong;
  theme: ITheme;
  constructor(
    index,
    isExternalEvent,
    song,
    theme = defaultTheme,
  ) {
    super(SongEditedEventEventName, isExternalEvent);
    this.index = index;
    this.song = song;
    this.theme = theme;
  }
}
