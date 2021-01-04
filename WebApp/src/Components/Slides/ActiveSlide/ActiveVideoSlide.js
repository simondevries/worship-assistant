import React, { useContext } from 'react';
import { Context } from '../../../App';

import styled from 'styled-components';
import ProjectorView from '../../ProjectorView/ProjectorView';
import { Button } from '@blueprintjs/core';
import { playVideo } from '../../../__OLD_ChromeExtensionGateway/gateway';

const StyledButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
`;

const StyledProjectorView = styled(ProjectorView)``;

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  border: 2px solid red;
  width: 300px;
  font-size: 15pt;
`;

export default function ({ resource }) {
  const [state, dispatch] = useContext(Context);

  return (
    <StyledContainer
      slideIndex={
        state.currentSchedule.activeResourcePointer.slideIndex
      }
      resourceId={
        state.currentSchedule.activeResourcePointer.resourceId
      }
    >
      <StyledButtonContainer>
        {resource.title}
        <Button>Slide Settings</Button>
        <Button>Play</Button>
        <Button>Pause</Button>
        <Button>Stop</Button>
        <Button>Back to start</Button>
      </StyledButtonContainer>
    </StyledContainer>
  );
}
