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
        const isActiveSlide =
          isActiveResource &&
          activeResourcePointer.slideIndex === indx;

        return (
          <div onClick={() => updateSlideNumber(indx)}>
            <BibleVerseSlide
              bibleVerseContent={verse}
              slideIndex={indx}
              resourceId={resource.id}
              isActiveSlide={isActiveSlide}
            />
          </div>
        );
      })}
    </>
  );
  //
};

export default BibleVerseResourceManager;
