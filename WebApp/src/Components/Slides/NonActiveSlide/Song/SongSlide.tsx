import React, { useContext } from 'react';
import styled from 'styled-components/macro';
import BaseNonActiveSlide from '../../../../Common/BaseNonActiveSlide/BaseNonActiveSlide';
import IVerse from '../../../../Interfaces/Verse';
import useFitText from 'use-fit-text';
import SongPartLabelTag from 'Common/SongPartLabel/SongPartLabelTag';
import IState from 'Interfaces/State';
import { ProjectorViewMode } from 'Interfaces/Schedule';

const StyledBaseNonActiveSlide = styled(BaseNonActiveSlide)<{
  isSelected: boolean;
}>`
  padding: 7px 10px 15px 7px;
`;

interface Props {
  verse: IVerse;
  slideIndex: number;
  resourceId: string;
  isFirstSlide: boolean;
  isLastSlide: boolean;
  onClick: Function;
  isSelected: boolean;
}

const SongSlide = ({
  verse,
  slideIndex,
  resourceId,
  isFirstSlide,
  isLastSlide,
  isSelected,
}: Props) => {
  const { fontSize, ref } = useFitText();

  return (
    <div ref={ref} style={{ fontSize }}>
      <StyledBaseNonActiveSlide
        isSelected={isSelected}
        slideIndex={slideIndex}
        resourceId={resourceId}
        isFirstSlide={isFirstSlide}
        isSelectedSlide={isSelected}
        isLastSlide={isLastSlide}
      >
        <>
          {/* Thumbnail mode */}
          {/*     <StyledProjectorView
        previewMode={true}
        activeResourcePointer={{resourceId: resourceId, slideIndex: slideIndex }}
      /> */}
          <SongPartLabelTag
            index={slideIndex}
            verseName={verse?.name}
          />
          <div className="versecont">
            {verse?.content?.split('\n').map(
              (c) =>
                c && (
                  <>
                    <span>{c}</span>
                    <br />
                  </>
                ),
            ) ?? null}
          </div>
        </>
      </StyledBaseNonActiveSlide>
    </div>
  );
};

export default SongSlide;
