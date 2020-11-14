import React, { useContext } from 'react';
import styled from 'styled-components/macro';
import { Context } from '../../App';

const StyledProjectorView = styled.div`
  ${(props) => [!props.previewMode ? 'font-size: 100pt;' : '']}
  background: black;
  color: white;
  height: 100%;
  text-align: center;
`;

/**
 * Projects the lyrics in a tab
 */
export default function ({ activeResourcePointer, previewMode }) {
  const [state, dispatch] = useContext(Context);
  if (!state || !state.currentSchedule) return null;

  const activeResource =
    state.currentSchedule.resources[
      activeResourcePointer.resourceIndex
    ];

  // todo (Sdv) need a generic name for lyrics
  // Maybe a different projector view for each type of resource

  if (activeResource.resourceType.toLowerCase() !== 'song')
    return null;

  const activeSlide =
    activeResource.lyrics[activeResourcePointer.slideIndex];

  console.log('activeResourcePointer', activeResourcePointer);

  return (
    <StyledProjectorView previewMode={previewMode}>
      {activeSlide.content}
      {/* <img src={resources.image}></img> */}
    </StyledProjectorView>
  );
}
