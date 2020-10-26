import React from 'react';
import Slide from './Slide';
import styled from 'styled-components/macro';
import { H3 } from '@blueprintjs/core';
import ActiveSlide from '../ActiveSlide/ActiveSlide';

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
        {resource &&
          resource.lyrics &&
          resource.lyrics.map((verse, slideIndex) => {
            return isActiveResource &&
              slideIndex === activeResourcePointer.slideIndex ? (
              <ActiveSlide slideMetadata={verse}></ActiveSlide>
            ) : (
              <Slide
                onClick={() => updateSlideNumber(slideIndex)}
                slideMetadata={verse}
              ></Slide>
            );
          })}
      </StyedSlidesContainer>
    </StyledResourceManager>
  );
}
