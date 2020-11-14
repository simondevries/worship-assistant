import React, { useContext } from 'react';
import { Context } from '../../../App';

import styled from 'styled-components';
import ProjectorView from '../../ProjectorView/ProjectorView';
import { Button } from '@blueprintjs/core';

const StyledButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
`;

const StyledProjectorView = styled(ProjectorView)``;

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  border: 2px solid red;
  width: 300px;
  font-size: 15pt;
`;

export default function ({ slideMetadata }) {
  const [state, dispatch] = useContext(Context);

  const activeResourcePointer =
    state.currentSchedule.activeResourcePointer;

  return (
    <StyledContainer>
      <StyledProjectorView
        previewMode={true}
        activeResourcePointer={activeResourcePointer}
      />
      <StyledButtonContainer>
        <img src="file://C:/img.jpg" />
        <Button>Slide Settings</Button>
        <Button>White</Button>
        <Button>Blank</Button>
      </StyledButtonContainer>
    </StyledContainer>
  );
}
