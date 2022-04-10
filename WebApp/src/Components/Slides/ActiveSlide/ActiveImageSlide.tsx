import React, { useContext, useState } from 'react';
import { Context } from '../../../Common/Store/Store';

import styled from 'styled-components';
import ProjectorView from '../../ProjectorView/ProjectorView';
import { Button } from '@blueprintjs/core';
import { playVideo } from '../../../__OLD_ChromeExtensionGateway/gateway';
import ActiveResourcePointer from '../../../Interfaces/ActiveResourcePointer';
import ActiveSlideContainer from './ActiveSlideContainer';
import useEventHandler from '../../../Events/Handlers/useEventHandler';
import VideoModeChangeEvent from '../../../Events/Domain/VideoModeChangeEvent';
import IState from 'Interfaces/State';

const StyledButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
`;

const ActiveImageSlide = ({ resource }) => {
  const [raiseEvent] = useEventHandler();
  const [state] = useContext<Array<IState>>(Context);

  const [showControls, setShowControls] = useState();
  const activeResourcePointer: ActiveResourcePointer = {
    resourceId: resource.id,
    slideIndex: 0,
  };

  return (
    <ActiveSlideContainer slideIndex={0} resourceId={resource.id}>
      <ProjectorView
        activeResourcePointer={activeResourcePointer}
        previewMode={true}
        globalTheme={state.settings.globalSlideTheme}
      />
    </ActiveSlideContainer>
  );
};

export default ActiveImageSlide;
