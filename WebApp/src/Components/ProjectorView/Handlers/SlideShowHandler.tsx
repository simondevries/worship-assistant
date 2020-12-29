import React from 'react';
import styled from 'styled-components';
import ResourceReference from '../../../Interfaces/ResourceReference';

const StyledSlideShowPlayer = styled.iframe`
  width: 100%;
  height: 100%;
`;

interface Props {
  resourceReference: ResourceReference;
}

export default ({ resourceReference }: Props) => {
  return (
    <StyledSlideShowPlayer
      id={`focusable-object--${resourceReference.id}`}
      src={resourceReference.embeddedPowerPointUrl}
    ></StyledSlideShowPlayer>
  );
};
