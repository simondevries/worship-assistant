import React, { createContext, useReducer } from 'react';
import '@blueprintjs/core/lib/css/blueprint.css';
import '@blueprintjs/icons/lib/css/blueprint-icons.css';
import '@blueprintjs/datetime/lib/css/blueprint-datetime.css';
import 'normalize.css/normalize.css';

import reducers from '../../Reducers/reducers';

// An array that holds two items, state and dispatch function
const initialState = [];

export const Context = createContext<any>(initialState);

export const Store = ({ children }) => {
  const [state, dispatch] = useReducer<any>(reducers, initialState);

  // console.log('state', { state });

  return (
    <Context.Provider value={[state, dispatch]}>
      {children}
    </Context.Provider>
  );
};
