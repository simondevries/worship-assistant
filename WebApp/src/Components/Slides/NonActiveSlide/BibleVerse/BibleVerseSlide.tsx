import React, { useState, useEffect } from 'react';
import { Button, Card, Elevation, H5 } from '@blueprintjs/core';
import styled from 'styled-components/macro';
import Verse from '../../../../Interfaces/Verse';
import BaseNonActiveSlide from '../../../../Common/BaseNonActiveSlide/BaseNonActiveSlide';
import BibleVerse from '../../../../Interfaces/BibleVerse';
import { bibleVerseResolver } from '../../../../BibleVerse/bibleVerseResolver';

const StyledCard = styled(Card)`
  width: 300px;
  height: 200px;
  margin-bottom: 10px;
`;

interface Props {
  bibleVerse: BibleVerse;
  slideIndex: number;
  resourceId: string;
}

export default function ({
  bibleVerse,
  slideIndex,
  resourceId,
}: Props) {
  const [bibleVerseContent, setBibleVerse] = useState('');

  useEffect(() => {
    const getVerse = async () => {
      await bibleVerseResolver(bibleVerse).then((res) =>
        setBibleVerse(res),
      );
    };

    getVerse();
  }, [bibleVerse]);

  return (
    <BaseNonActiveSlide
      slideIndex={slideIndex}
      resourceId={resourceId}
    >
      <>{bibleVerseContent}</>
    </BaseNonActiveSlide>
  );
}
