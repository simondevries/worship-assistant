import AppEvent from './appEvent';
import ISong from '../../Interfaces/Song';
import ISchedule from '../../Interfaces/Schedule';

export const LoadScheduleEventName = 'LoadScheduleEventName';

export default class extends AppEvent {
  schedule: ISchedule;
  constructor(isExternalEvent, schedule) {
    super(LoadScheduleEventName, isExternalEvent);
    this.schedule = schedule;
  }
}
