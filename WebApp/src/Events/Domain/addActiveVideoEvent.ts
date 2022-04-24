import AppEvent from './appEvent';

export const AddActiveVideoEventName = 'AddActiveVideoEventName';

export default class AddActiveVideoEvent extends AppEvent {
  resourceId: any;
  url: any;
  constructor(isExternalEvent, resourceId, url) {
    super(AddActiveVideoEventName, isExternalEvent);
    this.resourceId = resourceId;
    this.url = url;
  }
}
