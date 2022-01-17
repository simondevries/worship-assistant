import IState from '../Interfaces/State';
import ISongResourceReference from '../Interfaces/SongResourceReference';

export interface ReducerAction {
  payload: any;
  type: string
}

export interface SetCurrentProjectorSizeAction extends ReducerAction {
  payload: { width: number, height: number },
  type: 'setCurrentProjectorSize'
}

function reducers(state: IState, action: ReducerAction): IState {
  switch (action.type) {
    // Resources
    // case 'addResource':
    //   const updatedResources = {
    //     ...action.payload,
    //     index: state.currentSchedule.resources.length,
    //   };

    //   const updatedSchedule = {
    //     ...state.currentSchedule,
    //     resources: state.currentSchedule.resources.concat(
    //       updatedResources,
    //     ),
    //   };

    //   const updatedState = {
    //     ...state,
    //     currentSchedule: updatedSchedule,
    //   };

    //   return updatedState;

    // case 'moveResource':
    //   return { count: state.count - 1 };

    // case 'removeResource':
    //   return { count: state.count - 1 };

    case 'setActiveResourcePointer':
      return {
        ...state,
        currentSchedule: {
          ...state.currentSchedule,
          activeResourcePointer: action.payload,
        },
      };

    // Schedule
    case 'setCurrentSchedule':
      return { ...state, currentSchedule: action.payload };

    case 'addResourceToSchedule':
      const updatedSchedule = {
        ...state.currentSchedule,
        resources: state.currentSchedule.resources.concat(
          action.payload,
        ),
        resourceOrder: [
          ...state.currentSchedule.resourceOrder.slice(
            0,
            action.payload.index + 1,
          ),
          action.payload.id,
          ...state.currentSchedule.resourceOrder.slice(
            action.payload.index + 1,
          ),
        ],
      };
      if (state.currentSchedule.activeResourcePointer.resourceId === null) {
        state.currentSchedule.activeResourcePointer.resourceId = action.payload.id;
      }
      return { ...state, currentSchedule: updatedSchedule };

    case 'editSong':
      return {
        ...state,
        currentSchedule: {
          ...state.currentSchedule,
          activeSongs: state.currentSchedule.activeSongs
            .filter((s) => s.id !== action.payload.id)
            .concat([action.payload]),
        },
      }
    case 'hasProjectorsAttached':
      return {
        ...state,
        hasProjectorsAttached: action.payload,

      };

    case 'moveResourcePosition':
      const resourceOrder =
        state?.currentSchedule?.resourceOrder || [];

      let currentPosition = resourceOrder.findIndex(
        (r) => r === action.payload.id,
      );

      currentPosition =
        currentPosition === -1
          ? resourceOrder.length
          : currentPosition;

      let updatedResourceOrder = resourceOrder.filter(
        (r) => r !== action.payload.id,
      );

      updatedResourceOrder.splice(
        action.payload.direction < 0
          ? currentPosition + action.payload.direction
          : currentPosition + action.payload.direction,
        0,
        action.payload.id,
      );

      return {
        ...state,
        currentSchedule: {
          ...state.currentSchedule,
          resourceOrder: updatedResourceOrder,
        },
      };

    // Active Songs

    case 'addSongToActiveSongs':
      const songs =
        (state.currentSchedule.activeSongs &&
          state.currentSchedule.activeSongs.filter(
            (s) =>
              s &&
              action &&
              action.payload &&
              s.id !== action.payload.id,
          )) ||
        [];

      return {
        ...state,
        currentSchedule: {
          ...state.currentSchedule,
          activeSongs: songs.concat(action.payload),
        },
      };

    case 'clearActiveSongs':
      return {
        ...state,
        currentSchedule: {
          ...state.currentSchedule,
          activeSongs: [],
        },
      };

    // Active Videos

    case 'addVideoToActiveVideos':
      const videos =
        (state.currentSchedule.activeVideos &&
          state.currentSchedule.activeVideos.filter(
            (s) =>
              s &&
              action &&
              action.payload &&
              s.id !== action.payload.id,
          )) ||
        [];

      return {
        ...state,
        currentSchedule: {
          ...state.currentSchedule,
          activeVideos: videos.concat(action.payload),
        },
      };

    case 'clearActiveVideos':
      return {
        ...state,
        currentSchedule: {
          ...state.currentSchedule,
          activeVideos: [],
        },
      };

    case 'removeResourceFromSchedule':

      return {
        ...state,
        currentSchedule: {
          ...state.currentSchedule,
          resources: state.currentSchedule.resources.filter(
            (r) => r.id !== action.payload,
          ),
          resourceOrder: state.currentSchedule.resourceOrder.filter(
            (ro) => ro !== action.payload,
          ),
        },
      } as IState;

    // Settings
    case 'setSettings':
      return { ...state, settings: action.payload };

    // Search
    case 'setSearchVisible':
      return {
        ...state,
        searchBar: {
          ...state.searchBar,
          isVisible: action.payload,
        },
      };

    case 'setInsertResourceAtIndex':
      return {
        ...state,
        searchBar: {
          ...state.searchBar,
          insertResourceAtIndex: action.payload,
        },
      };

    // Other
    case 'navigationArrowKeysEnabled':
      return { ...state, navigationArrowKeysEnabled: action.payload };

    default:
      throw new Error();

    case 'setCurrentProjectorSize':
      const sizeAction = action as SetCurrentProjectorSizeAction;
      return { ...state, settings: { ...state.settings, projectorScreenDimensions: { width: sizeAction.payload.width, height: sizeAction.payload.height } } }
  }
}

export default reducers;
