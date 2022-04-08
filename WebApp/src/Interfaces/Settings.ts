import newId from "Helpers/newId";
import { defaultTheme, ITheme } from "./themes";

export interface ISettings {
  currentSchemaVersion: number;
  currentScheduleId: string;
  globalSlideTheme: ITheme;
  projectorScreenDimensions: IProjectorScreenDimensions;
}

export interface IProjectorScreenDimensions {
  width: number;
  height: number
}

export const defaultSettings: ISettings = {
  currentSchemaVersion: 0.1,
  currentScheduleId: newId(),
  globalSlideTheme: defaultTheme,
  projectorScreenDimensions: { width: 500, height: 500 }
}