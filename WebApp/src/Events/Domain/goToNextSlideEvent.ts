import AppEvent from './appEvent';
import ISong from '../../Interfaces/Song';

export const GoToNextSlideEventName = 'GoToNextSlideEventName';

export default class extends AppEvent {
  constructor(isExternalEvent) {
    super(GoToNextSlideEventName, isExternalEvent);
  }
}
