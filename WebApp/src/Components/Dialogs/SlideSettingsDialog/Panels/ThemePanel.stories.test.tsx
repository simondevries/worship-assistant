import {
  act,
  fireEvent,
  getByText,
  prettyDOM,
  render,
  screen,
} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import React from 'react';
import ThemePanel from './ThemePanel';
import ActiveResourcePointerBuilder from 'testBuilders/activeResourcePointerBuilder';
import 'mutationobserver-shim';
import TestStore from '../../../../Common/Store/TestStore';

global.MutationObserver = window.MutationObserver;

export const Main = () => {
  return (
    <ThemePanel
      activeResourcePointer={new ActiveResourcePointerBuilder().build()}
      onClose={() => {}}
    />
  );
};

export default {
  title: 'Settings/ThemePanel',
  component: Main,
};

test('renders the bible verse', async () => {
  render(
    <TestStore>
      <Main />
    </TestStore>,
  );

  fireEvent.click(screen.getByTestId('bold'), {
    bubbles: true,
  });

  act(() => {
    console.log(prettyDOM(screen.getByTestId('bold')));
    expect(screen.getByTestId('bold')).toHaveClass('bp3-active');

    // return settingsRepo.get().then((res) => {
    //   console.log({ res });
    //   expect(res).toBeDefined();
    // });
  });
});
