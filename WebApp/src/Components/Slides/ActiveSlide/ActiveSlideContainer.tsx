import React, { useContext } from 'react';
import { Button, Card } from '@blueprintjs/core';
import { slideWidth } from './ActiveSongSlide';
import styled from 'styled-components';
import { Context } from '../../../App';
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
  margin-bottom: 10px;
`;

export default ({ children }) => {
  const [state] = useContext(Context);
  const [openOrFocus] = focusOnProjectView(true);

  const openNewWindowButton = (
    <Button intent="primary" onClick={openOrFocus}>
      Open new monitor window
    </Button>
  );

  return (
    <StyledContainer>
      {!state.hasProjectorsAttached && openNewWindowButton}
      {children}
    </StyledContainer>
  );
};
