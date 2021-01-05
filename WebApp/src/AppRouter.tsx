import React, { useContext, useState, useEffect } from 'react';
import { Context } from './App';
import ControllerPage from './Components/ControllerPage/ControllerPage';
import ProjectorView from './Components/ProjectorView/ProjectorView';
import Search from './Components/Search/Search';
import {
  BrowserRouter as Router,
  Switch,
  Redirect,
  Route,
} from 'react-router-dom';
import styled from 'styled-components/macro';
import { Spinner } from '@blueprintjs/core';
import Sidebar from './Components/Sidebar/Sidebar';
import hotkeyListenter from './Components/Sidebar/hotkeyListenter';
import fetchStatus from './Common/FetchStatus/fetchStatus';
import useIntialize from './useInitialize';
import ScheduleManagerDialog from './Components/Dialogs/ScheduleManagerDialog';
import useBroadcastChannelMessageHandler from './useBroadcastChannelMessageReceiver';
import Tour from 'reactour';
import NotFound from './Components/NotFound/NotFound';
import UserFileHandlerPermissionManagerDialog from './Components/Dialogs/UserFileHandlerPermissionManagerDialog';
import IState from './Interfaces/State';

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

const steps = [
  {
    selector: '.side-bar_add-schedule',
    content: 'This is my first Step',
  },
];

export default function () {
  const [state, dispatch] = useContext(Context);
  const [
    loadingState,
    scheduleModalOpen,
    setScheduleModalOpen,
    userFileHandlerPermissionManagerOpen,
    setUserFileHandlerPermissionManagerOpen,
  ] = useIntialize(dispatch);
  const [eventsReceived] = useBroadcastChannelMessageHandler();
  const [isTourOpen, setIsTourOpen] = useState(false);

  const activeResourcePointer = (state as IState)?.currentSchedule
    ?.activeResourcePointer;

  hotkeyListenter();

  if (loadingState === fetchStatus.Loading) {
    return <StyledSpinner />;
  }

  return (
    <>
      <Tour
        steps={steps}
        isOpen={isTourOpen}
        onRequestClose={() => setIsTourOpen(false)}
      />
      {scheduleModalOpen && (
        <ScheduleManagerDialog setOpen={setScheduleModalOpen} />
      )}
      {userFileHandlerPermissionManagerOpen && (
        <UserFileHandlerPermissionManagerDialog
          setOpen={setUserFileHandlerPermissionManagerOpen}
        />
      )}
      {state?.searchBar?.isVisible && <Search />}
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
            <Redirect to="/controller" />
          </Route>
          <Route path="/controller" exact>
            <StyledControllerPageContainer>
              <Sidebar />

              <ControllerPage />
              {/* <input type="button" onClick={onFocusTab} /> */}
            </StyledControllerPageContainer>
          </Route>
          <Route path="/project" exact>
            <ProjectorView
              previewMode={false}
              activeResourcePointer={activeResourcePointer}
            />
          </Route>
          <Route>
            <NotFound />
          </Route>
        </Switch>
      </Router>
    </>
  );
}
