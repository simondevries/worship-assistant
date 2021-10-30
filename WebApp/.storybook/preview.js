import React from 'react';
import TestStore from '../src/Common/Store/TestStore';

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
};

export const decorators = [
  (Story) => (
    <TestStore>
      <Story />
    </TestStore>
  ),
];
