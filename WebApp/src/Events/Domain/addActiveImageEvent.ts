import AppEvent from './appEvent';

export const AddActiveImageEventName = 'AddActiveImageEventName';

export default class AddActiveImageEvent extends AppEvent {
  resourceId: any;
  url: any;
  constructor(isExternalEvent, resourceId, url) {
    super(AddActiveImageEventName, isExternalEvent);
    this.resourceId = resourceId;
    this.url = url;
  }
}
