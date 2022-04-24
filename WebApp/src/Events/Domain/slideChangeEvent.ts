import AppEvent from './appEvent';

export const SlideChangedEventName = 'SlideChangedEventName';

export default class SlideChangedEvent extends AppEvent {
  resourceId: any;
  slideIndex: any;
  constructor(isExternalEvent, resourceId, slideIndex) {
    // todo (sdv) ensure errors are handled well
    if (isNaN(slideIndex) || !resourceId)
      throw Error('Bad argument in slide change event constructor');

    super(SlideChangedEventName, isExternalEvent);
    this.resourceId = resourceId;
    this.slideIndex = slideIndex;
  }
}
