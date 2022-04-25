import { ProjectorViewMode } from 'Interfaces/Schedule';
import AppEvent from './appEvent';

export const ChangeProjectorModeEventName =
  'ChangeProjectorModeEvent';

class ChangeProjectorModeEvent extends AppEvent {
  color: string | undefined = '';
  projectorMode: ProjectorViewMode;
  constructor(isExternalEvent, projectorMode, color) {
    super(ChangeProjectorModeEventName, isExternalEvent);
    this.color = color;
    this.projectorMode = projectorMode;
  }
}

export default ChangeProjectorModeEvent;
