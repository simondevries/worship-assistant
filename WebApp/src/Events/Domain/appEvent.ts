export default class AppEvent {
  // todo (sdv) move id to app event
  isExternalEvent: boolean;
  eventType: any;
  constructor(eventType: string, isExternalEvent: boolean) {
    this.eventType = eventType;
    this.isExternalEvent = isExternalEvent;
  }
}
