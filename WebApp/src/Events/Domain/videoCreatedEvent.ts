import AppEvent from './appEvent';

export const VideoCreatedEventName = 'VideoCreated';

export default class extends AppEvent {
  blobUrl: string;
  source: any;
  constructor(isExternalEvent, blobUrl) {
    super(VideoCreatedEventName, isExternalEvent);
    this.blobUrl = blobUrl;
  }
}
