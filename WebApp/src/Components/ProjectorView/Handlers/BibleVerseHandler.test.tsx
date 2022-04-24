import React from 'react';

import { render, screen } from '@testing-library/react';
import BibleVerseHandler from './BibleVerseHandler';
import { BibleVerseContent } from '../../../Interfaces/BibleVerse';
import { defaultTheme } from '../../../Interfaces/themes';

import '@testing-library/jest-dom/extend-expect';

it('renders the bible verse', () => {
  render(
    <BibleVerseHandler
      slideIndex={0}
      globalTheme={defaultTheme}
      resourceReference={{
        id: 'anId',
        bibleVerseContent: [{ text: "abibleversecontent" }] as BibleVerseContent[],
      }}
    />,
  );
  expect(screen.getByTestId('bibleVerseHandler')).toHaveTextContent(
    'abibleversecontent',
  );
});
