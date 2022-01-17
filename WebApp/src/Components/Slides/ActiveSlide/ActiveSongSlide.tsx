import React, { useContext } from 'react';
import { Context } from '../../../Common/Store/Store';

import styled from 'styled-components';
import ProjectorView from '../../ProjectorView/ProjectorView';
import { Button, Card } from '@blueprintjs/core';
import ActiveSlideContainer from './ActiveSlideContainer';
import IState from 'Interfaces/State';
import { ISettings } from 'Interfaces/Settings';
import slideSizeResolver from './helpers/slideSizeResolver';

const StyledButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
`;

const StyledProjectorView = styled(ProjectorView)<{
  height: number;
}>`
  height: ${({ height }) => height}px;
`;

export const slideWidth = 300;

const ActiveSongSlide = () => {
  const [state] = useContext<Array<IState>>(Context);
  const projectorWidth =
    state?.settings?.projectorScreenDimensions?.width ?? 160;
  const projectorHeight =
    state?.settings?.projectorScreenDimensions?.height ?? 90;

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
        height={slideSizeResolver.getSmallerVersionOfProjectorView(
          260,
          projectorWidth,
          projectorHeight,
        )}
      />
      <StyledButtonContainer>
        <Button onClick={() => alert('TODO')}>Slide Settings</Button>
        <Button onClick={() => alert('TODO')}>White</Button>
        <Button onClick={() => alert('TODO')}>Blank Screen</Button>
      </StyledButtonContainer>
    </ActiveSlideContainer>
  );
};

export default ActiveSongSlide;
