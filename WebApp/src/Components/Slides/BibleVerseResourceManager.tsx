import React from 'react';
import ActiveResourcePointer from '../../Interfaces/ActiveResourcePointer';
import Resource from '../../Interfaces/resource';
import BibleVerseSlide from './NonActiveSlide/BibleVerse/BibleVerseSlide';
import BibleVerse from '../../Interfaces/BibleVerse';
import ActiveBibleVerseSlide from './ActiveSlide/ActiveBibleVerseSlide';

interface Props {
  activeResourcePointer: ActiveResourcePointer;
  isActiveResource: boolean;
  updateSlideNumber: Function;
  resource: Resource;
}

export default function ({
  isActiveResource,
  resource,
  activeResourcePointer,
}: Props) {
  if (isActiveResource) {
    return (
      <ActiveBibleVerseSlide
        bibleVerse={resource as BibleVerse}
      ></ActiveBibleVerseSlide>
    );
  }

  return (
    <BibleVerseSlide
      bibleVerse={resource as BibleVerse}
      slideIndex={0}
      resourceId={resource.id}
    />
  );
}
