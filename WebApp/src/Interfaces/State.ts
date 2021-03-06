import ISchedule from './Schedule';
import { ISettings } from './Settings';
import ISearchBar from './SearchBar';

export default interface IState {
  currentSchedule: ISchedule;
  settings: ISettings;
  hasProjectorsAttached: boolean;
  searchBar: ISearchBar;
  navigationArrowKeysEnabled: boolean; // determins whether the arrow key should change the slide
}
