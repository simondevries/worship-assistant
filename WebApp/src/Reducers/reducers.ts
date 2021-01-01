import IState from '../Interfaces/State';
import ISongResourceReference from '../Interfaces/SongResourceReference';

function reducers(state: IState, action): IState {
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

      return { ...state, currentSchedule: updatedSchedule };

    case 'hasProjectorsAttached':
      return {
        ...state,
        hasProjectorsAttached: true,
      };

    case 'setActiveSongs':
      return {
        ...state,
        currentSchedule: {
          ...state.currentSchedule,
          activeSongs: action.payload,
        },
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

    case 'removeResourceFromSchedule':
      console.log('RemoveResourceFromScheduleEventHandler');

      return {
        ...state,
        currentSchedule: {
          ...state.currentSchedule,
          resources: state.currentSchedule.resources.filter(
            (r) => r.id !== action.id,
          ),
          resourceOrder: state.currentSchedule.resourceOrder.filter(
            (ro) => ro !== action.id,
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

    default:
      throw new Error();
  }
}

export default reducers;
