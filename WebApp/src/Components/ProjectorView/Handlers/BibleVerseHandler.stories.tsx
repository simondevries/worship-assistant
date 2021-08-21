import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import BibleVerseHandler from './BibleVerseHandler';


export default {
  title: 'Bible Verse',
  component: BibleVerseHandler,
  argTypes: {
  }
//     backgroundColor: { control: 'color' },
//   },
} as ComponentMeta<typeof BibleVerseHandler>;


const Template: ComponentStory<typeof BibleVerseHandler> = (args) => <BibleVerseHandler  resourceReference={ args.resourceReference} />;

export const Primary = Template.bind({});
Primary.args = {
  resourceReference: {
      id: 'anid',
      bibleVerseContent: 'test'
  }
};



