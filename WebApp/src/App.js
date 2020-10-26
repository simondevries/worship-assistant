import React, { createContext, useReducer, useEffect } from 'react';
import '@blueprintjs/core/lib/css/blueprint.css';
import '@blueprintjs/icons/lib/css/blueprint-icons.css';
import '@blueprintjs/datetime/lib/css/blueprint-datetime.css';
import 'normalize.css/normalize.css';

import styled from 'styled-components/macro';
import NewId from './Helpers/newId';
import AppRouter from './AppRouter';
import hotkeyListenter from './Components/Sidebar/hotkeyListenter';

const StyledApp = styled.div`
  background-color: #293742;
  height: 100%;
`;

const initialState = {
  isSearchVisible: false,
};

function reducer(state, action) {
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

    case 'moveResource':
      return { count: state.count - 1 };
    case 'removeResource':
      return { count: state.count - 1 };

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

export const Store = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  console.log('state', state);
  return (
    <Context.Provider value={[state, dispatch]}>
      {children}
    </Context.Provider>
  );
};

export const Context = createContext(initialState);

function App() {
  return (
    <StyledApp className="bp3-dark">
      <Store>
        <AppRouter />
      </Store>
    </StyledApp>
  );
}

export default App;
