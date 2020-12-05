import React, { useContext } from 'react';
import styled from 'styled-components/macro';
import { Context } from '../../App';
import { State } from '../../Interfaces/State';
import SongResourceReference from '../../Interfaces/SongResourceReference';

const StyledProjectorView = styled.div<any>`
  ${(props) => [!props.previewMode ? 'font-size: 100pt;' : '']}
  background: black;
  color: white;
  height: 100%;
  text-align: center;
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

  const resourceReference = state.currentSchedule.resources.find(
    (r) => r.index === activeResourcePointer.resourceIndex,
  );

  // todo (Sdv) need a generic name for lyrics
  // Maybe a different projector view for each type of resource

  if (
    !resourceReference ||
    !resourceReference.resourceType ||
    resourceReference.resourceType.toLowerCase() !== 'song'
  )
    return (
      <div>
        The resource type{' '}
        {!resourceReference
          ? 'unknown'
          : resourceReference.resourceType}
        is not supported yet
      </div>
    );

  const songReference = resourceReference as SongResourceReference;

  const activeResource = state.currentSchedule.activeSongs.find(
    (s) => s.id === songReference.id,
  );
  if (!activeResource) return null;
  const activeSlide =
    activeResource.lyrics[activeResourcePointer.slideIndex];

  console.log('activeResourcePointer', activeResourcePointer);

  return (
    <StyledProjectorView
      previewMode={previewMode}
      className={className}
    >
      {activeSlide.content}
      {/* <img src={resources.image}></img> */}
    </StyledProjectorView>
  );
}
