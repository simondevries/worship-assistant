import AppEvent from './appEvent';

export const SlideShowAddedToScheduleEventName =
  'SlideShowAddedToSchedule';

export default class SlideShowAddedToScheduleEvent extends AppEvent {
  embeddedPowerPointUrl: string;
  id: string; // todo (sdv) move id to app event
  constructor(id, index, isExternalEvent, embeddedPowerPointUrl) {
    super(SlideShowAddedToScheduleEventName, isExternalEvent);
    this.embeddedPowerPointUrl = embeddedPowerPointUrl;
    this.id = id;
  }
}
