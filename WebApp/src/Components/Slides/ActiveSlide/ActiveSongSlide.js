import React, { useContext } from 'react';
import { Context } from '../../../App';

import styled from 'styled-components';
import ProjectorView from '../../ProjectorView/ProjectorView';
import { Button, Card } from '@blueprintjs/core';
import ActiveSlideContainer from './ActiveSlideContainer';

const StyledButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
`;

const StyledProjectorView = styled(ProjectorView)`
  height: 150px;
`;

export const slideWidth = 300;

export default function () {
  const [state, dispatch] = useContext(Context);

  const activeResourcePointer =
    state.currentSchedule.activeResourcePointer;

  return (
    <ActiveSlideContainer
      slideIndex={activeResourcePointer.slideIndex}
      resourceId={activeResourcePointer.resourceId}
    >
      <StyledProjectorView
        previewMode={true}
        activeResourcePointer={activeResourcePointer}
      />
      <StyledButtonContainer>
        <Button>Slide Settings</Button>
        <Button>White</Button>
        <Button>Blank</Button>
        <Button>Play</Button>
      </StyledButtonContainer>
    </ActiveSlideContainer>
  );
}
