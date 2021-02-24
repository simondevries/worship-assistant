import React, { useReducer, createContext } from 'react';
import { render } from '@testing-library/react';
import Search from './Search';
import reducers from '../../Reducers/reducers';
import { Context } from '../../App';

beforeEach(() => {});

// Context = createContext(initialState);

test('Should render search', () => {
  // const [state, dispatch] = useReducer(reducers, initialState);

  jest.mock('../../App', () => ({
    Context: createContext({
      currentSchedule: { foo: 'bar' },
    }),
  }));

  const { getByText } = render(
    <Context.Provider
      value={[
        {
          currentSchedule: { foo: 'bar' },
        },
      ]}
    >
      <Search />
    </Context.Provider>,
  );

  // const linkElement = getByText('ate New So ');
  // expect(linkElement).toBeInTheDocument();
});
