import AppEvent from './appEvent';
import ISong from '../../Interfaces/Song';

export const AddActiveVideoEventName = 'AddActiveVideoEventName';

export default class extends AppEvent {
  resourceId: any;
  url: any;
  constructor(isExternalEvent, resourceId, url) {
    super(AddActiveVideoEventName, isExternalEvent);
    this.resourceId = resourceId;
    this.url = url;
  }
}
