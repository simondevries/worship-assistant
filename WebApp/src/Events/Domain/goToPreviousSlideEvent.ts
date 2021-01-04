import AppEvent from './appEvent';
import ISong from '../../Interfaces/Song';

export const GoToPreviousSlideEventName =
  'GoToPreviousSlideEventName';

export default class extends AppEvent {
  constructor(isExternalEvent) {
    super(GoToPreviousSlideEventName, isExternalEvent);
  }
}
