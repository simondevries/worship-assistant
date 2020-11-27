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
import { Spinner } from '@blueprintjs/core';
import Sidebar from './Components/Sidebar/Sidebar';
import hotkeyListenter from './Components/Sidebar/hotkeyListenter';
import {
  startVideo,
  changeTab,
} from './ChromeExtensionGateway/gateway';
import fetchStatus from './Common/FetchStatus/fetchStatus';
import useIntialize from './useInitialize';
import ScheduleManagerDialog from './Components/Dialogs/ScheduleManagerDialog';
import useModal from './Components/Dialogs/useModal';

const StyledControllerPageContainer = styled.div`
  display: flex;
  flex-direction: row;
  height: 100vh;
`;

const StyledSpinner = styled(Spinner)`
  position: absolute;
  top: 50%;
  left: 50%;
`;

export default function () {
  //todo (sdv) too much going on here
  const [state, dispatch] = useContext(Context);
  const [scheduleModalOpen, setScheduleModalOpen] = useModal(true);
  const [loadingState] = useIntialize(dispatch);
  hotkeyListenter();

  let bc = new BroadcastChannel('test_channel');

  const updateSlideNumber = async (resourceIndex, slideIndex) => {
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

    const activeResource =
      state.currentSchedule.resources[resourceIndex];

    if (
      activeResource.resourceType &&
      activeResource.resourceType.toUpperCase() === 'VIDEO' &&
      activeResource.filePath
    ) {
      changeTab(activeResource.filePath);
    }

    if (
      activeResource.resourceType &&
      activeResource.resourceType.toUpperCase() === 'SONG'
    ) {
      changeTab('/project');
    }
  };
  // todo (Sdv) need a generic name for lyrics
  // Maybe a different projector view for each type of resource
  // const activeResource =
  //   activeResource.lyrics[activeResourcePointer.slideIndex];
  // };

  useEffect(() => {
    bc.onmessage = function (ev) {
      console.log('rece', JSON.stringify(ev.data));
      const currentSlide = JSON.parse(ev.data);

      dispatch({
        type: 'setActiveResourcePointer',
        payload: {
          resourceIndex: currentSlide.resourceIndex,
          slideIndex: currentSlide.slideIndex,
        },
      });
    };
  }, []);

  if (loadingState === fetchStatus.Loading) {
    return <StyledSpinner />;
  }

  const activeResourcePointer =
    state &&
    state.currentSchedule &&
    state.currentSchedule.activeResourcePointer;

  return (
    <>
      {scheduleModalOpen && (
        <ScheduleManagerDialog setOpen={setScheduleModalOpen} />
      )}
      {state.isSearchVisible && <Search />}
      <Router>
        <Switch>
          <Route path="/" exact>
            <div>Go to /operator</div>
          </Route>
          <Route path="/operator" exact>
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
