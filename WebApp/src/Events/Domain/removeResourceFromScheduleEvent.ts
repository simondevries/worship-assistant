import AppEvent from './appEvent';
import Song from '../../Interfaces/Song/Song';

export const RemoveResourceFromScheduleEventName =
  'RemoveResourceFromScheduleEventName';

export default class extends AppEvent {
  id: number;
  constructor(isExternalEvent, id) {
    super(RemoveResourceFromScheduleEventName, isExternalEvent);
    this.id = id;
  }
}
