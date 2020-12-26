import React, { useContext } from 'react';
import { Context } from '../../../App';
import styled from 'styled-components';
import ProjectorView from '../../ProjectorView/ProjectorView';
import { Button, Card } from '@blueprintjs/core';
import ResourceReference from '../../../Interfaces/ResourceReference';
import BibleVerse from '../../../Interfaces/BibleVerse';

const StyledButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
`;

const StyledProjectorView = styled(ProjectorView)`
  height: 150px;
`;

export const slideWidth = 300;

const StyledContainer = styled(Card)`
  background: #666f76 !important;
  justify-content: space-between;
  display: flex;
  flex-direction: column;
  width: ${slideWidth + 'px'};
  font-size: 15pt;
  min-height: 250px;
  margin-bottom: 10px;
`;

type Props = {
  resource: ResourceReference;
};

export default function ({ resource }: Props) {
  const [state, dispatch] = useContext(Context);

  const activeResourcePointer =
    state.currentSchedule.activeResourcePointer;

  return (
    <StyledContainer>
      {`${resource.book} ${resource.chapter}:${resource.verse} (${resource.translation})`}
      <StyledProjectorView
        previewMode={true}
        activeResourcePointer={activeResourcePointer}
      />
      <StyledButtonContainer>
        <Button>Slide Settings</Button>
      </StyledButtonContainer>
    </StyledContainer>
  );
}
