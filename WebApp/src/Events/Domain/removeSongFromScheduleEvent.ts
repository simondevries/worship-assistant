import AppEvent from './appEvent';
import Song from '../../Interfaces/Song';

export const RemoveSongFromScheduleEventName =
  'removeSongFromScheduleEventName';

export default class extends AppEvent {
  resourceIndex: number;
  constructor(isExternalEvent, resourceIndex) {
    super(RemoveSongFromScheduleEventName, isExternalEvent);
    this.resourceIndex = resourceIndex;
  }
}
