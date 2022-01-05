import React from 'react';
import styled from 'styled-components/macro';
import { songSelectors } from 'Interfaces/Song/Song';

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
  index?: number;
  verseName: string;
  className?: string;
  onClick?: () => void;
}

const SongPartLabel = ({
  index,
  verseName,
  className,
  onClick,
}: Props) => {
  let labels: any[] = [];

  if (index) {
    labels.push(<StyledNumberLabel>{index}</StyledNumberLabel>);
  }
  const tagDetails = songSelectors.getSongTagDetails(verseName);

  labels.push(
    <StyledVerseNameLabel
      color={tagDetails.color}
      background={tagDetails.background}
    >
      {tagDetails.readableValue}
    </StyledVerseNameLabel>,
  );
  return (
    <StyledLabelContainer className={className} onClick={onClick}>
      {labels}
    </StyledLabelContainer>
  );
};

export default SongPartLabel;
