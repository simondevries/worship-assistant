/*global chrome*/
import React, { useState, createContext, useEffect } from 'react';
import logo from './logo.svg';
import { Classes } from '@blueprintjs/core';
import '@blueprintjs/core/lib/css/blueprint.css';
import '@blueprintjs/icons/lib/css/blueprint-icons.css';
import 'normalize.css/normalize.css';
import styled from 'styled-components/macro';
import ControllerPage from './Components/ControllerPage/ControllerPage';
import ProjectorView from './Components/ProjectorView/ProjectorView';
import Search from './Components/Search/Search';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
} from 'react-router-dom';
import Sidebar from './Components/Sidebar/Sidebar';

const StyledControllerPageContainer = styled.div`
  display: flex;
  flex-direction: row;
`;
const StyledApp = styled.div`
  background-color: #293742;
  height: 100%;
`;

const initialState = { resources: [] };

function reducer(state, action) {
  switch (action.type) {
    case 'addResource':
      return { resources: state.resources.concat(acton.payload) };
    case 'moveResource':
      return { count: state.count - 1 };
    case 'removeResource':
      return { count: state.count - 1 };
    default:
      throw new Error();
  }
}

function App() {
  let bc = new BroadcastChannel('test_channel');
  const [store, dispatch] = useReducer(reducer, initialState);
  const [currentSlideNumber, setCurrentSlideNumber] = useState({
    resourceIndex: 0,
    slideIndex: 0,
  });

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
      <Search />
      <Router>
        <Switch>
          <Route path="/" exact>
            <StyledControllerPageContainer>
              <Sidebar />

              <ControllerPage
                resources={currentSchedule}
                updateSlideNumber={updateSlideNumber}
              />
              <input type="button" onClick={onFocusTab} />
            </StyledControllerPageContainer>
          </Route>
          <Route path="/project">
            <ProjectorView
              resources={currentSchedule}
              currentSlideNumber={currentSlideNumber}
            />
          </Route>
        </Switch>
      </Router>
    </StyledApp>
  );
}

export default App;
