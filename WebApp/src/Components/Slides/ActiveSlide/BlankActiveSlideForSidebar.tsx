import { Button } from '@blueprintjs/core';
import { Context } from 'Common/Store/Store';
import MinatureProjectorView from 'Components/MinatureProjectorView/MinatureProjectorView';
import focusOnProjectView from 'Hooks/focusOnProjectView';
import IState from 'Interfaces/State';
import React, { useContext } from 'react';
import ActiveSlideContainer from './ActiveSlideContainer';

const BlankActiveSlideForSidebar = () => {
  const [state]: [state: IState] = useContext(Context);
  const [openOrFocus] = focusOnProjectView(
    state?.currentSchedule.activeResourcePointer?.resourceId,
    state?.currentSchedule.activeResourcePointer?.slideIndex,
  );

  return (
    <ActiveSlideContainer slideIndex="na" resourceId="na">
      <MinatureProjectorView />
      {!state.hasProjectorsAttached && (
        <Button onClick={openOrFocus} icon={'desktop'}>
          Open new projector window
        </Button>
      )}
    </ActiveSlideContainer>
  );
};

export default BlankActiveSlideForSidebar;
