import AppEvent from './appEvent';

export const GoToPreviousSlideEventName =
  'GoToPreviousSlideEventName';

export default class GoToPreviousSlideEvent extends AppEvent {
  constructor(isExternalEvent) {
    super(GoToPreviousSlideEventName, isExternalEvent);
  }
}
