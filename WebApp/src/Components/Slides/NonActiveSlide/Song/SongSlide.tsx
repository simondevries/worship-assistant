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
  padding: 1px 5px;
  border-radius: 3px;
  color: black;
  margin-bottom: 4px;
  width: -webkit-fit-content;
  width: -moz-fit-content;
  width: fit-content;
  font-size: 12px;
`;

const StyledVerseLabel = styled(StyledTitleLabel)`
  background: #4d7b97;
  color: white;
`;

const StyledChorusLabel = styled(StyledTitleLabel)`
  background: #ff8051;
`;

const StyledInstrumentalLabel = styled(StyledTitleLabel)`
  background: #683b3b;
  color: whitesmoke;
`;

const StyledBridgeLabel = styled(StyledTitleLabel)`
  background: #005500;
  color: white;
`;

const StyledPrechorusLabel = styled(StyledTitleLabel)`
  background: #ffaf92;
`;

const StyledNumberLabel = styled(StyledTitleLabel)`
  background: #232e36;
  color: white;
  padding-left: 5px;
  padding-right: 5px;
`;

const StyledLabelContainer = styled.div`
  display: flex;
  gap: 5px;
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

  const labelResolver = (index, verseName: string) => {
    let labels: any[] = [];

    labels.push(<StyledNumberLabel>{index}</StyledNumberLabel>);

    if (verseName && verseName.toLowerCase().startsWith('v')) {
      const number = verseName.slice(1);
      labels.push(
        <StyledVerseLabel>
          Verse{number ? ` ${number}` : ''}
        </StyledVerseLabel>,
      );
    }

    if (verseName && verseName.toLowerCase().startsWith('c')) {
      const number = verseName.slice(1);
      labels.push(
        <StyledChorusLabel>
          Chorus{number ? ` ${number}` : ''}
        </StyledChorusLabel>,
      );
    }

    if (verseName && verseName.toLowerCase().startsWith('b')) {
      const number = verseName.slice(1);
      labels.push(
        <StyledBridgeLabel>
          Bridge{number ? ` ${number}` : ''}
        </StyledBridgeLabel>,
      );
    }

    if (verseName && verseName.toLowerCase().startsWith('p')) {
      const number = verseName.slice(1);
      labels.push(
        <StyledPrechorusLabel>
          Pre-Chorus{number ? ` ${number}` : ''}
        </StyledPrechorusLabel>,
      );
    }

    if (
      (verseName && verseName.toLowerCase().startsWith('i')) ||
      (verseName && verseName.toLowerCase().startsWith('m')) ||
      (verseName && verseName.toLowerCase().startsWith('s')) ||
      (verseName && verseName.toLowerCase().startsWith('o'))
    ) {
      const number = verseName.slice(1);
      labels.push(
        <StyledInstrumentalLabel>
          Instrumental{number ? ` ${number}` : ''}
        </StyledInstrumentalLabel>,
      );
    }

    return <StyledLabelContainer>{labels}</StyledLabelContainer>;
  };

  return (
    <div ref={ref} style={{ fontSize }}>
      <StyledBaseNonActiveSlide
        slideIndex={slideIndex}
        resourceId={resourceId}
        isFirstSlide={isFirstSlide}
        isLastSlide={isLastSlide}
      >
        <>
          {labelResolver(slideIndex, verse?.name)}
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
