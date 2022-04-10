import AppEvent from './appEvent';
import ISong from '../../Interfaces/Song/Song';

export const AddActiveImageEventName = 'AddActiveImageEventName';

export default class extends AppEvent {
  resourceId: any;
  url: any;
  constructor(isExternalEvent, resourceId, url) {
    super(AddActiveImageEventName, isExternalEvent);
    this.resourceId = resourceId;
    this.url = url;
  }
}
