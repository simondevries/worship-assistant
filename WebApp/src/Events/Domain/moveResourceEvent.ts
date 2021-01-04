import AppEvent from './appEvent';
import ISong from '../../Interfaces/Song';
import { defaultSongTheme, ITheme } from '../../Interfaces/themes';

export const MoveResourceEventName = 'MoveResourceUp';

export default class extends AppEvent {
  id: string; // todo (sdv) move id to app event
  direction: number;
  constructor(isExternalEvent, id, direction) {
    super(MoveResourceEventName, isExternalEvent);
    this.id = id;
    this.direction = direction;
  }
}
