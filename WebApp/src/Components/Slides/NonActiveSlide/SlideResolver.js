import React from 'react';
import { Button, Card, Elevation } from '@blueprintjs/core';
import styled from 'styled-components/macro';
import SongResourceManager from './Song/SongResourceManager';
import VideoResourceManager from './Video/VideoResourceManager';
import ImageResourceManager from './Image/ImageResourceManager';

export default function ({
  resource,
  resourceIndex,
  updateSlideNumber,
  activeResourcePointer,
}) {
  const isActive =
    resourceIndex === activeResourcePointer.resourceIndex;

  switch (resource.resourceType) {
    case 'SONG':
      return (
        <SongResourceManager
          resource={resource}
          resourceIndex={resourceIndex}
          updateSlideNumber={updateSlideNumber}
          activeResourcePointer={activeResourcePointer}
        />
      );
    case 'VIDEO':
      return (
        <VideoResourceManager
          isActive={isActive}
          resource={resource}
          updateSlideNumber={updateSlideNumber}
        />
      );
    case 'IMAGE':
      return (
        <ImageResourceManager
          isActive={isActive}
          resource={resource}
          updateSlideNumber={updateSlideNumber}
        />
      );
    default:
      throw new Error(
        `Unable to resolve resource type ${resource.resourceType}`,
      );
  }
}
