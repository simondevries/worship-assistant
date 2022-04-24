import AppEvent from './appEvent';

export const MoveResourceEventName = 'MoveResourceUp';

export default class MoveResourceEvent extends AppEvent {
  id: string; // todo (sdv) move id to app event
  direction: number;
  constructor(isExternalEvent, id, direction) {
    super(MoveResourceEventName, isExternalEvent);
    this.id = id;
    this.direction = direction;
  }
}
