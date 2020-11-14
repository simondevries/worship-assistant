import React from 'react';
import { Button, Card, Elevation } from '@blueprintjs/core';
import styled from 'styled-components/macro';
import SongSlide from './SongSlide';
import ActiveSlide from '../../ActiveSlide/ActiveSongSlide';
const StyledCard = styled(Card)`
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
  return (
    <>
      {resource &&
        resource.lyrics &&
        resource.lyrics.map((verse, slideIndex) => {
          if (
            slideIndex === activeResourcePointer.slideIndex &&
            resourceIndex === activeResourcePointer.resourceIndex
          ) {
            return <ActiveSlide />;
          } else {
            return (
              <SongSlide
                onClick={() => updateSlideNumber(slideIndex)}
                verse={verse}
              />
            );
          }
        })}
    </>
  );
}
