import React, { useContext, useState } from 'react';
import { Context } from '../../../Common/Store/Store';

import ActiveSlideContainer from './ActiveSlideContainer';
import IState from 'Interfaces/State';
import SettingsDialog, {
  SettingsDialogTab,
} from 'Components/Dialogs/SettingsDialog/SettingsDialog';
import MinatureProjectorView from 'Components/MinatureProjectorView/MinatureProjectorView';
import CommonActiveSlideButtons from 'Common/CommonActiveSlideButtons/CommonActiveSlideButtons';

export const slideWidth = 300;

const ActiveSongSlide = () => {
  const [settingsModalOpen, setSettingsModalOpen] = useState(false);
  const [state] = useContext<Array<IState>>(Context);
  const activeResourcePointer =
    state.currentSchedule.activeResourcePointer;

  return (
    <>
      <ActiveSlideContainer
        slideIndex={activeResourcePointer.slideIndex}
        resourceId={activeResourcePointer.resourceId}
      >
        <MinatureProjectorView />
        <CommonActiveSlideButtons />
      </ActiveSlideContainer>

      {settingsModalOpen && (
        <SettingsDialog
          setSettingsModalOpen={setSettingsModalOpen}
          activeResourcePointer={
            state.currentSchedule.activeResourcePointer
          }
          openTab={SettingsDialogTab.Theme}
        />
      )}
    </>
  );
};

export default ActiveSongSlide;
