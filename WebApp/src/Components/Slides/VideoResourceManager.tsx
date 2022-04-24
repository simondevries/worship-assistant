import React from 'react';
import ActiveResourcePointer from '../../Interfaces/ActiveResourcePointer';
import ActiveVideoSlide from './ActiveSlide/ActiveVideoSlide';
import NonActiveVideoSlide from './NonActiveSlide/Video/NonActiveVideoSlide';

interface Props {
  activeResourcePointer: ActiveResourcePointer;
  isActiveResource: boolean;
  updateSlideNumber: Function;
  resource: any;
}

export default function videoResourceManager({ isActiveResource, resource }: Props) {
  if (isActiveResource) {
    return <ActiveVideoSlide resource={resource} />;
  }

  return (
    <NonActiveVideoSlide
      resource={resource}
      slideIndex={0}
      resourceId={resource.id}
    />
  );
}
