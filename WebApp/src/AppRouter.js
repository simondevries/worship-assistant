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
import {
  Classes,
  ContextMenu,
  Intent,
  Spinner,
} from '@blueprintjs/core';
import Sidebar from './Components/Sidebar/Sidebar';
import hotkeyListenter from './Components/Sidebar/hotkeyListenter';
import { settingsRepo } from './Storage/settingsRepository';
import { scheduleRepo } from './Storage/scheduleRepository';
import { AppToaster } from './Toaster';
import {
  startVideo,
  changeTab,
} from './ChromeExtensionGateway/gateway';

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

  const [isLoadingFromDb, setIsLoadingFromDb] = useState(true);
  const [state, dispatch] = useContext(Context);
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
    // wait for db to initialize... not pretty
    setTimeout(() => {
      async function initState() {
        const settings = await settingsRepo.get();

        dispatch({
          type: 'setSettings',
          payload: settings,
        });

        const schedules = await scheduleRepo.getAll();
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
        console.log(JSON.stringify(currentSchedule));
        dispatch({
          type: 'setCurrentSchedule',
          payload: {
            // todo (sdv) code split across two parts of the app here and scheduleManageDialog create
            ...currentSchedule,
            activeResourcePointer: {
              slideIndex: 0,
              resourceIndex: 0,
            },
            resources: currentSchedule.resources,
          },
        });
        setIsLoadingFromDb(false);
      }
      initState();
    }, 500);

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

  if (isLoadingFromDb) {
    return <StyledSpinner />;
  }

  const activeResourcePointer =
    state &&
    state.currentSchedule &&
    state.currentSchedule.activeResourcePointer;

  return (
    <>
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
