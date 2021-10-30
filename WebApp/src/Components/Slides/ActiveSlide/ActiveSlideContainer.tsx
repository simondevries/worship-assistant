import React, { useContext } from 'react';
import { Button, Card } from '@blueprintjs/core';
import { slideWidth } from './ActiveSongSlide';
import styled from 'styled-components';
import { Context } from '../../../Common/Store/Store';
import IState from '../../../Interfaces/State';
import focusOnProjectView from '../../../Hooks/focusOnProjectView';

const StyledContainer = styled(Card)`
  background: #666f76 !important;
  justify-content: space-between;
  display: flex;
  flex-direction: column;
  width: 300px;
  font-size: 15pt;
  min-height: 250px;
`;

export default ({ children, slideIndex, resourceId }) => {
  const [state] = useContext(Context);
  const [openOrFocus] = focusOnProjectView(resourceId, slideIndex);

  const openNewWindowButton = (
    <Button intent="primary" onClick={openOrFocus}>
      Open new monitor window
    </Button>
  );

  return (
    <StyledContainer id={`slide${slideIndex}resource${resourceId}`}>
      {!state.hasProjectorsAttached && openNewWindowButton}
      {children}
    </StyledContainer>
  );
};
