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

export default function ({ resource }) {
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
      <StyledButtonContainer>
        {resource.title}

        <Button
          icon="play"
          onClick={() =>
            raiseEvent(
              new VideoModeChangeEvent(false, 'PLAY', resource.id),
            )
          }
        />
        <Button
          onClick={() =>
            raiseEvent(
              new VideoModeChangeEvent(false, 'PAUSE', resource.id),
            )
          }
          icon="pause"
        />
        <Button
          onClick={() =>
            raiseEvent(
              new VideoModeChangeEvent(false, 'STOP', resource.id),
            )
          }
          icon="stop"
        />
        {/* 
        <Button
          onClick={() => {
            alert("Not implemented - this will allow the user to ")
            // raiseEvent(
            //   new VideoModeChangeEvent(
            //     false,
            //     'SHOWCONTROLS',
            //     resource.id,
            //   ),
            // );
            // // setShowControls(!showControls);
          }}
        >
          {showControls ? 'Show controls' : 'Hide controls'}
        </Button> */}
      </StyledButtonContainer>
    </ActiveSlideContainer>
  );
}
