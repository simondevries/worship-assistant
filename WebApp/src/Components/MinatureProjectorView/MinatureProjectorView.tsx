import { Context } from 'Common/Store/Store';
import ProjectorView from 'Components/ProjectorView/ProjectorView';
import slideSizeResolver from 'Components/Slides/ActiveSlide/helpers/slideSizeResolver';
import IState from 'Interfaces/State';
import { ITheme } from 'Interfaces/themes';
import React, { useContext, useRef, useState } from 'react';

import styled from 'styled-components';

const StyledContainer = styled.div`
  width: 100%;
  border: 1px solid white;
`;

const StyledProjectorView = styled(ProjectorView)<{
  height: number;
}>`
  height: ${({ height }) => height}px;
`;

const MinatureProjectorView = ({
  useDemoText,
  overrideTheme,
}: {
  useDemoText?: boolean;
  overrideTheme?: ITheme;
}) => {
  const projectorViewRef = useRef<HTMLDivElement | null>(null);
  const [state] = useContext<Array<IState>>(Context);
  const projectorWidth =
    state?.settings?.projectorScreenDimensions?.width ?? 160;
  const projectorHeight =
    state?.settings?.projectorScreenDimensions?.height ?? 90;
  let currentElementsWidth =
    projectorViewRef?.current?.offsetWidth ?? 250;
  currentElementsWidth =
    currentElementsWidth === 0 ? 250 : currentElementsWidth;

  const activeResourcePointer =
    state.currentSchedule.activeResourcePointer;

  return (
    <StyledContainer ref={projectorViewRef}>
      <StyledProjectorView
        useDemoText={useDemoText}
        previewMode={true}
        activeResourcePointer={activeResourcePointer}
        globalTheme={overrideTheme ?? state.settings.globalSlideTheme}
        ccliNumber={state.settings.ccliNumber}
        height={slideSizeResolver.getSmallerVersionOfProjectorView(
          currentElementsWidth,
          projectorWidth,
          projectorHeight,
        )}
      />
    </StyledContainer>
  );
};

export default MinatureProjectorView;
