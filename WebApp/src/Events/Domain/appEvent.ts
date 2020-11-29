export default class AppEvent {
  isExternalEvent: boolean;
  eventType: any;
  constructor(eventType: string, isExternalEvent: boolean) {
    this.eventType = eventType;
    this.isExternalEvent = isExternalEvent;
  }
}
