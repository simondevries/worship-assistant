
import { ProjectorDimensionsMessage, projectorDimensionsMessageKey } from 'Interfaces/projectorDimensionsMessage';
import AppEvent from './appEvent';


export const PongFromProjectorToControllerEventName =
  'PongFromProjectorToControllerEventName';

class PongFromProjectorToControllerEvent extends AppEvent {
  projectorDimensionsMessage: ProjectorDimensionsMessage;

  constructor(isExternalEvent) {
    super(PongFromProjectorToControllerEventName, isExternalEvent);

    this.projectorDimensionsMessage = {
      height: window.innerHeight,
      width: window.innerWidth,
      message: projectorDimensionsMessageKey,
    } as ProjectorDimensionsMessage;
  }
}

export default PongFromProjectorToControllerEvent;
