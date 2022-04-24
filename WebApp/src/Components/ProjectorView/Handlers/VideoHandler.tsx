import React, { useContext } from 'react';
import styled from 'styled-components';
import IResourceReference from '../../../Interfaces/ResourceReference';
import { Context } from '../../../Common/Store/Store';
import IState from '../../../Interfaces/State';

const StyledVideoPlayer = styled.video`
  width: 100%;
  height: 100%;
`;

interface Props {
  resourceReference: IResourceReference;
  previewMode: boolean;
}

const VideoHandler = ({ resourceReference, previewMode }: Props) => {
  const [state] = useContext(Context);

  const activeVideo = (state as IState)?.currentSchedule?.activeVideos?.find(
    (v) => v.id === resourceReference.id,
  );

  if (!activeVideo) {
    if (previewMode) {
      return (
        <div>
          Unable to display video, ensure you have granted access to
          the file
        </div>
      );
    } else {
      return null;
    }
  }

  return (
    <>
      <StyledVideoPlayer
        id={`videoPlayer-${resourceReference.id}${previewMode ? 'sometexttobreakthereference' : '' // todo (sdv) hacks to prevent the video from starting
          }`}
        // controls={!previewMode}
        src={activeVideo?.url}
      ></StyledVideoPlayer>
    </>
  );
};

export default VideoHandler;