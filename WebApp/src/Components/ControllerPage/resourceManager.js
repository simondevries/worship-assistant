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
  console.log('res', JSON.stringify(resource));
  return (
    <StyledResourceManager>
      <H3>{resource.title}</H3>
      <StyedSlidesContainer>
        {resource &&
          resource.lyrics.map((verse, verseIndex) => (
            <Slide
              onClick={() => updateSlideNumber(verseIndex)}
              verseMetadata={verse}
            ></Slide>
          ))}
      </StyedSlidesContainer>
    </StyledResourceManager>
  );
}
