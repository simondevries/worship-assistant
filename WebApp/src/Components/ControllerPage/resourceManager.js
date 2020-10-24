import React from 'react';
import Slide from './Slide';
import styled from 'styled-components/macro';

const StyledResourceManager = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0px 10px;
`;

export default function ({ resource, updateSlideNumber }) {
  return (
    <StyledResourceManager>
      {resource.title}
      {resource &&
        resource.slides &&
        resource.slides.map((s, sInx) => (
          <Slide
            onClick={() => updateSlideNumber(sInx)}
            slideMetadata={s}
          ></Slide>
        ))}
    </StyledResourceManager>
  );
}
