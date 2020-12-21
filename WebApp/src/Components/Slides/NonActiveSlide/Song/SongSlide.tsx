import React from 'react';
import { Button, Card, Elevation, H5 } from '@blueprintjs/core';
import styled from 'styled-components/macro';
import Verse from '../../../../Interfaces/Verse';

const StyledCard = styled(Card)`
  width: 300px;
  height: 200px;
  margin-bottom: 10px;
`;

interface Props {
  verse: Verse;
  onClick: any;
  slideIndex: number;
  resourceId: string;
}

export default function ({
  verse,
  onClick,
  slideIndex,
  resourceId,
}: Props) {
  return (
    <StyledCard
      id={`slide${slideIndex}resource${resourceId}`}
      onClick={onClick}
      interactive={true}
      elevation={Elevation.TWO}
    >
      <H5>
        <a href="#">Verse</a>
      </H5>
      {verse.content}
    </StyledCard>
  );
}
