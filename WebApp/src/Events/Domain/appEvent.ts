export default class AppEvent {
  // todo (sdv) move id to app event


  /**
   * Does this event originate from this window?
   */
  isExternalEvent: boolean;

  eventType: string;
  constructor(eventType: string, isExternalEvent: boolean) {
    this.eventType = eventType;
    this.isExternalEvent = isExternalEvent;
  }


}
