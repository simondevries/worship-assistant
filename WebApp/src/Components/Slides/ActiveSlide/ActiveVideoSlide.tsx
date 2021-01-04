import React, { useContext } from 'react';
import { Context } from '../../../App';

import styled from 'styled-components';
import ProjectorView from '../../ProjectorView/ProjectorView';
import { Button } from '@blueprintjs/core';
import { playVideo } from '../../../__OLD_ChromeExtensionGateway/gateway';
import ActiveResourcePointer from '../../../Interfaces/ActiveResourcePointer';
import ActiveSlideContainer from './ActiveSlideContainer';
import useEventHandler from '../../../Events/Handlers/useEventHandler';
import VideoModeChangeEvent from '../../../Events/Domain/VideoModeChangeEvent';

const StyledButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
`;

const StyledProjectorView = styled(ProjectorView)``;

export default function ({ resource }) {
  const [raiseEvent] = useEventHandler();

  const activeResourcePointer: ActiveResourcePointer = {
    resourceId: resource.id,
    slideIndex: 0,
  };
  return (
    <ActiveSlideContainer slideIndex={0} resourceId={resource.id}>
      <ProjectorView
        activeResourcePointer={activeResourcePointer}
        previewMode={true}
      />
      <StyledButtonContainer>
        {resource.title}

        <Button
          onClick={() =>
            raiseEvent(
              new VideoModeChangeEvent(
                false,
                'BACKTOSTART',
                resource.id,
              ),
            )
          }
        >
          Back to start
        </Button>
        <Button
          onClick={() =>
            raiseEvent(
              new VideoModeChangeEvent(false, 'PLAY', resource.id),
            )
          }
        >
          Play
        </Button>
        <Button
          onClick={() =>
            raiseEvent(
              new VideoModeChangeEvent(false, 'PAUSE', resource.id),
            )
          }
        >
          Pause
        </Button>
        <Button
          onClick={() =>
            raiseEvent(
              new VideoModeChangeEvent(false, 'STOP', resource.id),
            )
          }
        >
          Stop
        </Button>
      </StyledButtonContainer>
    </ActiveSlideContainer>
  );
}
