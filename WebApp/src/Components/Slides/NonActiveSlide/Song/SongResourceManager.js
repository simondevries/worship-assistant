import React from 'react';
import { Button, Card, Elevation } from '@blueprintjs/core';
import styled from 'styled-components/macro';
import SongSlide from './SongSlide';
import ActiveSlide from '../../ActiveSlide/ActiveSongSlide';

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
              <StyledSongSlide
                slideIndex={slideIndex}
                resourceIndex={resourceIndex}
                onClick={() => {
                  updateSlideNumber(slideIndex);
                  // todo (Sdv) make generic for all slides

                  document
                    .getElementById(
                      'slide' +
                        slideIndex +
                        'resource' +
                        resourceIndex,
                    )
                    .scrollIntoView({
                      behavior: 'smooth',
                      block: 'center',
                      inline: 'center',
                    });

                  {
                    /* document
                    .getElementById('resource' + resourceIndex)
                    .scrollIntoView({
                      behavior: 'smooth',
                      block: 'center',
                      inline: 'center',
                    }); */
                  }
                }}
                verse={verse}
              />
            );
          }
        })}
    </>
  );
}
