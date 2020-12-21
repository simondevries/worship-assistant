import React from 'react';
import { Button, Card, Elevation } from '@blueprintjs/core';
import styled from 'styled-components/macro';
import SongResourceManager from './Song/SongResourceManager';
import VideoResourceManager from './Video/VideoResourceManager';
import ImageResourceManager from './Image/ImageResourceManager';

export default function ({
  resource,
  isActiveResource,
  updateSlideNumber,
  activeResourcePointer,
}) {
  switch (resource.resourceType) {
    case 'SONG':
      return (
        <SongResourceManager
          resource={resource}
          isActiveResource={isActiveResource}
          updateSlideNumber={updateSlideNumber}
          activeResourcePointer={activeResourcePointer}
        />
      );
    case 'BIBLEVERSE':
      return <div>BIBLE VERSE</div>;
    case 'VIDEO':
      return (
        <VideoResourceManager
          isActive={isActiveResource}
          resource={resource}
          updateSlideNumber={updateSlideNumber}
        />
      );
    case 'IMAGE':
      return (
        <ImageResourceManager
          isActive={isActiveResource}
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
