import IState from 'Interfaces/State';
import PongFromProjectorToControllerEvent from './Events/Domain/pongFromProjectorToControllerEvent';
import PingProjectorEventName from './Events/Domain/pingProjector';
import { useState, useEffect, useContext, useCallback } from 'react';
import fetchStatus from './Common/FetchStatus/fetchStatus';
import useModal from './Components/Dialogs/useModal';
import { hasUserFileHandler } from './Interfaces/Schedule';
import useEventHandler from './Events/Handlers/useEventHandler';
import { Context } from 'Common/Store/Store';

function useInitialize(dispatch) {
  console.log(dispatch)
  const [loadingState, setLoadingState] = useState('Loading');
  console.log(setLoadingState)
  const [scheduleModalOpen, setScheduleModalOpen] = useModal(false);
  // const [currentSchedule] = useInitializeState(dispatch, setLoadingState);
  const [state] = useContext(Context);

  const [
    userFileHandlerPermissionManagerOpen,
    setUserFileHandlerPermissionManagerOpen,
  ] = useModal(false);
  /** Only open welcome modal if hasn't come to site recently */
  const checkForModalToOpen = useCallback(() => {
    var ONE_HOUR = 60 * 60 * 1000; /* ms */
    const currentSchedule = (state as IState).currentSchedule;
    const lastUpdated = localStorage.getItem('lastOpened');
    const hasUserFileHandlerInSchedule = hasUserFileHandler(
      currentSchedule,
    );

    if (lastUpdated) {
      const lastOpened = Date.parse(lastUpdated);
      if (Number(new Date()) - lastOpened > ONE_HOUR) {
        setScheduleModalOpen(true);
      } else {
        const isControllerPage =
          window.location.pathname.indexOf('/controller') !== -1;
        if (hasUserFileHandlerInSchedule && isControllerPage) {
          setUserFileHandlerPermissionManagerOpen(true);
        }
      }
    }

    localStorage.setItem('lastOpened', new Date().toISOString());
  }, [state, setScheduleModalOpen, setUserFileHandlerPermissionManagerOpen]);

  useEffect(() => {
    if (loadingState === fetchStatus.Loaded) {
      checkForModalToOpen()
    }
  }, [loadingState, checkForModalToOpen])


  const [raiseEvent] = useEventHandler();

  useEffect(() => {
    const isOnControllerPage = window.location.pathname.indexOf('/project') === -1;
    if (isOnControllerPage) {
      console.log('pinging projector')
      raiseEvent(new PingProjectorEventName(false))
    } else {
      console.log('ponging controller')
      raiseEvent(new PongFromProjectorToControllerEvent(false))
    }
  }, [raiseEvent]);

  return [
    loadingState,
    scheduleModalOpen,
    setScheduleModalOpen,
    userFileHandlerPermissionManagerOpen,
    setUserFileHandlerPermissionManagerOpen,
  ];
}

export default useInitialize;
