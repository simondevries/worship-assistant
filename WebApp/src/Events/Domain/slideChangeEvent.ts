import AppEvent from './appEvent';
import ISong from '../../Interfaces/Song';

export const SlideChangedEventName = 'SlideChangedEventName';

export default class extends AppEvent {
  resourceIndex: any;
  slideIndex: any;
  constructor(isExternalEvent, resourceIndex, slideIndex) {
    super(SlideChangedEventName, isExternalEvent);
    this.resourceIndex = resourceIndex;
    this.slideIndex = slideIndex;
  }
}
