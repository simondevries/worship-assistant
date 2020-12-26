export default class AppEvent {
  isExternalEvent: boolean; // External to what?
  eventType: any;
  constructor(eventType: string, isExternalEvent: boolean) {
    this.eventType = eventType;
    this.isExternalEvent = isExternalEvent;
  }
}
