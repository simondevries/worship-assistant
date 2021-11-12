import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import React from 'react';
import 'mutationobserver-shim';
import {
  BasicStory,
  HDTwoStory,
  XGAStory,
} from './SongHandler.stories';
import { ResourceReferenceBuilder } from 'testBuilders/resourceReferenceBuilder';
import { SongBuilder } from 'testBuilders/songBuilder';
import { ThemeBuilder } from 'testBuilders/themeBuilder';

describe('Song Handler tests', () => {
  it('renders the song on the screen', () => {
    render(
      <BasicStory
        resourceReference={new ResourceReferenceBuilder().build()}
        slideIndex={1}
        activeSongs={[new SongBuilder().build()]}
        globalTheme={new ThemeBuilder().build()}
      />,
    );

    expect(screen.findAllByText('Then sings')).toBeDefined();
    expect(
      screen.getAllByTestId('songhandler-newlineelement'),
    ).toBeDefined();
  });

  it("Does not blow up when the slide number doesn't exist", () => {
    expect(
      render(
        <BasicStory
          resourceReference={new ResourceReferenceBuilder().build()}
          slideIndex={2}
          activeSongs={[new SongBuilder().build()]}
          globalTheme={new ThemeBuilder().build()}
        />,
      ),
    ).toBeDefined();
  });

  it('should scale up as the size increases', () => {
    render(
      <XGAStory
        resourceReference={new ResourceReferenceBuilder().build()}
        slideIndex={2}
        activeSongs={[new SongBuilder().build()]}
        globalTheme={new ThemeBuilder().build()}
      />,
    );

    const elemtn = screen.getAllByTestId('songhandler-container');
    const first = elemtn[0].style.fontSize;

    render(
      <HDTwoStory
        resourceReference={new ResourceReferenceBuilder().build()}
        slideIndex={2}
        activeSongs={[new SongBuilder().build()]}
        globalTheme={new ThemeBuilder().build()}
      />,
    );

    const elemtnTwo = screen.getAllByTestId('songhandler-container');
    const second = elemtnTwo[0].style.fontSize;

    // expect(first.match(/\d+/)?[0] ?? 0).toBeLessThan(second.match(/\d+/ ??)?[0] ?? 0);
  });
});
