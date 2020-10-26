/*global chrome*/
import React, { useContext, useState, useEffect } from 'react';
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
import { Classes, ContextMenu, Intent } from '@blueprintjs/core';
import Sidebar from './Components/Sidebar/Sidebar';
import hotkeyListenter from './Components/Sidebar/hotkeyListenter';
import { get as getSettings } from './Storage/settingsRepository';
import { getAll as getAllSchedules } from './Storage/scheduleRepository';
import { AppToaster } from './Toaster';

const StyledControllerPageContainer = styled.div`
  display: flex;
  flex-direction: row;
  height: 100vh;
`;

export default function () {
  //todo (sdv) too much going on here

  const [state, dispatch] = useContext(Context);
  hotkeyListenter();

  let bc = new BroadcastChannel('test_channel');

  const [activeResourcePointer, setactiveResourcePointer] = useState({
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

    dispatch({
      type: 'setActiveResourcePointer',
      payload: {
        resourceIndex: resourceIndex,
        slideIndex: slideIndex,
      },
    });

    bc.postMessage(JSON.stringify(currentSlide));

    // broadcase
    setactiveResourcePointer({
      resourceIndex: resourceIndex,
      slideIndex: slideIndex,
    });
  };

  useEffect(() => {
    // wait for db to initialize... not pretty
    setTimeout(() => {
      async function initState() {
        const settings = await getSettings();
        console.log('settings', JSON.stringify(settings));
        dispatch({
          type: 'setSettings',
          payload: settings,
        });

        const schedules = await getAllSchedules();
        const currentSchedule =
          schedules &&
          settings &&
          schedules.find((s) => s.id === settings.currentScheduleId);
        if (!currentSchedule) {
          AppToaster.show({
            intent: Intent.DANGER,
            message:
              'Could not find an active service. Go to the schedule dialog and create a new schedule.',
          });
          return;
        }
        dispatch({
          type: 'setCurrentSchedule',
          payload: {
            // todo (sdv) code split across two parts of the app here and scheduleManageDialog create
            ...currentSchedule,
            activeResourcePointer: {
              slideIndex: 0,
              resourceIndex: 0,
            },
          },
        });
      }
      initState();
    }, 500);
  }, []);

  // bc.onmessage = function (ev) {
  //   const currentSlide = JSON.parse(ev.data);
  //   setactiveResourcePointer(currentSlide);
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
              {/* <input type="button" onClick={onFocusTab} /> */}
            </StyledControllerPageContainer>
          </Route>
          <Route path="/project">
            <ProjectorView
              activeResourcePointer={activeResourcePointer}
            />
          </Route>
        </Switch>
      </Router>
    </>
  );
}
