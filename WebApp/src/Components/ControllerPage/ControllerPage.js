import React, { useState, useEffect, useContext } from 'react';
import { Context } from '../../App';
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

export default function ({ updateSlideNumber }) {
  const [state, dispatch] = useContext(Context);

  if (!state || !state.settings || !state.currentSchedule)
    return null;

  const resources = state.currentSchedule.resources.sort((a, b) =>
    a.index < b.index ? -1 : 1,
  );
  const updateSlideNumberLocal = (rInx) => (sInx) => {
    updateSlideNumber(rInx, sInx);
  };

  const openSearch = () => {
    dispatch({
      type: 'setSearchVisible',
      payload: true,
    });
  };
  const activeResourcePointer =
    state.currentSchedule.activeResourcePointer;
  return (
    <StyledControllerPage>
      <StyledResourcesContainer>
        {resources &&
          resources.map((r, rInx) => (
            <StyledResourceContainer>
              <ResourceManager
                resource={r}
                isActiveResource={
                  activeResourcePointer.resourceIndex === rInx
                }
                updateSlideNumber={updateSlideNumberLocal(rInx)}
                activeResourcePointer={activeResourcePointer}
                resourceIndex={rInx}
              ></ResourceManager>
              {rInx < resources.length && (
                <StyledAddButton
                  icon={addIcon}
                  minimal
                  inline={false}
                  onClick={openSearch}
                ></StyledAddButton>
              )}
            </StyledResourceContainer>
          ))}
      </StyledResourcesContainer>
    </StyledControllerPage>
  );
}
