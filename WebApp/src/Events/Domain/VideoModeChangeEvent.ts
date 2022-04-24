import AppEvent from './appEvent';

export const VideoModeChangeEventName = 'VideoModeChange';

export default class VideoModeChangeEvent extends AppEvent {
  action: string;
  resourceId: string;

  constructor(isExternalEvent, action, resourceId) {
    super(VideoModeChangeEventName, isExternalEvent);
    this.action = action;
    this.resourceId = resourceId;
  }
}
