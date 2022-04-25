import React, { useContext, useState, useEffect } from 'react';
import { Context } from './Common/Store/Store';
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
import useGlobalHotkeyListener from './Components/Sidebar/useGlobalHotkeyListener';
import fetchStatus from './Common/FetchStatus/fetchStatus';
import useInitialize from './useInitialize';
import ScheduleManagerDialog from './Components/Dialogs/ScheduleManagerDialog';
import useBroadcastChannelMessageHandler from './Events/useBroadcastChannelMessageReceiver';
import Tour from 'reactour';
import NotFound from './Components/NotFound/NotFound';
import UserFileHandlerPermissionManagerDialog from './Components/Dialogs/UserFileHandlerPermissionManagerDialog';
import IState from './Interfaces/State';
import LoginPage from './Login';
import tourSteps from './tourSteps';
import ProjectorRoute from 'Components/ProjectorRoute/ProjectorRoute';

const StyledControllerPageContainer = styled.div`
  display: flex;
  flex-direction: row;
  height: 100vh;
  gap: 3px;

  .mainPanel {
    flex: 10 1 auto;
  }
  .sideBar {
    flex: 6 1 auto;
    max-width: 350px;
  }
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

const StyledOpenTour = styled.div`
  position: fixed;
  right: 0px;
  color: white;
  background: blue;
  border-radius: 50%;
  top: 90%;
  /* padding: 5px 20px; */
  border-color: white;
  border-style: solid;
  border-width: 1px;
  cursor: pointer;
  width: 40px;
  height: 40px;
  display: flex;
  justify-items: center;
  align-items: center;
  justify-content: center;
`;

const AppRouter = () => {
  const [state, dispatch] = useContext(Context);
  const [
    loadingState,
    scheduleModalOpen,
    setScheduleModalOpen,
    userFileHandlerPermissionManagerOpen,
    setUserFileHandlerPermissionManagerOpen,
  ] = useInitialize(dispatch);
  const [eventsReceived] = useBroadcastChannelMessageHandler();
  const [isTourOpen, setIsTourOpen] = useState(
    false,
    // window.location.pathname.indexOf('controller') !== -1,
  );

  useGlobalHotkeyListener();

  if (loadingState === fetchStatus.Loading) {
    return <StyledSpinner />;
  }
  return (
    <>
      <Tour
        steps={tourSteps}
        isOpen={isTourOpen}
        onRequestClose={() => setIsTourOpen(false)}
      />
      <StyledOpenTour onClick={() => setIsTourOpen(true)}>
        Tour
      </StyledOpenTour>
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
            {eventsReceived.map((e, indx) => (
              <div id={indx.toString()}>
                {JSON.stringify(e)}
                {eventsReceived.length}
                <br />
              </div>
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
              <Sidebar className={'sideBar'} />
              <ControllerPage className={'mainPanel'} />
              {/* <input type="button" onClick={onFocusTab} /> */}
            </StyledControllerPageContainer>
          </Route>
          <Route path="/project" exact>
            <ProjectorRoute />
          </Route>
          <Route path="/googleOAuthRedirect" exact>
            Yay welcome back
          </Route>
          <Route path="/login" exact>
            <LoginPage />
          </Route>
          <Route>
            <NotFound />
          </Route>
        </Switch>
      </Router>
    </>
  );
};

export default AppRouter;
