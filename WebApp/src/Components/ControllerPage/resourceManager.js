import React from 'react';
import Slide from '../Slides/NonActiveSlide/SlideResolver';
import styled, { css } from 'styled-components/macro';
import { H3 } from '@blueprintjs/core';
import ActiveSlide, {
  slideWidth,
} from '../Slides/ActiveSlide/ActiveSongSlide';
import SlideResolver from '../Slides/NonActiveSlide/SlideResolver';
import Scrollbar from '../../Common/Scrollbar/Scrollbar';

const StyledSlidesContainer = styled.div`
  ${Scrollbar}
  padding-top: calc(50vh - 200px);
  padding-bottom: calc(50vh - 140px);
  overflow-y: auto;
  padding-right: 10px;
`;

const StyledHeader = styled(H3)`
  margin-top: 20px;
  margin-bottom: 20px;
`;

const StyledResourceManager = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

export default function ({
  resource,
  resourceIndex,
  isActiveResource,
  updateSlideNumber,
  activeResourcePointer,
}) {
  return (
    <StyledResourceManager>
      <StyledHeader>
        {resource && resource.properties && resource.properties.title}
      </StyledHeader>
      <StyledSlidesContainer>
        <SlideResolver
          resourceIndex={resourceIndex}
          activeResourcePointer={activeResourcePointer}
          resource={resource}
          updateSlideNumber={updateSlideNumber}
        />
      </StyledSlidesContainer>
    </StyledResourceManager>
  );
}
