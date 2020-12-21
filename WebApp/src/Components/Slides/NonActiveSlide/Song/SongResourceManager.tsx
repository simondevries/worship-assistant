import React, { useContext } from 'react';
import { Button, Card, Elevation } from '@blueprintjs/core';
import styled from 'styled-components/macro';
import SongSlide from './SongSlide';
import ActiveSlide from '../../ActiveSlide/ActiveSongSlide';
import { Context } from '../../../../App';
import State from '../../../../Interfaces/State';
import ActiveResourcePointer from '../../../../Interfaces/ActiveResourcePointer';
import Resource from '../../../../Interfaces/resource';

const StyledSongSlide = styled(SongSlide)`
  width: 300px;
  height: 200px;
  margin-bottom: 10px;
`;

interface Props {
  activeResourcePointer: ActiveResourcePointer;
  isActiveResource: boolean;
  updateSlideNumber: Function;
  resource: Resource;
}

export default function ({
  isActiveResource,
  resource,
  updateSlideNumber,
  activeResourcePointer,
}: Props) {
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
    (s) => s && resource && s.id === resource.id,
  );

  if (!song)
    return <div>Unable to find song with id {resource.id}</div>;

  const onSlideClick = (slideIndex) => {
    updateSlideNumber(slideIndex);
    // todo (Sdv) make generic for all slides

    const element = document.getElementById(
      'slide' + slideIndex + 'resource' + resource.id,
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
            isActiveResource &&
            slideIndex === activeResourcePointer.slideIndex
          ) {
            return <ActiveSlide />;
          } else {
            return (
              <StyledSongSlide
                slideIndex={slideIndex}
                onClick={() => onSlideClick(slideIndex)}
                verse={verse}
                resourceId={resource.id}
              />
            );
          }
        })}
    </>
  );
}
