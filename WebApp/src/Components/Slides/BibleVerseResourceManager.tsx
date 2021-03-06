import React from 'react';
import ActiveResourcePointer from '../../Interfaces/ActiveResourcePointer';
import ResourceReference from '../../Interfaces/ResourceReference';
import BibleVerseSlide from './NonActiveSlide/BibleVerse/BibleVerseSlide';
import BibleVerse from '../../Interfaces/BibleVerse';
import ActiveBibleVerseSlide from './ActiveSlide/ActiveBibleVerseSlide';

interface Props {
  activeResourcePointer: ActiveResourcePointer;
  isActiveResource: boolean;
  updateSlideNumber: Function;
  resource: ResourceReference;
}

export default function ({
  isActiveResource,
  resource,
  activeResourcePointer,
}: Props) {
  if (isActiveResource) {
    return (
      <ActiveBibleVerseSlide
        resource={resource}
      ></ActiveBibleVerseSlide>
    );
  }

  return (
    <BibleVerseSlide
      resource={resource}
      slideIndex={0}
      resourceId={resource.id}
    />
  );
}
