import React from 'react';
import BaseNonActiveSlide from '../../../../Common/BaseNonActiveSlide/BaseNonActiveSlide';

interface Props {
  slideIndex: number;
  resourceId: string;
  verseText: string;
}

export default function bibleVerseSlide({
  verseText,
  slideIndex,
  resourceId,
}: Props) {
  return (
    <BaseNonActiveSlide
      slideIndex={slideIndex}
      resourceId={resourceId}
    >
      <>{verseText}</>
    </BaseNonActiveSlide>
  );
}
