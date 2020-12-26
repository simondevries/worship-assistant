import React, { useState, useEffect } from 'react';
import { Button, Card, Elevation, H5 } from '@blueprintjs/core';
import styled from 'styled-components/macro';
import Verse from '../../../../Interfaces/Verse';
import BaseNonActiveSlide from '../../../../Common/BaseNonActiveSlide/BaseNonActiveSlide';
import BibleVerse from '../../../../Interfaces/BibleVerse';
import { bibleVerseResolver } from '../../../../BibleVerse/bibleVerseResolver';
import ResourceReference from '../../../../Interfaces/ResourceReference';

const StyledCard = styled(Card)`
  width: 300px;
  height: 200px;
  margin-bottom: 10px;
`;

interface Props {
  slideIndex: number;
  resourceId: string;
  resource: ResourceReference;
}

export default function ({
  resource,
  slideIndex,
  resourceId,
}: Props) {
  return (
    <BaseNonActiveSlide
      slideIndex={slideIndex}
      resourceId={resourceId}
    >
      <>{resource.bibleVerseContent}</>
    </BaseNonActiveSlide>
  );
}
