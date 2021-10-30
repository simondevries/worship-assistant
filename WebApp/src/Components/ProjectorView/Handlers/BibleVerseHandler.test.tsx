import React from 'react';

import { render, screen } from '@testing-library/react';
import { Primary } from './BibleVerseHandler.stories';
import '@testing-library/jest-dom/extend-expect';

it('renders the bible verse', () => {
  render(
    <Primary
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
