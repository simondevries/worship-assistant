import AppEvent from './appEvent';
import Song from '../../Interfaces/Song';
import Schedule from '../../Interfaces/Schedule';

export const NewScheduleCreatedEventName = 'NewScheduleCreatedEvent';

export default class extends AppEvent {
  schedule: Schedule;
  constructor(isExternalEvent, schedule) {
    super(NewScheduleCreatedEventName, isExternalEvent);
    this.schedule = schedule;
  }
}
