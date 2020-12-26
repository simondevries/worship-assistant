import AppEvent from './appEvent';
import ISong from '../../Interfaces/Song';
import ISchedule from '../../Interfaces/Schedule';

export const NewScheduleCreatedEventName = 'NewScheduleCreatedEvent';

export default class extends AppEvent {
  schedule: ISchedule;
  constructor(isExternalEvent, schedule) {
    super(NewScheduleCreatedEventName, isExternalEvent);
    this.schedule = schedule;
  }
}
