import React from 'react';
import { Button, Card, Elevation } from '@blueprintjs/core';
import styled from 'styled-components/macro';

const StyledCard = styled(Card)`
  max-width: 300px;
  margin-bottom: 10px;
`;

export default function ({ slideMetadata, onClick }) {
  return (
    <StyledCard
      onClick={onClick}
      interactive={true}
      elevation={Elevation.TWO}
    >
      <h5>
        <a href="#">{slideMetadata.text}</a>
      </h5>
      <p>Card content</p>
      <Button>Submit</Button>
    </StyledCard>
  );
}
