import React, { useContext } from 'react';
import NonActiveSongSlide from './NonActiveSlide/Song/SongSlide';
import { Context } from '../../Common/Store/Store';
import State from '../../Interfaces/State';
import ActiveResourcePointer from '../../Interfaces/ActiveResourcePointer';
import Resource from '../../Interfaces/resource';
import ActiveSongSlide from './ActiveSlide/ActiveSongSlide';
import ActiveVideoSlide from './ActiveSlide/ActiveVideoSlide';
import NonActiveVideoSlide from './NonActiveSlide/Video/NonActiveVideoSlide';

interface Props {
  activeResourcePointer: ActiveResourcePointer;
  isActiveResource: boolean;
  updateSlideNumber: Function;
  resource: any;
}

export default function ({ isActiveResource, resource }: Props) {
  return (
    <NonActiveVideoSlide
      resource={resource}
      slideIndex={0}
      resourceId={resource.id}
      isActive={isActiveResource}
    />
  );
}
