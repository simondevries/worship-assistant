import Schedule from './Schedule';
import { Settings } from './Settings';

export default interface State {
  currentSchedule: Schedule;
  settings: Settings;
}
