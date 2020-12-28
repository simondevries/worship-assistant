import React from 'react';
import { Button, Card, Elevation } from '@blueprintjs/core';
import styled from 'styled-components/macro';
import SongResourceManager from './SongResourceManager';
import VideoResourceManager from './NonActiveSlide/Video/VideoResourceManager';
import ImageResourceManager from './NonActiveSlide/Image/ImageResourceManager';
import BibleVerseResourceManager from './BibleVerseResourceManager';
import SlideShowResourceManager from './SlideShowResourceManager';

import SlideChangeEvent from '../../Events/Domain/slideChangeEvent';
import useEventHandler from '../../Events/Handlers/useEventHandler';

export default function ({
  resource,
  isActiveResource,
  activeResourcePointer,
}) {
  const [raiseEvent] = useEventHandler();
  const updateSlideNumberLocal = (rInx) => (sInx) => {
    raiseEvent(new SlideChangeEvent(false, rInx, sInx));
  };
  switch (resource.resourceType) {
    case 'SONG':
      return (
        <SongResourceManager
          resource={resource}
          isActiveResource={isActiveResource}
          updateSlideNumber={updateSlideNumberLocal(activeResourcePointer.resourceId)}
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
