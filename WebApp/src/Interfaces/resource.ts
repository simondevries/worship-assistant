import { ITheme } from './themes';
import NewId from '../Helpers/newId';

export default interface IResource {
  id: string;
  resourceType: string;
  theme?: ITheme;
}
