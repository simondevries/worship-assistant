import React, { useState } from 'react';
import Slide from './Slide';
import ResourceManager from './resourceManager';
import styled from 'styled-components/macro';

const StyledResourcesContainer = styled.div`
  display: flex;
  flex-direction: row;
`;

const StyledControllerPage = styled.div`
  height: 100%;
`;

export default function () {
  const [resources, setResource] = useState([
    {
      title: 'How great thou art',
      slides: [
        { text: 'Slide 1' },
        { text: 'Slide 2' },
        { text: 'Slide 3' },
      ],
    },
    {
      title: 'How great thou art',
      slides: [
        { text: 'Slide 1' },
        { text: 'Slide 2' },
        { text: 'Slide 3' },
      ],
    },
    {
      title: 'How great thou art',
      slides: [
        { text: 'Slide 1' },
        { text: 'Slide 2' },
        { text: 'Slide 3' },
      ],
    },
  ]);

  return (
    <StyledControllerPage>
      <StyledResourcesContainer>
        {resources &&
          resources.map((r) => (
            <ResourceManager resource={r}></ResourceManager>
          ))}
      </StyledResourcesContainer>
    </StyledControllerPage>
  );
}
