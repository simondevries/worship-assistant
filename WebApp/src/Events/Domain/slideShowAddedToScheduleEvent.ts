import AppEvent from './appEvent';
import ISong from '../../Interfaces/Song/Song';
import { defaultTheme, ITheme } from '../../Interfaces/themes';

export const SlideShowAddedToScheduleEventName =
  'SlideShowAddedToSchedule';

export default class extends AppEvent {
  embeddedPowerPointUrl: string;
  id: string; // todo (sdv) move id to app event
  constructor(id, index, isExternalEvent, embeddedPowerPointUrl) {
    super(SlideShowAddedToScheduleEventName, isExternalEvent);
    this.embeddedPowerPointUrl = embeddedPowerPointUrl;
    this.id = id;
  }
}
