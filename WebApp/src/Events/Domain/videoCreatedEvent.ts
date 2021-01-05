import AppEvent from './appEvent';

export const VideoCreatedEventName = 'VideoCreated';

export default class extends AppEvent {
  id: string;
  index: number;
  fileHandle: any;
  constructor(isExternalEvent, id, index, fileHandle) {
    super(VideoCreatedEventName, isExternalEvent);
    this.id = id;
    this.index = index;
    this.fileHandle = fileHandle;
  }
}
