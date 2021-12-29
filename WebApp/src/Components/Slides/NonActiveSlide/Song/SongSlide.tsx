import React from 'react';
import styled from 'styled-components/macro';
import BaseNonActiveSlide from '../../../../Common/BaseNonActiveSlide/BaseNonActiveSlide';
import IVerse from '../../../../Interfaces/Verse';
import useFitText from 'use-fit-text';
import ProjectorView from '../../../ProjectorView/ProjectorView';
import { songSelectors } from 'Interfaces/Song/Song';

const StyledBaseNonActiveSlide = styled(BaseNonActiveSlide)`
  padding: 7px 10px 15px 7px;
`;

const StyledTitleLabel = styled.div`
  padding: 1px 5px;
  border-radius: 3px;
  color: black;
  margin-bottom: 4px;
  width: -webkit-fit-content;
  width: -moz-fit-content;
  width: fit-content;
  font-size: 12px;
`;

const StyledNumberLabel = styled(StyledTitleLabel)`
  background: #232e36;
  color: white;
  padding-left: 5px;
  padding-right: 5px;
`;

const StyledVerseNameLabel = styled(StyledTitleLabel)<{
  background: string;
  color: string;
}>`
  background: ${({ background }) =>
    background ? background : 'black'};
  color: ${({ color }) => (color ? color : 'white')};
`;

const StyledLabelContainer = styled.div`
  display: flex;
  gap: 5px;
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

  const labelResolver = (index, verseName: string) => {
    let labels: any[] = [];

    labels.push(<StyledNumberLabel>{index}</StyledNumberLabel>);
    const tagDetails = songSelectors.getSongTagDetails(verseName);

    labels.push(
      <StyledVerseNameLabel
        color={tagDetails.color}
        background={tagDetails.background}
      >
        {tagDetails.readableValue}
      </StyledVerseNameLabel>,
    );
    return <StyledLabelContainer>{labels}</StyledLabelContainer>;
  };

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

          {labelResolver(slideIndex, verse?.name)}
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
