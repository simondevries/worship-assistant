import { ProjectorDimensionsMessage, projectorDimensionsMessageKey } from 'Interfaces/projectorDimensionsMessage';
import AppEvent from './appEvent';

export const PingToControllerEventKey = projectorDimensionsMessageKey;

class PingToControllerEvent extends AppEvent {
  projectorDimensionsMessage: ProjectorDimensionsMessage;

  constructor(isExternalEvent, projectorDimensionsMessage: ProjectorDimensionsMessage) {
    super(PingToControllerEventKey, isExternalEvent);
    this.projectorDimensionsMessage = projectorDimensionsMessage;
  }
}

export default PingToControllerEvent;
