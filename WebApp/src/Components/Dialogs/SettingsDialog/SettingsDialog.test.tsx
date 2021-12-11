import React from 'react';
import { render, screen } from '../../../testutils/testutils';
import { Primary } from './SettingsDialog.stories';
import '@testing-library/jest-dom/extend-expect';
import 'mutationobserver-shim';

global.MutationObserver = window.MutationObserver;

it('renders the bible verse', () => {
  render(<Primary />);
  expect(screen.getByTestId('theme-section')).toBeInTheDocument();
});
