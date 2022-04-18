import React, { useContext } from 'react';
import { Button, Card } from '@blueprintjs/core';
import { slideWidth } from './ActiveSongSlide';
import styled from 'styled-components';
import { Context } from '../../../Common/Store/Store';
import IState from '../../../Interfaces/State';
import focusOnProjectView from '../../../Hooks/focusOnProjectView';

const StyledContainer = styled(Card)`
  justify-content: space-between;
  display: flex;
  flex-direction: column;
  width: 300px;
  background: #29353e !important;
  font-size: 15pt;
  min-height: 250px;
`;

const ActiveSlideContainer = ({
  children,
  slideIndex,
  resourceId,
}) => {
  return (
    <StyledContainer id={`slide${slideIndex}resource${resourceId}`}>
      {children}
    </StyledContainer>
  );
};

export default ActiveSlideContainer;
