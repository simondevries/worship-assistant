import React, { useState } from 'react';
import { Button, Card, Elevation, H5 } from '@blueprintjs/core';
import styled from 'styled-components/macro';
import Verse from '../../../../Interfaces/Verse';
import BaseNonActiveSlide from '../../../../Common/BaseNonActiveSlide/BaseNonActiveSlide';
import IVerse from '../../../../Interfaces/Verse';
import useFitText from 'use-fit-text';
import ResourceReference from '../../../../Interfaces/ResourceReference';

const StyledCard = styled(Card)`
  width: 300px;
  height: 200px;
  margin-bottom: 10px;
`;

interface Props {
  resource: ResourceReference;
  slideIndex: number;
  resourceId: string;
}

const StyledIframe = styled.iframe`
  width: 100%;
  height: 100%;
  pointer-events: none;
`;

export default function ({
  resource,
  slideIndex,
  resourceId,
}: Props) {
  const { fontSize, ref } = useFitText();
  return (
    <div ref={ref} style={{ fontSize }}>
      <BaseNonActiveSlide
        slideIndex={slideIndex}
        resourceId={resourceId}
      >
        <>
          <StyledIframe
            title={resourceId}
            src={resource.embeddedPowerPointUrl}
          />
        </>
      </BaseNonActiveSlide>
    </div>
  );
}
