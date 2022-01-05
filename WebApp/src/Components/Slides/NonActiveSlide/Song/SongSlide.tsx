import React from 'react';
import styled from 'styled-components/macro';
import BaseNonActiveSlide from '../../../../Common/BaseNonActiveSlide/BaseNonActiveSlide';
import IVerse from '../../../../Interfaces/Verse';
import useFitText from 'use-fit-text';
import SongPartLabel from 'Common/SongPartLabel/SongPartLabel';

const StyledBaseNonActiveSlide = styled(BaseNonActiveSlide)`
  padding: 7px 10px 15px 7px;
`;

interface Props {
  verse: IVerse;
  slideIndex: number;
  resourceId: string;
  isFirstSlide: boolean;
  isLastSlide: boolean;
  onClick: Function;
}

const SongSlide = ({
  verse,
  slideIndex,
  resourceId,
  isFirstSlide,
  isLastSlide,
}: Props) => {
  const { fontSize, ref } = useFitText();

  return (
    <div ref={ref} style={{ fontSize }}>
      <StyledBaseNonActiveSlide
        slideIndex={slideIndex}
        resourceId={resourceId}
        isFirstSlide={isFirstSlide}
        isLastSlide={isLastSlide}
      >
        <>
          {/* Thumbnail mode */}
          {/*     <StyledProjectorView
        previewMode={true}
        activeResourcePointer={{resourceId: resourceId, slideIndex: slideIndex }}
      /> */}
          <SongPartLabel index={slideIndex} verseName={verse?.name} />
          <div className="versecont">
            {' '}
            {verse?.content?.split('\n').map(
              (c) =>
                c && (
                  <>
                    <span>{c}</span>
                    <br />
                  </>
                ),
            ) || ''}
          </div>
        </>
      </StyledBaseNonActiveSlide>
    </div>
  );
};

export default SongSlide;
