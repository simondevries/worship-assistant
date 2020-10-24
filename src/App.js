import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import '@blueprintjs/core/lib/css/blueprint.css';
import '@blueprintjs/icons/lib/css/blueprint-icons.css';
import 'normalize.css/normalize.css';
import styled from 'styled-components/macro';
import ControllerPage from './Components/ControllerPage/ControllerPage';
import ProjectorView from './Components/ProjectorView/ProjectorView';
import Search from './Components/Search/Search';

const StyledApp = styled.div`
  background-color: #293742;
  height: 100%;
`;

function App() {
  let bc = new BroadcastChannel('test_channel');

  useEffect(() => {
    console.log('welcome papya');
  }, []);

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
    const currentSlide = {
      resourceIndex: resourceIndex,
      slideIndex: slideIndex,
    };

    bc.postMessage(JSON.stringify(currentSlide));

    // broadcase
    setCurrentSlideNumber({
      resourceIndex: resourceIndex,
      slideIndex: slideIndex,
    });
  };

  bc.onmessage = function (ev) {
    console.log('apple', ev.data);
    const currentSlide = JSON.parse(ev.data);
    setCurrentSlideNumber(currentSlide);
  };

  return (
    <StyledApp className="bp3-dark">
      <Search/>
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
