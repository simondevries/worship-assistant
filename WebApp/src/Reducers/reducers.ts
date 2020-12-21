import State from '../Interfaces/State';
import SongResourceReference from '../Interfaces/SongResourceReference';

function reducers(state: State, action) {
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
        resources: state.currentSchedule.resources.concat({
          id: action.payload.id,
          resourceType: 'SONG',
        } as SongResourceReference),
      };

      return { ...state, currentSchedule: updatedSchedule };

    case 'setActiveSongs':
      return {
        ...state,
        currentSchedule: {
          ...state.currentSchedule,
          activeSongs: action.payload,
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
        },
      };

    // Settings
    case 'setSettings':
      return { ...state, settings: action.payload };

    // Search
    case 'setSearchVisible':
      return { ...state, isSearchVisible: action.payload };

    default:
      throw new Error();
  }
}

export default reducers;
