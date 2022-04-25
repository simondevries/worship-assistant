import React, { useContext } from 'react';
import { Context } from '../../../Common/Store/Store';
import styled from 'styled-components';
import ProjectorView from '../../ProjectorView/ProjectorView';
import { Button, Card } from '@blueprintjs/core';
import ResourceReference from '../../../Interfaces/ResourceReference';
import BibleVerse from '../../../Interfaces/BibleVerse';
import ActiveSlideContainer from './ActiveSlideContainer';
import MinatureProjectorView from 'Components/MinatureProjectorView/MinatureProjectorView';
import CommonActiveSlideButtons from 'Common/CommonActiveSlideButtons/CommonActiveSlideButtons';

const StyledButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
`;

export const slideWidth = 300;

type Props = {
  resource: ResourceReference;
};

const ActiveBibleVerseSlide = ({ resource }: Props) => {
  const [state, dispatch] = useContext(Context);

  const activeResourcePointer =
    state.currentSchedule.activeResourcePointer;

  return (
    <ActiveSlideContainer
      slideIndex={activeResourcePointer.slideIndex}
      resourceId={activeResourcePointer.resourceId}
    >
      <MinatureProjectorView />
      <StyledButtonContainer>
        <CommonActiveSlideButtons />
      </StyledButtonContainer>
    </ActiveSlideContainer>
  );
};

export default ActiveBibleVerseSlide;
