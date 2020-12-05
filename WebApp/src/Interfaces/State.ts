import Schedule from './Schedule';
import { Settings } from './Settings';

export interface State {
  currentSchedule: Schedule;
  settings: Settings;
}
