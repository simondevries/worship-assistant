import AppEvent from './appEvent';
import ISchedule from '../../Interfaces/Schedule';

export const LoadScheduleEventName = 'LoadScheduleEventName';

export default class LoadScheduleEvent extends AppEvent {
  schedule: ISchedule;
  constructor(isExternalEvent, schedule) {
    super(LoadScheduleEventName, isExternalEvent);
    this.schedule = schedule;
  }
}
