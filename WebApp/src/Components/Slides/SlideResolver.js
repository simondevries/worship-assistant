import React from 'react';
import { Button, Card, Elevation } from '@blueprintjs/core';
import styled from 'styled-components/macro';
import SongResourceManager from './SongResourceManager';
import VideoResourceManager from './NonActiveSlide/Video/VideoResourceManager';
import ImageResourceManager from './NonActiveSlide/Image/ImageResourceManager';
import BibleVerseResourceManager from './BibleVerseResourceManager';

export default function ({
  resource,
  isActiveResource,
  activeResourcePointer,
}) {
  switch (resource.resourceType) {
    case 'SONG':
      return (
        <SongResourceManager
          resource={resource}
          isActiveResource={isActiveResource}
          activeResourcePointer={activeResourcePointer}
        />
      );
    case 'BIBLEVERSE':
      return (
        <BibleVerseResourceManager
          resource={resource}
          isActiveResource={isActiveResource}
          activeResourcePointer={activeResourcePointer}
        />
      );
    case 'VIDEO':
      return (
        <VideoResourceManager
          isActive={isActiveResource}
          resource={resource}
        />
      );
    case 'IMAGE':
      return (
        <ImageResourceManager
          isActive={isActiveResource}
          resource={resource}
        />
      );
    default:
      throw new Error(
        `Unable to resolve resource type ${resource.resourceType}`,
      );
  }
}
