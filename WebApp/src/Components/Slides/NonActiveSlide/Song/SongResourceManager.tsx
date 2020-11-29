import React, { useContext } from 'react';
import { Button, Card, Elevation } from '@blueprintjs/core';
import styled from 'styled-components/macro';
import SongSlide from './SongSlide';
import ActiveSlide from '../../ActiveSlide/ActiveSongSlide';
import { Context } from '../../../../App';
import { State } from '../../../../Interfaces/State';

const StyledSongSlide = styled(SongSlide)`
  width: 300px;
  height: 200px;
  margin-bottom: 10px;
`;

export default function ({
  resourceIndex,
  resource,
  updateSlideNumber,
  activeResourcePointer,
}) {
  const [state]: Array<State> = useContext(Context);
  if (
    !(
      state &&
      state.currentSchedule &&
      state.currentSchedule.activeSongs
    )
  )
    return null;
  const song = state.currentSchedule.activeSongs.find(
    (s) => s.id === resource.id,
  );

  if (!song)
    return <div>Unable to find song with id {resource.id}</div>;

  const onSlideClick = (slideIndex) => {
    updateSlideNumber(slideIndex);
    // todo (Sdv) make generic for all slides

    const element = document.getElementById(
      'slide' + slideIndex + 'resource' + resourceIndex,
    );
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
        inline: 'center',
      });
    } else {
      console.error('Could not find slide');
    }
  };

  return (
    <>
      {song &&
        song.lyrics &&
        song.lyrics.map((verse, slideIndex) => {
          if (
            slideIndex === activeResourcePointer.slideIndex &&
            resourceIndex === activeResourcePointer.resourceIndex
          ) {
            return <ActiveSlide />;
          } else {
            return (
              <StyledSongSlide
                slideIndex={slideIndex}
                resourceIndex={resourceIndex}
                onClick={() => onSlideClick(slideIndex)}
                verse={verse}
              />
            );
          }
        })}
    </>
  );
}
