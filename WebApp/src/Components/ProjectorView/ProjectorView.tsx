import React, { useContext } from 'react';
import styled from 'styled-components/macro';
import { Context } from '../../App';
import State from '../../Interfaces/State';
import SongResourceReference from '../../Interfaces/SongResourceReference';
import { fileSystemApp } from '../../FileSystem/fileSystemTools';

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
  const [state] = useContext<Array<State>>(Context);
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

  const songReference = resourceReference as SongResourceReference;

  const activeResource =
    state &&
    state.currentSchedule &&
    state.currentSchedule.activeSongs.find(
      (s) => s.id === songReference.id,
    );

  const activeSlide =
    activeResource &&
    activeResource.lyrics[activeResourcePointer.slideIndex];

  return (
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
      <StyledVideo id="videoPlayer" controls />
    </StyledProjectorView>
  );
}
