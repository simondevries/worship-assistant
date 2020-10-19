import React, { useState } from 'react';
import logo from './logo.svg';
import '@blueprintjs/core/lib/css/blueprint.css';
import '@blueprintjs/icons/lib/css/blueprint-icons.css';
import 'normalize.css/normalize.css';
import styled from 'styled-components/macro';
import ControllerPage from './Components/ControllerPage/ControllerPage';
import ProjectorView from './Components/ProjectorView/ProjectorView';

const StyledApp = styled.div`
  background-color: #293742;
  height: 100%;
`;

function App() {
  const [currentSlideNumber, setCurrentSlideNumber] = useState({
    resourceIndex: 0,
    slideIndex: 0,
  });
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

  const updateSlideNumber = (resourceIndex, slideIndex) => {
    console.log('process ', resourceIndex, slideIndex);

    // broadcase
    setCurrentSlideNumber({
      resourceIndex: resourceIndex,
      slideIndex: slideIndex,
    });
  };

  return (
    <StyledApp className="bp3-dark">
      <ControllerPage
        resources={resources}
        updateSlideNumber={updateSlideNumber}
      />
      <ProjectorView
        resources={resources}
        currentSlideNumber={currentSlideNumber}
      />
    </StyledApp>
  );
}

export default App;
