import AppEvent from './appEvent';
import ISong from '../../Interfaces/Song/Song';
import { defaultSongTheme, ITheme } from '../../Interfaces/themes';

export const VideoMoodeChangeEventName = 'VideoMoodeChange';

export default class extends AppEvent {
  action: string;
  resourceId: string;

  constructor(isExternalEvent, action, resourceId) {
    super(VideoMoodeChangeEventName, isExternalEvent);
    this.action = action;
    this.resourceId = resourceId;
  }
}
