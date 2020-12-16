import React, { useContext, useState } from 'react';
import styled, { ThemeProvider } from 'styled-components/macro';
import { Context } from '../../App';
import IState from '../../Interfaces/State';
import ISongResourceReference from '../../Interfaces/SongResourceReference';
import { fileSystemApp } from '../../FileSystem/fileSystemTools';
import { defaultSongTheme } from '../../Interfaces/themes';

const StyledVideo = styled.video``;

const StyledProjectorView = styled.div<any>`
  ${(props) => [!props.previewMode ? 'font-size: 100pt;' : '']}
  background: ${(props) => props.theme.backgroundColor};
  color: ${(props) => props.theme.primary};
  font-size: ${(props) => props.theme.fontSize};
  height: 100%;
  text-align: ${(props) => props.theme.textAlign};
`;

/**
 * Projects the lyrics in a tab
 */
export default function ({
  activeResourcePointer,
  previewMode,
  className,
}) {
  const [state] = useContext<Array<IState>>(Context);
  if (!state || !state.currentSchedule) return null;

  const resourceReference =
    state &&
    state.currentSchedule &&
    state.currentSchedule.resources.find(
      (r) => r.index === activeResourcePointer.resourceIndex,
    );

  // todo (Sdv) need a generic name for lyrics
  // Maybe a different projector view for each type of resource

  const errorMessage =
    (!resourceReference ||
      !resourceReference.resourceType ||
      resourceReference.resourceType.toLowerCase() !== 'song') &&
    `The resource type ${
      !resourceReference ? 'unknown ' : resourceReference.resourceType
    } is not supported yet`;

  const songReference = resourceReference as ISongResourceReference;

  const activeResource =
    state &&
    state.currentSchedule &&
    state.currentSchedule.activeSongs.find(
      (s) => s.id === songReference.id,
    );

  const activeSlide =
    activeResource &&
    activeResource.theme &&
    activeResource.lyrics[activeResourcePointer.slideIndex];

  return (
    <ThemeProvider theme={
      (activeResource && activeResource.theme) ? activeResource.theme: defaultSongTheme}>
      <StyledProjectorView
        previewMode={previewMode}
        className={className}
      >
        {/* <iframe
          id="ytplayer"
          title="youtube"
          width="640"
          height="360"
          src="https://www.youtube.com/embed/M7lc1UVf-VE?autoplay=1&origin=http://example.com"
          frameBorder={0}
        ></iframe> */}
        {previewMode === true ? errorMessage : null}
        {!errorMessage && activeSlide && activeSlide.content}
        {/* <StyledVideo id="videoPlayer" controls /> */}
      </StyledProjectorView>
    </ThemeProvider>
  );
}
