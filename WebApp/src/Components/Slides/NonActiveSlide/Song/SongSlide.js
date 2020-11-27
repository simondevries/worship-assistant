import React from 'react';
import { Button, Card, Elevation } from '@blueprintjs/core';
import styled from 'styled-components/macro';

const StyledCard = styled(Card)`
  width: 300px;
  height: 200px;
  margin-bottom: 10px;
`;

export default function ({
  verse,
  onClick,
  slideIndex,
  resourceIndex,
}) {
  return (
    <StyledCard
      id={`slide${slideIndex}resource${resourceIndex}`}
      onClick={onClick}
      interactive={true}
      elevation={Elevation.TWO}
    >
      <h5>
        <a href="#">Verse</a>
      </h5>
      {verse.content}
    </StyledCard>
  );
}
