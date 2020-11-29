import Schedule from './Schedule';
import { Song } from '../Domain/resource';
import { Settings } from './Settings';

export interface State {
  currentSchedule: Schedule;
  settings: Settings;
}
