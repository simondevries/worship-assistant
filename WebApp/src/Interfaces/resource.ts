import { ITheme } from './themes';
import NewId from '../Helpers/newId';
import IResourceReference, { ResourceType } from './ResourceReference';
import IState from './State';

export default interface IResource {
  id: string;
  resourceType: ResourceType;
  theme?: ITheme;
}

const selectors = {
  getResource: (id: string, resources: IResourceReference[]) => {
    return resources.find((r) => r.id === id);
  },
  getTitle: (state: IState, resource: IResource) => {
    if (!resource || !resource.resourceType) {
      return '';
    }

    switch (resource.resourceType) {
      case 'SONG':
        const song = state.currentSchedule.activeSongs.find(
          (s) => s.id === resource.id,
        );
        return song?.properties.title;
      case 'BIBLEVERSE':
        const bibleVerse = state.currentSchedule.resources.find(
          (s) => s.id === resource.id,
        );
        return bibleVerse?.passageReference;
      case 'VIDEO':
        const video = state.currentSchedule.resources.find(
          (s) => s.id === resource.id,
        );
        return (
          (video && video.videoTitle) || 'Video'
          // <input type="text" id="video-title" />
        );

      default:
        return '';
    }
  }
}

export const Resource = {
  selectors: selectors
};