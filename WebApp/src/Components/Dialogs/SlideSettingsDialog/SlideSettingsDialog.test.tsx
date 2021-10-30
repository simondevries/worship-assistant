import React from 'react';
import { render, screen } from '../../../testutils/testutils';
import { Primary } from './SlideSettingsDialog.stories';
import '@testing-library/jest-dom/extend-expect';

it('renders the bible verse', () => {
  render(<Primary />);
  expect(screen.getByTestId('theme-section')).toBeInTheDocument();
});
