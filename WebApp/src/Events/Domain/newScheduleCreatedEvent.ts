import AppEvent from './appEvent';
import ISong from '../../Interfaces/Song/Song';
import ISchedule from '../../Interfaces/Schedule';

export const NewScheduleCreatedEventName = 'NewScheduleCreatedEvent';

class NewScheduleCreatedEvent extends AppEvent {
  schedule: ISchedule;
  constructor(isExternalEvent, schedule) {
    super(NewScheduleCreatedEventName, isExternalEvent);
    this.schedule = schedule;
  }
}
export default NewScheduleCreatedEvent;
