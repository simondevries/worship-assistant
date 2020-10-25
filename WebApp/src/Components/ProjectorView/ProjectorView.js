import React, { useContext } from 'react';
import styled from 'styled-components/macro';
import { Context } from '../../App';

const StyledProjectorView = styled.div`
  font-size: 100pt;
  background: black;
  color: white;
  height: 100%;
  text-align: center;
`;

export default function ({ currentSlideNumber }) {
  const [state, dispatch] = useContext(Context);
  const resources = state.schedule.resources;
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
