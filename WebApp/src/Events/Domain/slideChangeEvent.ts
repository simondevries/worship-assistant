import AppEvent from './appEvent';
import ISong from '../../Interfaces/Song';

export const SlideChangedEventName = 'SlideChangedEventName';

export default class extends AppEvent {
  resourceId: any;
  slideIndex: any;
  constructor(isExternalEvent, resourceId, slideIndex) {
    super(SlideChangedEventName, isExternalEvent);
    this.resourceId = resourceId;
    this.slideIndex = slideIndex;
  }
}
