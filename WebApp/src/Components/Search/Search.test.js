import React, { useReducer, createContext } from 'react';
import { render } from '@testing-library/react';
import Search from './Search';
import reducers from '../../Reducers/reducers';

const initialState = {
  currentSchedule: { foo: 'bar' },
};

export const Context = createContext(initialState);

const MockContext = ({ children }) => {
  const [state, dispatch] = useReducer(reducers, initialState);

  return (
    <Context.Provider value={[state, dispatch]}>
      {children}
    </Context.Provider>
  );
};

test('Should render search', () => {
  const { getByText } = render(
    <MockContext>
      <Search />
    </MockContext>,
  );
  const linkElement = getByText('ate New So ');
  expect(linkElement).toBeInTheDocument();
});
