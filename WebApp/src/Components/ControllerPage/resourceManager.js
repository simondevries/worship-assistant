import React from 'react';
import Slide from '../Slides/NonActiveSlide/SlideResolver';
import styled from 'styled-components/macro';
import { H3 } from '@blueprintjs/core';
import ActiveSlide from '../Slides/ActiveSlide/ActiveSlide';
import SlideResolver from '../Slides/NonActiveSlide/SlideResolver';

const StyedSlidesContainer = styled.div`
  height: 100%;
  display: flex;
  justify-content: center;
  flex-direction: column;
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
  isActiveResource,
  updateSlideNumber,
  activeResourcePointer,
}) {
  return (
    <StyledResourceManager>
      <StyledHeader>
        {resource && resource.properties && resource.properties.title}
      </StyledHeader>
      <StyedSlidesContainer>
        <SlideResolver
          resource={resource}
          updateSlideNumber={updateSlideNumber}
        />
      </StyedSlidesContainer>
    </StyledResourceManager>
  );
}
