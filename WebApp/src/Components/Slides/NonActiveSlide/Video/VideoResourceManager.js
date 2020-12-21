import React from 'react';
import { Button, Card, Elevation } from '@blueprintjs/core';
import styled from 'styled-components/macro';
import ActiveVideoSlide from '../../ActiveSlide/ActiveVideoSlide';
import BaseNonActiveSlide from '../../../../Common/BaseNonActiveSlide/BaseNonActiveSlide';

const StyledCard = styled(Card)`
  width: 300px;
  height: 200px;
  margin-bottom: 10px;
`;

export default function ({
  isActive,
  resource,
  slideIndex,
  resourceId,
}) {
  if (isActive) {
    return <ActiveVideoSlide resource={resource} />;
  }

  return (
    <BaseNonActiveSlide
      slideIndex={slideIndex}
      resourceId={resourceId}
    >
      <p>{resource.title}</p>
      <p>{resource.filePath}</p>
    </BaseNonActiveSlide>
  );
}
