import React, { createContext, useReducer } from 'react';
import '@blueprintjs/core/lib/css/blueprint.css';
import '@blueprintjs/icons/lib/css/blueprint-icons.css';
import '@blueprintjs/datetime/lib/css/blueprint-datetime.css';
import 'normalize.css/normalize.css';

import styled from 'styled-components/macro';
import AppRouter from './AppRouter';
import reducers from './Reducers/reducers';

const StyledApp = styled.div`
  background-color: #293742;
  height: 100%;
`;

const initialState = [];

export const Store = ({ children }) => {
  const [state, dispatch] = useReducer(reducers, initialState);

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
