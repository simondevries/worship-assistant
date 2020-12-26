import React from 'react';
import { Button, Card, Elevation, H5 } from '@blueprintjs/core';
import styled from 'styled-components/macro';
import Verse from '../../../../Interfaces/Verse';
import BaseNonActiveSlide from '../../../../Common/BaseNonActiveSlide/BaseNonActiveSlide';
import IVerse from '../../../../Interfaces/Verse';
import useFitText from 'use-fit-text';

const StyledCard = styled(Card)`
  width: 300px;
  height: 200px;
  margin-bottom: 10px;
`;

interface Props {
  verse: IVerse;
  onClick: any;
  slideIndex: number;
  resourceId: string;
}

export default function ({ verse, slideIndex, resourceId }: Props) {
  const { fontSize, ref } = useFitText();
  return (
    <div ref={ref} style={{ fontSize }}>
      <BaseNonActiveSlide
        slideIndex={slideIndex}
        resourceId={resourceId}
      >
        <>
          {' '}
          <H5>
            <a href="#">Verse</a>
          </H5>
          {verse.content}
        </>
      </BaseNonActiveSlide>
    </div>
  );
}
