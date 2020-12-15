import React from 'react';
import { Button, Card, Elevation, H5 } from '@blueprintjs/core';
import styled from 'styled-components/macro';
import IVerse from '../../../../Interfaces/Verse';

const StyledCard = styled(Card)`
  width: 300px;
  height: 200px;
  margin-bottom: 10px;
`;

interface Props {
  verse: IVerse;
  onClick: any;
  slideIndex: number;
  resourceIndex: number;
}

export default function ({
  verse,
  onClick,
  slideIndex,
  resourceIndex,
}: Props) {
  return (
    <StyledCard
      id={`slide${slideIndex}resource${resourceIndex}`}
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
