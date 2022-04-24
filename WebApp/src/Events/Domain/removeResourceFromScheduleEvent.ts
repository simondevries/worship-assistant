import AppEvent from './appEvent';

export const RemoveResourceFromScheduleEventName =
  'RemoveResourceFromScheduleEventName';

export default class RemoveResourceFromScheduleEvent extends AppEvent {
  id: number;
  constructor(isExternalEvent, id) {
    super(RemoveResourceFromScheduleEventName, isExternalEvent);
    this.id = id;
  }
}
