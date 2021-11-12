import React from 'react';

import { render, screen } from '@testing-library/react';
import { BibleVerseHandler } from './BibleVerseHandler.stories';
import '@testing-library/jest-dom/extend-expect';

it('renders the bible verse', () => {
  render(
    <BibleVerseHandler
      resourceReference={{
        id: 'anId',
        bibleVerseContent: 'abibleversecontent',
      }}
    />,
  );
  expect(screen.getByTestId('bibleVerseHandler')).toHaveTextContent(
    'abibleversecontent',
  );
});
