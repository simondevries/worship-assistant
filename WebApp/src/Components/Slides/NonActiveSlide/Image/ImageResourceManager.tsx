import React from 'react';
import { Button, Card, Elevation } from '@blueprintjs/core';
import styled from 'styled-components/macro';
import BaseNonActiveSlide from '../../../../Common/BaseNonActiveSlide/BaseNonActiveSlide';
import IResource from 'Interfaces/resource';
import ImageSlide from './ImageSlide';
import ActiveImageSlide from 'Components/Slides/ActiveSlide/ActiveImageSlide';

interface Props {
  isActiveResource: boolean;
  resource: IResource;
}

const ImageResourceManager = ({
  resource,
  isActiveResource,
}: Props) => {
  return (
    <ImageSlide resource={resource} isActive={isActiveResource} />
  );
};

export default ImageResourceManager;
