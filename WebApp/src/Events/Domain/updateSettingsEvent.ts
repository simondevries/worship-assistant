import { ISettings } from './../../Interfaces/Settings';
import AppEvent from './appEvent';

export const UpdateSettingsEventName =
  'UpdateSettingsEvent';

class UpdateSettingsEvent extends AppEvent {
  settings: ISettings;

  constructor(isExternalEvent, settings) {
    super(UpdateSettingsEventName, isExternalEvent);
    this.settings = settings;
  }
}

export default UpdateSettingsEvent;
