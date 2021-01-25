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

  // Winston - this fails because search.tsx refers to the context in app.tsx which is
  // not renedered and so it cannot be found. I tried to override the conext here but it didn't work....

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
