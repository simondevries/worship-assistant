import React from 'react';
import IResource from 'Interfaces/resource';
import NonActiveImageSlide from './NonActiveImageSlide';
import ActiveImageSlide from 'Components/Slides/ActiveSlide/ActiveImageSlide';

interface Props {
  isActiveResource: boolean;
  resource: IResource;
}

const ImageResourceManager = ({
  resource,
  isActiveResource,
}: Props) => {
  if (isActiveResource) {
    return <ActiveImageSlide resource={resource} />;
  }

  return <NonActiveImageSlide resource={resource} />;
};

export default ImageResourceManager;
