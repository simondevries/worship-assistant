import AppEvent from './appEvent';

export const ProjectorWindowClosedEventName = 'ProjectorWindowClosedEventName';

export default class ProjectorWindowClosedEvent extends AppEvent {
  constructor(isExternalEvent) {
    super(ProjectorWindowClosedEventName, isExternalEvent);
  }
}
