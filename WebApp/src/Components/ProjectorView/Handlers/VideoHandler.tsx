import React, { useEffect, useContext, useState } from 'react';
import styled from 'styled-components';
import IResourceReference from '../../../Interfaces/ResourceReference';
import { userFileHandlerRepo } from '../../../Storage/userFileHandlerRepository';
import { Context } from '../../../Common/Store/Store';
import getUrlFromFileHandle from '../../../Helpers/getUrlFromFileHandle';
import IState from '../../../Interfaces/State';

const StyledVideoPlayer = styled.video`
  width: 100%;
  height: 100%;
`;

interface Props {
  resourceReference: IResourceReference;
  previewMode: boolean;
}

export default ({ resourceReference, previewMode }: Props) => {
  const [state] = useContext(Context);

  const activeVideo = (
    state as IState
  )?.currentSchedule?.activeVideos?.find(
    (v) => v.id === resourceReference.id,
  );

  if (!activeVideo) {
    if (previewMode) {
      return (
        <span>
          Unable to display video, ensure you have granted access to
          the file
        </span>
      );
    } else {
      return null;
    }
  }

  return (
    <>
      <StyledVideoPlayer
        id={`videoPlayer-${resourceReference.id}${
          previewMode ? 'sometexttobreakthereference' : '' // todo (sdv) hacks to prevent the video from starting
        }`}
        // controls={!previewMode}
        src={activeVideo?.url}
      ></StyledVideoPlayer>
    </>
  );
};
