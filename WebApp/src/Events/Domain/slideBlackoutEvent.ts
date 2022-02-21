import AppEvent from './appEvent';

export const SlidedBlackoutEventName =
  'SlidedBlackoutEvent';

class SlideBlackoutEvent extends AppEvent {
  color: string = '';
  constructor(isExternalEvent, color) {
    super(SlidedBlackoutEventName, isExternalEvent);
    this.color = color;
  }
}

export default SlideBlackoutEvent;
