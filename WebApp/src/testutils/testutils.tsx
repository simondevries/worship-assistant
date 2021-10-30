import { render, RenderOptions } from '@testing-library/react';
import TestStore from '../Common/Store/TestStore';
import React, { FC } from 'react';
import { ReactElement } from 'react';

const AllTheProviders: FC = ({ children }) => {
  return <TestStore>{children}</TestStore>;
};

const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>,
) => render(ui, { wrapper: AllTheProviders, ...options });

export * from '@testing-library/react';
export { customRender as render };
