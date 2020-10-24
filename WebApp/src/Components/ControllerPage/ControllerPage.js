import React, { useState } from 'react';
import ResourceManager from './resourceManager';
import styled from 'styled-components/macro';
import { Button, Icon } from '@blueprintjs/core';

const StyledAddButton = styled(Button)`
  margin-left: 10px;
  margin-right: 10px;
`;

const addIcon = <Icon icon="add" iconSize="30" />;

const StyledResourceContainer = styled.div`
  display: flex;
  align-items: center;
`;

const StyledResourcesContainer = styled.div`
  display: flex;
  flex-direction: row;
  height: 100%;
`;

const StyledControllerPage = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
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
            <StyledResourceContainer>
              <ResourceManager
                resource={r}
                updateSlideNumber={updateSlideNumberLocal(rInx)}
              ></ResourceManager>
              <StyledAddButton icon={addIcon} minimal inline={false}>
                asd
              </StyledAddButton>
            </StyledResourceContainer>
          ))}
      </StyledResourcesContainer>
    </StyledControllerPage>
  );
}
