import React from 'react';
import styled from 'styled-components/macro';

const StyledProjectorView = styled.div`
  font-size: 100pt;
  background: black;
  color: white;
  text-align: center;
`;

export default function ({ currentSlideNumber, resources }) {
  return (
    <StyledProjectorView>
      {
        resources[currentSlideNumber.resourceIndex].slides[
          currentSlideNumber.slideIndex
        ].text
      }
    </StyledProjectorView>
  );
}
