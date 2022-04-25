import React, { useState, useEffect } from 'react';
import { Button, Card, Elevation, H5 } from '@blueprintjs/core';
import styled from 'styled-components/macro';
import Verse from '../../../../Interfaces/Verse';
import BaseNonActiveSlide from '../../../../Common/BaseNonActiveSlide/BaseNonActiveSlide';
import BibleVerse, {
  BibleVerseContent,
} from '../../../../Interfaces/BibleVerse';
import { bibleVerseResolver } from '../../../../BibleVerse/bibleVerseResolver';
import ResourceReference from '../../../../Interfaces/ResourceReference';
import SongPartLabelTag, {
  StyledTextLabel,
} from 'Common/SongPartLabel/SongPartLabelTag';

const StyledCard = styled(Card)`
  width: 300px;
  height: 200px;
  margin-bottom: 10px;
`;

interface Props {
  slideIndex: number;
  resourceId: string;
  bibleVerseContent: BibleVerseContent;
  isActiveSlide: boolean;
}

const BibleVerseSlide = ({
  bibleVerseContent,
  slideIndex,
  resourceId,
  isActiveSlide,
}: Props) => {
  return (
    <BaseNonActiveSlide
      slideIndex={slideIndex}
      resourceId={resourceId}
      isSelectedSlide={isActiveSlide}
    >
      <StyledTextLabel background={'#ffd6a5'} color={'black'}>
        {bibleVerseContent.bookName} {bibleVerseContent.chapter}:
        {bibleVerseContent.verse}
      </StyledTextLabel>
      <>{bibleVerseContent.text}</>
    </BaseNonActiveSlide>
  );
};

export default BibleVerseSlide;
