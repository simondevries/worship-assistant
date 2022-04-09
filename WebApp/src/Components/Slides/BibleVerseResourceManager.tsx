import React from 'react';
import ActiveResourcePointer from '../../Interfaces/ActiveResourcePointer';
import ResourceReference from '../../Interfaces/ResourceReference';
import BibleVerseSlide from './NonActiveSlide/BibleVerse/BibleVerseSlide';
import BibleVerse, {
  BibleVerseContent,
} from '../../Interfaces/BibleVerse';
import ActiveBibleVerseSlide from './ActiveSlide/ActiveBibleVerseSlide';

interface Props {
  activeResourcePointer: ActiveResourcePointer;
  isActiveResource: boolean;
  updateSlideNumber: Function;
  resource: ResourceReference;
}

const BibleVerseResourceManager = ({
  isActiveResource,
  resource,
  activeResourcePointer,
  updateSlideNumber,
}: Props) => {
  const bibleVerseContent: BibleVerseContent[] =
    resource?.bibleVerseContent ?? [];

  return (
    <>
      {bibleVerseContent.map((verse, indx) => {
        const isActiveSlde =
          isActiveResource &&
          activeResourcePointer.slideIndex === indx;

        if (isActiveSlde) {
          return (
            <ActiveBibleVerseSlide
              resource={resource}
            ></ActiveBibleVerseSlide>
          );
        } else {
          return (
            <div onClick={() => updateSlideNumber(indx)}>
              <BibleVerseSlide
                verseText={verse.text}
                slideIndex={0}
                resourceId={resource.id}
              />
            </div>
          );
        }
      })}
    </>
  );
  //
};

export default BibleVerseResourceManager;
