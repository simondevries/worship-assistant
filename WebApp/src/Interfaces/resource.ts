import { ITheme } from './themes';

export default interface IResource {
  id: string;
  resourceType: string;
  theme?: ITheme;
}

