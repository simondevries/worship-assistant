import React, { useState } from 'react';
import { Button, Card, Elevation, H5 } from '@blueprintjs/core';
import styled from 'styled-components/macro';
import Verse from '../../../../Interfaces/Verse';
import BaseNonActiveSlide from '../../../../Common/BaseNonActiveSlide/BaseNonActiveSlide';
import IVerse from '../../../../Interfaces/Verse';
import useFitText from "use-fit-text";
import ProjectorView from '../../../ProjectorView/ProjectorView';

const StyledCard = styled(Card)`
  width: 300px;
  height: 200px;
  margin-bottom: 10px;
`;

const StyledProjectorView = styled(ProjectorView)`
  height: 150px;
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
  const { fontSize, ref } = useFitText();
  return (
    <StyledCard
      id={`slide${slideIndex}resource${resourceIndex}`}
      onClick={onClick}
      interactive={true}
      elevation={Elevation.TWO}>
      <StyledProjectorView
        previewMode={true}
        activeResourcePointer={{resourceIndex: resourceIndex, slideIndex: slideIndex }}
        className
      />
    </StyledCard>
    // <div ref={ref} style={{ fontSize }}>
      
    //   <StyledCard
    //     id={`slide${slideIndex}resource${resourceIndex}`}
    //     onClick={onClick}
    //     interactive={true}
    //     elevation={Elevation.TWO}
    //   >
    //     <H5>
    //       <a href="#">Verse</a>
    //     </H5>
    //     {verse.content}
    //   </StyledCard>
    // </div>
  );
}
