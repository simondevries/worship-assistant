import React from 'react';
import { Button, Card, Elevation } from '@blueprintjs/core';
import styled from 'styled-components/macro';
import BaseNonActiveSlide from '../../../../Common/BaseNonActiveSlide/BaseNonActiveSlide';
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
