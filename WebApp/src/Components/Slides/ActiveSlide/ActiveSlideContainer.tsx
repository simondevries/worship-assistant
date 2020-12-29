import React, { useContext } from 'react';
import { Button, Card } from '@blueprintjs/core';
import { slideWidth } from './ActiveSongSlide';
import styled from 'styled-components';
import { Context } from '../../../App';

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

  const hasExternalWindowsOpen =
    state.externalMonitors && state.externalMonitors.length;

  const openNewWindowButton = (
    <Button
      intent="primary"
      onClick={() => {
        window.open(
          'http://localhost:3000',
          'http://localhost:3000',
          '',
          true,
        );
      }}
    >
      Open new monitor window
    </Button>
  );

  return (
    <StyledContainer>
      {!hasExternalWindowsOpen && openNewWindowButton}
      {children}
    </StyledContainer>
  );
};
