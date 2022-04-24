import AppEvent from './appEvent';

export const ImageCreatedEventName = 'ImageCreated';

export default class ImageCreatedEvent extends AppEvent {
  id: string;
  index: number;
  fileHandle: any;
  constructor(isExternalEvent, id, index, fileHandle) {
    super(ImageCreatedEventName, isExternalEvent);
    this.id = id;
    this.index = index;
    this.fileHandle = fileHandle;
  }
}
