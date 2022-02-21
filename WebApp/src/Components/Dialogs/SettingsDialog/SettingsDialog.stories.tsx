import React, { Dispatch, useContext, useEffect } from 'react';
// import { ComponentMeta } from '@storybook/react';
import SlideSettingsDialog, {
  SettingsDialogTab,
} from './SettingsDialog';
import ActiveResourceBuilder from '../../../testBuilders/activeResourcePointerBuilder';
import IState from '../../../Interfaces/State';
import { Context } from '../../../Common/Store/Store';
import { ComponentMeta, ComponentStory } from '@storybook/react';

export default {
  component: SlideSettingsDialog,
  title: 'Settings Dialog',
  argTypes: {},
} as ComponentMeta<typeof SlideSettingsDialog>;

const Template: ComponentStory<any> = () => {
  return (
    <SlideSettingsDialog
      activeResourcePointer={new ActiveResourceBuilder().build()}
      setSettingsModalOpen={(isOpen: boolean) => {}}
      openTab={SettingsDialogTab.Main}
    />
  );
};

//👇 Each story then reuses that template
export const Primary = Template.bind({});
