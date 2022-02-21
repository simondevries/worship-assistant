import AppEvent from './appEvent';


export const PingProjectorEventName =
  'PingProjectorEventName';

class PingProjectorEvent extends AppEvent {

  constructor(isExternalEvent) {
    super(PingProjectorEventName, isExternalEvent);
  }
}

export default PingProjectorEvent;
