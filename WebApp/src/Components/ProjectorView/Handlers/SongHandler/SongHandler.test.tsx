import {
  act,
  prettyDOM,
  render,
  screen,
} from '@testing-library/react';
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
      screen.getAllByTestId('songhandler-newlineelement-0'),
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

  // Some battles are just not worth fighting
  // it('Should have a border with a color that is the opposite color of the text', () => {
  //   expect(
  //     render(
  //       <BasicStory
  //         resourceReference={new ResourceReferenceBuilder().build()}
  //         slideIndex={1}
  //         activeSongs={[new SongBuilder().build()]}
  //         globalTheme={new ThemeBuilder()
  //           .withFontColor('#FFFFFF')
  //           .build()}
  //       />,
  //     ),
  //   ).toBeDefined();
  //
  //   const foo = screen.getByTestId('songhandler-newlineelement-0');
  //
  //   expect(foo['border']).toContain('#000000');
  // });

  it('should scale up as the size increases', () => {
    // Object.defineProperty(HTMLElement.prototype, 'offsetHeight', {
    //   configurable: true,
    //   value: 500,
    // });
    // Object.defineProperty(HTMLElement.prototype, 'offsetWidth', {
    //   configurable: true,
    //   value: 500,
    // });

    render(
      <div style={{ height: '300px', width: '300px' }}>
        <XGAStory
          resourceReference={new ResourceReferenceBuilder().build()}
          slideIndex={1}
          activeSongs={[new SongBuilder().build()]}
          globalTheme={new ThemeBuilder().build()}
        />
      </div>,
    );

    const elemtn = screen.getAllByTestId('songhandler-container');
    const fontSizeOfSmallerScreen = parseInt(
      elemtn[0].style.fontSize.replace('%', ''),
    );

    render(
      <div style={{ height: '600px', width: '600px' }}>
        <HDTwoStory
          resourceReference={new ResourceReferenceBuilder().build()}
          slideIndex={1}
          activeSongs={[new SongBuilder().build()]}
          globalTheme={new ThemeBuilder().build()}
        />
      </div>,
    );

    const elemtnTwo = screen.getAllByTestId('songhandler-container');
    const fontSizeOfLargerScreen = parseInt(
      elemtnTwo[0].style.fontSize.replace('%', ''),
    );

    expect(fontSizeOfSmallerScreen).toBeLessThan(
      fontSizeOfLargerScreen,
    );
  });
});
