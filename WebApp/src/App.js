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
  schedule: {
    resources: [
      {
        id: NewId(),
        index: 0,
        properties: { title: 'How great thou art' },
        lyrics: [
          { content: 'Slide 1' },
          { content: 'Slide 2' },
          { content: 'Slide 3' },
        ],
      },
    ],
    active: {},
  },
  isSearchVisible: false,
};

function reducer(state, action) {
  switch (action.type) {
    case 'addResource':
      const updatedPayload = {
        ...action.payload,
        index: state.schedule.resources.length,
      };

      return {
        schedule: {
          ...state.schedule,
          resources: state.schedule.resources.concat(updatedPayload),
        },
      };
    case 'moveResource':
      return { count: state.count - 1 };
    case 'removeResource':
      return { count: state.count - 1 };
    case 'setSearchVisible':
      return { ...state, isSearchVisible: action.payload };
    default:
      throw new Error();
  }
}

export const Store = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

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
