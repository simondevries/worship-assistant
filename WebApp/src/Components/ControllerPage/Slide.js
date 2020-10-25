import React from 'react';
import { Button, Card, Elevation } from '@blueprintjs/core';
import styled from 'styled-components/macro';

const StyledCard = styled(Card)`
  max-width: 300px;
  margin-bottom: 10px;
`;

export default function ({ verseMetadata, onClick }) {
  console.log(JSON.stringify(verseMetadata));
  return (
    <StyledCard
      onClick={onClick}
      interactive={true}
      elevation={Elevation.TWO}
    >
      <h5>
        <a href="#">Verse</a>
      </h5>
      <p>{verseMetadata.content}</p>
    </StyledCard>
  );
}
