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
import SlideChangeEvent from './Events/Domain/slideChangeEvent';
import useEventHandler from './Events/Handlers/useEventHandler';
import { useLocation } from 'react-router-dom';

const StyledControllerPageContainer = styled.div`
  display: flex;
  flex-direction: row;
  height: 100vh;
`;

const StyledEventsReceived = styled.div`
  position: absolute;
  right: 0;
  width: 300px;
  background: red;
  word-break: break-all;
`;

const StyledSpinner = styled(Spinner)`
  position: absolute;
  top: 50%;
  left: 50%;
`;

export default function () {
  //todo (sdv) too much going on here
  const [state, dispatch] = useContext(Context);
  const [scheduleModalOpen, setScheduleModalOpen] = useModal(false);
  const [loadingState] = useIntialize(dispatch);
  const [raiseEvent] = useEventHandler();
  const [eventsReceived, setEventsRecieved] = useState([]);
  hotkeyListenter();

  /** Only open welcome modal if hasn't come to site recently */
  useEffect(() => {
    var ONE_HOUR = 60 * 60 * 1000; /* ms */
    const lastOpened = Date.parse(localStorage.getItem('lastOpened'));
    if (new Date() - lastOpened > ONE_HOUR) {
      setScheduleModalOpen(true);
    }
    localStorage.setItem('lastOpened', new Date().toISOString());
  }, []);

  let bc = new BroadcastChannel('worshipAssistApp');

  useEffect(() => {
    bc.onmessage = function (ev) {
      console.log('pn', window.location.pathname);
      if (window.location.pathname.indexOf('project') === -1) return;

      const res = JSON.parse(ev.data);
      res.isExternalEvent = true;
      raiseEvent(res);

      setEventsRecieved(eventsReceived.concat([res]));
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
      {!process.env.NODE_ENV ||
        (process.env.NODE_ENV === 'development' && (
          <StyledEventsReceived>
            {eventsReceived.map((e) => (
              <>
                {JSON.stringify(e)}
                {eventsReceived.length}
                <br />
              </>
            ))}
          </StyledEventsReceived>
        ))}
      <Router>
        <Switch>
          <Route path="/" exact>
            <div>Go to /operator</div>
          </Route>
          <Route path="/operator" exact>
            <StyledControllerPageContainer>
              <Sidebar />

              <ControllerPage />
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
