/*global chrome*/
import React, { useContext, useState } from 'react';
import { Context } from './App';
import ControllerPage from './Components/ControllerPage/ControllerPage';
import ProjectorView from './Components/ProjectorView/ProjectorView';
import Search from './Components/Search/Search';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
} from 'react-router-dom';
import styled from 'styled-components/macro';
import logo from './logo.svg';
import { Classes, ContextMenu } from '@blueprintjs/core';
import Sidebar from './Components/Sidebar/Sidebar';
import hotkeyListenter from './Components/Sidebar/hotkeyListenter';

const StyledControllerPageContainer = styled.div`
  display: flex;
  flex-direction: row;
`;

export default function () {
  const [state, dispatch] = useContext(Context);
  hotkeyListenter();

  let bc = new BroadcastChannel('test_channel');

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

  // bc.onmessage = function (ev) {
  //   const currentSlide = JSON.parse(ev.data);
  //   setCurrentSlideNumber(currentSlide);
  // };

  return (
    <>
      {state.isSearchVisible && <Search />}
      <Router>
        <Switch>
          <Route path="/" exact>
            <StyledControllerPageContainer>
              <Sidebar />

              <ControllerPage updateSlideNumber={updateSlideNumber} />
              <input type="button" onClick={onFocusTab} />
            </StyledControllerPageContainer>
          </Route>
          <Route path="/project">
            <ProjectorView currentSlideNumber={currentSlideNumber} />
          </Route>
        </Switch>
      </Router>
    </>
  );
}
