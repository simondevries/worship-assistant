import AppEvent from './appEvent';

export const ProjectorWindowClosedEventName = 'ProjectorWindowClosedEventName';

export default class extends AppEvent {
  constructor(isExternalEvent) {
    super(ProjectorWindowClosedEventName, isExternalEvent);
  }
}
