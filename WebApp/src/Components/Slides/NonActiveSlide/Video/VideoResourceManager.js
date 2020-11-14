import React from 'react';
import { Button, Card, Elevation } from '@blueprintjs/core';
import styled from 'styled-components/macro';
import ActiveVideoSlide from '../../ActiveSlide/ActiveVideoSlide';

const StyledCard = styled(Card)`
  width: 300px;
  height: 200px;
  margin-bottom: 10px;
`;

export default function ({ isActive, resource, updateSlideNumber }) {
  if (isActive) {
    return <ActiveVideoSlide resource={resource} />;
  }

  return (
    <StyledCard
      onClick={() => updateSlideNumber(0)}
      interactive={true}
      elevation={Elevation.TWO}
    >
      <p>{resource.title}</p>
      <p>{resource.filePath}</p>
    </StyledCard>
  );
}
