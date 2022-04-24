import React, { useContext } from 'react';
import styled from 'styled-components';
import IResourceReference from '../../../Interfaces/ResourceReference';
import { Context } from '../../../Common/Store/Store';
import IState from '../../../Interfaces/State';

const StyledImage = styled.img`
  object-fit: scale-down;
  /* min-width: 100%; */
  /* min-height: 100%; */
  width: 100%;
  height: 100%;
`;

interface Props {
  resourceReference: IResourceReference;
  previewMode: boolean;
}
const ImageHandler = ({ resourceReference, previewMode }: Props) => {
  const [state] = useContext(Context);

  const activeImage = (
    state as IState
  )?.currentSchedule?.activeImages?.find(
    (v) => v.id === resourceReference.id,
  );

  if (!activeImage) {
    if (previewMode) {
      return <div>Unable to display image, try refresh the page</div>;
    } else {
      return null;
    }
  }

  return (
    // <StyledImageContainer>
    <StyledImage src={activeImage?.url}></StyledImage>
    // </StyledImageContainer>
  );
};

export default ImageHandler;
