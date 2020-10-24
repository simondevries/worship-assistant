import React from 'react';
import Slide from './Slide';
import styled from 'styled-components/macro';
import { H3 } from '@blueprintjs/core';

const StyedSlidesContainer = styled.div`
  height: 100%;
  display: flex;
  justify-content: center;
  flex-direction: column;
`;

const StyledResourceManager = styled.div`
  display: flex;
  flex-direction: column;
  margin: 20px 10px;
  height: 100%;
`;

export default function ({ resource, updateSlideNumber }) {
  return (
    <StyledResourceManager>
      <H3>{resource.title}</H3>
      <StyedSlidesContainer>
        {resource &&
          resource.slides &&
          resource.slides.map((s, sInx) => (
            <Slide
              onClick={() => updateSlideNumber(sInx)}
              slideMetadata={s}
            ></Slide>
          ))}
      </StyedSlidesContainer>
    </StyledResourceManager>
  );
}
