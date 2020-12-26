import React from 'react';
import styled from 'styled-components';

const StyledYouTubePlayer = styled.iframe`
  width: 100%;
  height: 100%;
`;

export default ({ resourceReference }) => {
  return (
    <StyledYouTubePlayer
      id="ytplayer"
      title="youtube"
      src={resourceReference.youTubeUrl}
      frameBorder={0}
    ></StyledYouTubePlayer>
  );
};
