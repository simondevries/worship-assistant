import React, { useContext } from 'react';
import { Context } from '../../../Common/Store/Store';

import styled from 'styled-components';
import ProjectorView from '../../ProjectorView/ProjectorView';
import { Button, Card } from '@blueprintjs/core';
import ActiveSlideContainer from './ActiveSlideContainer';
import IState from 'Interfaces/State';

const StyledButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
`;

const StyledProjectorView = styled(ProjectorView)`
  height: 150px;
`;

export const slideWidth = 300;

export default function () {
  const [state] = useContext<Array<IState>>(Context);

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
        globalTheme={state.settings.globalSlideTheme}
      />
      <StyledButtonContainer>
        <Button onClick={() => alert('TODO')}>Slide Settings</Button>
        <Button onClick={() => alert('TODO')}>White</Button>
        <Button onClick={() => alert('TODO')}>Blank Screen</Button>
      </StyledButtonContainer>
    </ActiveSlideContainer>
  );
}
