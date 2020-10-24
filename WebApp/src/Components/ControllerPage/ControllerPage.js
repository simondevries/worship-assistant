import React, { useState } from 'react';
import ResourceManager from './resourceManager';
import styled from 'styled-components/macro';

const StyledResourcesContainer = styled.div`
  display: flex;
  flex-direction: row;
`;

const StyledControllerPage = styled.div`
  height: 100%;
`;

export default function ({ resources, updateSlideNumber }) {
  const updateSlideNumberLocal = (rInx) => (sInx) => {
    updateSlideNumber(rInx, sInx);
  };

  return (
    <StyledControllerPage>
      <StyledResourcesContainer>
        {resources &&
          resources.map((r, rInx) => (
            <ResourceManager
              resource={r}
              updateSlideNumber={updateSlideNumberLocal(rInx)}
            ></ResourceManager>
          ))}
      </StyledResourcesContainer>
    </StyledControllerPage>
  );
}
