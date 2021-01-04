import AppEvent from './appEvent';

export const VideoCreatedEventName = 'VideoCreated';

export default class extends AppEvent {
  id: string;
  index: number;
  constructor(isExternalEvent, id, index) {
    super(VideoCreatedEventName, isExternalEvent);
    this.id = id;
    this.index = index;
  }
}
