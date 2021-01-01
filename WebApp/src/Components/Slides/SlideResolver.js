/**
 * <iframe src="https://docs.google.com/presentation/d/e/2PACX-1vRZXE8EZjGwx0qPjiXJD-dAmO2V9t44lIry_LUEUrEf-KxHwUhmyVkN1R0/embed?start=false&loop=false&delayms=3000" frameborder="0" width="1280" height="749" allowfullscreen="true" mozallowfullscreen="true" webkitallowfullscreen="true"></iframe>
 */

import React from 'react';
import { Button, Card, Elevation } from '@blueprintjs/core';
import styled from 'styled-components/macro';
import SongResourceManager from './SongResourceManager';
import VideoResourceManager from './NonActiveSlide/Video/VideoResourceManager';
import ImageResourceManager from './NonActiveSlide/Image/ImageResourceManager';
import BibleVerseResourceManager from './BibleVerseResourceManager';
import SlideShowResourceManager from './SlideShowResourceManager';

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
          isActiveResource={isActiveResource}
          resource={resource}
        />
      );
    case 'IMAGE':
      return (
        <ImageResourceManager
          isActiveResource={isActiveResource}
          resource={resource}
        />
      );
    case 'SLIDESHOW':
      return (
        <SlideShowResourceManager
          isActiveResource={isActiveResource}
          resource={resource}
        />
      );
    default:
      throw new Error(
        `Unable to resolve resource type ${resource.resourceType}`,
      );
  }
}
