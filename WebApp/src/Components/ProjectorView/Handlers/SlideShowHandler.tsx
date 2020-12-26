import React from 'react';
import styled from 'styled-components';

const StyledSlideShowPlayer = styled.iframe`
  width: 100%;
  height: 100%;
`;

export default ({ resourceReference }) => {
  return (
    <StyledSlideShowPlayer
      id="pptIframe"
      src={resourceReference.embeddedPowerPointUrl}
    ></StyledSlideShowPlayer>
  );
};
