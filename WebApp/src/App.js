/*global chrome*/
import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import '@blueprintjs/core/lib/css/blueprint.css';
import '@blueprintjs/icons/lib/css/blueprint-icons.css';
import 'normalize.css/normalize.css';
import styled from 'styled-components/macro';
import ControllerPage from './Components/ControllerPage/ControllerPage';
import ProjectorView from './Components/ProjectorView/ProjectorView';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
} from 'react-router-dom';

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

  const onFocusTab = () => {
    // The ID of the extension we want to talk to.
    var editorExtensionId = 'idellhgacokfnmoagafaafnndbahoajf';

    // Make a simple request:
    chrome.runtime.sendMessage(
      editorExtensionId,
      { focusUrl: 'https://reactrouter.com/web/guides/quick-start' },
      function (response) {
        // var result = await response();
        // response.then((res) => console.log(JSON.stringify(res)));
        // if (!result.success) console.log('failed to send');
      },
    );
  };

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
      <Router>
        <Switch>
          <Route path="/" exact>
            <div>
              <ControllerPage
                resources={resources}
                updateSlideNumber={updateSlideNumber}
              />
              <input type="button" onClick={onFocusTab} />
            </div>
          </Route>
          <Route path="/project">
            <ProjectorView
              resources={resources}
              currentSlideNumber={currentSlideNumber}
            />
          </Route>
        </Switch>
      </Router>
    </StyledApp>
  );
}

export default App;
