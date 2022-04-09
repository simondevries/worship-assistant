import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import BibleVerseHandler from './BibleVerseHandler';
import { BibleVerseContent } from 'Interfaces/BibleVerse';
import { BibleVerseContentBuilder } from 'testBuilders/resourceReferenceBuilder';
import { ThemeBuilder } from 'testBuilders/themeBuilder';

export default {
  title: 'Bible Verse',
  component: BibleVerseHandler,
  argTypes: {},
  //     backgroundColor: { control: 'color' },
  //   },
} as ComponentMeta<typeof BibleVerseHandler>;

const Template: ComponentStory<typeof BibleVerseHandler> = (args) => (
  <BibleVerseHandler
    resourceReference={args.resourceReference}
    slideIndex={0}
    globalTheme={new ThemeBuilder().build()}
  />
);

export const BibleVerseHandlerStory = Template.bind({});
BibleVerseHandlerStory.args = {
  resourceReference: {
    id: 'anid',
    bibleVerseContent: [new BibleVerseContentBuilder().build()],
  },
};
