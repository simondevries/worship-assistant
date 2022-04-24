import AppEvent from './appEvent';

export const GoToNextSlideEventName = 'GoToNextSlideEventName';

export default class GoToNextSlideEvent extends AppEvent {
  constructor(isExternalEvent) {
    super(GoToNextSlideEventName, isExternalEvent);
  }
}
