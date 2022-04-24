import styled from '@emotion/styled';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import React from 'react';
import { ResourceReferenceBuilder } from 'testBuilders/resourceReferenceBuilder';
import { SongBuilder } from 'testBuilders/songBuilder';
import { ThemeBuilder } from 'testBuilders/themeBuilder';
import SongHandler from './SongHandler';

export default {
  title: 'Components/SongHandler',
  component: SongHandler,
  args: {
    resourceReference: new ResourceReferenceBuilder().build(),
    slideIndex: 1,
    activeSongs: [new SongBuilder().build()],
    globalTheme: new ThemeBuilder().build(),
  },
} as ComponentMeta<typeof SongHandler>;

const TestElementWrapper = styled.div`
  border: 1px solid Red;
`;

const Template: ComponentStory<typeof SongHandler> = (args) => (
  <TestElementWrapper
    style={{
      height: '200px',
      width: '200px',
    }}
  >
    <SongHandler {...args} />
  </TestElementWrapper>
);

const SVGA: ComponentStory<typeof SongHandler> = (args) => (
  <TestElementWrapper style={{ height: '600px', width: '800px' }}>
    <SongHandler {...args} />
  </TestElementWrapper>
);

const XGA: ComponentStory<typeof SongHandler> = (args) => (
  <TestElementWrapper style={{ height: '760px', width: '1024px' }}>
    <SongHandler {...args} />
  </TestElementWrapper>
);

const HDOne: ComponentStory<typeof SongHandler> = (args) => (
  <TestElementWrapper style={{ height: '720px', width: '1028px' }}>
    <SongHandler {...args} />
  </TestElementWrapper>
);

const HDTwo: ComponentStory<typeof SongHandler> = (args) => (
  <TestElementWrapper style={{ height: '1080px', width: '1920px' }}>
    <SongHandler {...args} />
  </TestElementWrapper>
);

export const BasicStory: any = Template.bind({});
export const SVGAStory: any = SVGA.bind({});
export const XGAStory: any = XGA.bind({});
export const HDOneStory: any = HDOne.bind({});
export const HDTwoStory: any = HDTwo.bind({});

BasicStory.args = {};
