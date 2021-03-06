import { settingsRepo } from './Storage/settingsRepository';
import { songsRepo } from './Storage/songsRepository';
import { scheduleRepo } from './Storage/scheduleRepository';
import { AppToaster } from './Toaster';
import React, { useContext, useState, useEffect } from 'react';
import fetchStatus from './Common/FetchStatus/fetchStatus';
import { Intent } from '@blueprintjs/core';
import useModal from './Components/Dialogs/useModal';
import ISchedule, { hasUserFileHandler } from './Interfaces/Schedule';
import ISongResourceReference from './Interfaces/SongResourceReference';
import newScheduleCreatedEvent from './Events/Domain/newScheduleCreatedEvent';
import { empty as emptyResource } from './Interfaces/Schedule';
import useEventHandler from './Events/Handlers/useEventHandler';

let bc = new BroadcastChannel('worshipAssistApp');

function useInitialize(dispatch) {
  const [loadingState, setLoadingState] = useState('Loading');
  const [scheduleModalOpen, setScheduleModalOpen] = useModal(false);
  const [
    userFileHandlerPermissionManagerOpen,
    setUserFileHandlerPermissionManagerOpen,
  ] = useModal(false);
  const [raiseEvent] = useEventHandler();

  const primeSettings = async () => {
    const settings = await settingsRepo.get();

    dispatch({
      type: 'setSettings',
      payload: settings,
    });

    return settings;
  };

  const primeActiveSongs = async (currentSchedule) => {
    let array = [];
    for (const index in currentSchedule.resources) {
      if (currentSchedule.resources[index].resourceType !== 'SONG') {
        continue;
      }

      const result = await songsRepo.get(
        (currentSchedule.resources[index] as ISongResourceReference)
          .id,
      );
      if (result) {
        array = array.concat(result);
      }
    }
    return array;
  };

  const handleNoSchedule = (currentSchedule, raiseEvent) => {
    if (!currentSchedule) {
      // AppToaster.show({
      //   intent: Intent.DANGER,
      //   message:
      //     'Could not find an active service. Go to the schedule dialog and create a new schedule.',
      // });
      // throw Error();

      // todo (sdv) hacks
      raiseEvent(new newScheduleCreatedEvent(false, emptyResource()));
      setTimeout(() => {
        window.location.reload();
      }, 500);
    }
  };

  const primeState = (currentSchedule, activeSongs) => {
    dispatch({
      type: 'setCurrentSchedule',
      payload: {
        // todo (sdv) code split across two parts of the app here and scheduleManageDialog create
        ...currentSchedule,
        activeResourcePointer: {
          slideIndex: 0,
          resourceId: null,
        },
        resources: currentSchedule.resources,
        activeSongs: activeSongs,
      } as ISchedule,
    });

    dispatch({ type: 'navigationArrowKeysEnabled', payload: true });
  };

  /** Only open welcome modal if hasn't come to site recently */
  const openModals = (currentSchedule) => {
    var ONE_HOUR = 60 * 60 * 1000; /* ms */

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
  };

  useEffect(() => {
    if (window.location.pathname.indexOf('/project') === -1) {
      bc.postMessage('ping-controller-views-to-project');
    } else {
      bc.postMessage('ping-project-views--to-controller');
    }
  }, []);

  useEffect(() => {
    // wait for db to initialize... not pretty
    setTimeout(() => {
      async function initState() {
        try {
          const settings = await primeSettings();

          const schedules = await scheduleRepo.getAll();
          const currentSchedule: ISchedule =
            schedules &&
            settings &&
            schedules.find(
              (s) => s.id === settings.currentScheduleId,
            );

          handleNoSchedule(currentSchedule, raiseEvent);

          let activeSongs = await primeActiveSongs(currentSchedule);

          primeState(currentSchedule, activeSongs);

          openModals(currentSchedule);

          setLoadingState(fetchStatus.Loaded);
        } catch (e) {
          console.warn(e);
          setLoadingState(fetchStatus.Failed);
        }
      }
      initState();
    }, 500);
  }, []);
  return [
    loadingState,
    scheduleModalOpen,
    setScheduleModalOpen,
    userFileHandlerPermissionManagerOpen,
    setUserFileHandlerPermissionManagerOpen,
  ];
}

export default useInitialize;
