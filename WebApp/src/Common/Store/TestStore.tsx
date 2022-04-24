import React, { useReducer } from 'react';
import '@blueprintjs/core/lib/css/blueprint.css';
import '@blueprintjs/icons/lib/css/blueprint-icons.css';
import '@blueprintjs/datetime/lib/css/blueprint-datetime.css';
import 'normalize.css/normalize.css';

import reducers from '../../Reducers/reducers';
import { CurrentScheduleBuilder } from '../../testBuilders/currentScheduleBuilder';
import { Context } from './Store';

const initialState = {
  currentSchedule: new CurrentScheduleBuilder().build(),
};

export default ({ children }) => {
  const [state, dispatch] = useReducer<any>(reducers, initialState);

  // console.log('state', { state });

  return (
    <Context.Provider value={[state, dispatch]}>
      {children}
    </Context.Provider>
  );
};
