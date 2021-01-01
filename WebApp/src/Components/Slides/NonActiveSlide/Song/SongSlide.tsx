import React, { useState } from 'react';
import { Button, Card, Elevation, H5 } from '@blueprintjs/core';
import styled from 'styled-components/macro';
import Verse from '../../../../Interfaces/Verse';
import BaseNonActiveSlide from '../../../../Common/BaseNonActiveSlide/BaseNonActiveSlide';
import IVerse from '../../../../Interfaces/Verse';
import useFitText from 'use-fit-text';

const StyledBaseNonActiveSlide = styled(BaseNonActiveSlide)`
  padding: 7px 10px 15px 7px;
`;

const StyledTitleLabel = styled.div`
  background: lightskyblue;
  padding: 1px 9px;
  border-radius: 4px;
  color: black;
  margin-bottom: 10px;
  width: fit-content;
`;

interface Props {
  verse: IVerse;
  onClick: any;
  slideIndex: number;
  resourceId: string;
  isFirstSlide: boolean;
  isLastSlide: boolean;
}

export default function ({
  verse,
  slideIndex,
  resourceId,
  isFirstSlide,
  isLastSlide,
}: Props) {
  const { fontSize, ref } = useFitText();
  return (
    <div ref={ref} style={{ fontSize }}>
      <StyledBaseNonActiveSlide
        slideIndex={slideIndex}
        resourceId={resourceId}
        isFirstSlide={isFirstSlide}
        isLastSlide={isLastSlide}
      >
        <>
          <StyledTitleLabel>Verse {slideIndex + 1}</StyledTitleLabel>
          <div className="versecont">
            {' '}
            {verse?.content?.split('\n').map(
              (c) =>
                c && (
                  <>
                    <span>{c}</span>
                    <br />
                  </>
                ),
            ) || ''}
          </div>
        </>
      </StyledBaseNonActiveSlide>
    </div>
  );
}
