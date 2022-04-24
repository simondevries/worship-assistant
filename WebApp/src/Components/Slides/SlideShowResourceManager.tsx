import React from 'react';
import ActiveResourcePointer from '../../Interfaces/ActiveResourcePointer';
import ResourceReference from '../../Interfaces/ResourceReference';
import ActiveSlideShowSlide from './ActiveSlide/ActiveSlideShowSlide';
import SlideShowSlide from './NonActiveSlide/SlideShow/SlideShowSlide';

interface Props {
  activeResourcePointer: ActiveResourcePointer;
  isActiveResource: boolean;
  updateSlideNumber: Function;
  resource: ResourceReference;
}

export default function slideShowResourceManager({
  isActiveResource,
  resource,
}: Props) {
  if (isActiveResource) {
    return (
      <ActiveSlideShowSlide
        resource={resource}
      ></ActiveSlideShowSlide>
    );
  }

  return (
    <SlideShowSlide
      resource={resource}
      slideIndex={0}
      resourceId={resource.id}
    />
  );
}
