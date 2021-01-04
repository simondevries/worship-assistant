import React from 'react';
import styled from 'styled-components';
import { H1, Button } from '@blueprintjs/core';
import { useHistory } from 'react-router-dom';

const StyledContainer = styled.div`
  display: flex;
  justify-content: center;
  height: 100vh;
  width: 100vw;
  align-items: center;
  flex-direction: column;
  gap: 20px;
`;

export default () => {
  const history = useHistory();

  return (
    <StyledContainer>
      <H1>Not Found</H1>
      <Button onClick={() => history.push('/controller')} icon="home">
        Go to controller page
      </Button>
    </StyledContainer>
  );
};
