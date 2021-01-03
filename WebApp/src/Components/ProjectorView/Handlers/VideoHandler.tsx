import React, { useEffect, useContext, useState } from 'react';
import styled from 'styled-components';
import IResourceReference from '../../../Interfaces/ResourceReference';
import { userFileHandlerRepo } from '../../../Storage/userFileHandlerRepository';
import { Context } from '../../../App';
import getUrlFromFileHandle from '../../../Helpers/getUrlFromFileHandle';
import IState from '../../../Interfaces/State';

const StyledVideoPlayer = styled.video`
  width: 100%;
  height: 100%;
`;

interface Props {
  resourceReference: IResourceReference;
}

export default ({ resourceReference }: Props) => {
  const [state] = useContext(Context);

  // useEffect(() => {
  //   const loadVideo = async () => {
  //     const url = await getUrlFromFileHandle(resourceReference.id);
  //     setVideoUrl(url);
  //   };

  //   loadVideo();
  // }, []);

  const activeVideo = (state as IState).currentSchedule.activeVideos.find(
    (v) => v.id === resourceReference.id,
  );

  return (
    <>
      Vidz
      <StyledVideoPlayer
        id={`videoPlayer-${resourceReference.id}`}
        src={activeVideo?.url}
      ></StyledVideoPlayer>
    </>
  );
};
