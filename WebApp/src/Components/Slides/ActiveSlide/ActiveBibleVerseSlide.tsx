import React, { useContext } from 'react';
import { Context } from '../../../Common/Store/Store';
import styled from 'styled-components';
import { Button } from '@blueprintjs/core';
import ResourceReference from '../../../Interfaces/ResourceReference';
import ActiveSlideContainer from './ActiveSlideContainer';
import MinatureProjectorView from 'Components/MinatureProjectorView/MinatureProjectorView';

const StyledButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
`;

export const slideWidth = 300;

type Props = {
  resource: ResourceReference;
};

const ActiveBibleVerseSlide = ({ resource }: Props) => {
  console.log(resource)
  const context = useContext(Context);

  const activeResourcePointer =
    context.state.currentSchedule.activeResourcePointer;

  return (
    <ActiveSlideContainer
      slideIndex={activeResourcePointer.slideIndex}
      resourceId={activeResourcePointer.resourceId}
    >
      <MinatureProjectorView />
      <StyledButtonContainer>
        <Button>Slide Settings</Button>
      </StyledButtonContainer>
    </ActiveSlideContainer>
  );
};

export default ActiveBibleVerseSlide;
