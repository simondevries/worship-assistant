import ISchedule from './Schedule';
import { ISettings } from './Settings';

export default interface IState {
  currentSchedule: ISchedule;
  settings: ISettings;
  externalMonitors: IExternalMonitors[];
}

export interface IExternalMonitors {
  windowReference: any;
  type: string;
}
