import React from 'react';
import { Button, Card, Elevation } from '@blueprintjs/core';
import styled from 'styled-components/macro';
import SongSlide from './SongSlide';

const StyledCard = styled(Card)`
  width: 300px;
  height: 200px;
  margin-bottom: 10px;
`;

export default function ({ resource, updateSlideNumber }) {
  console.log('asd', JSON.stringify(resource));
  return (
    <>
      {resource &&
        resource.lyrics &&
        resource.lyrics.map((verse, slideIndex) => {
          return (
            <SongSlide
              onClick={() => updateSlideNumber(slideIndex)}
              verse={verse}
            />
          );
        })}
    </>
  );
}
