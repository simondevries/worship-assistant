import { settingsRepo } from './Storage/settingsRepository';
import { scheduleRepo } from './Storage/scheduleRepository';
import { AppToaster } from './Toaster';
import React, { useContext, useState, useEffect } from 'react';
import fetchStatus from './Common/FetchStatus/fetchStatus';
import { Intent } from '@blueprintjs/core';
import useModal from './Components/Dialogs/useModal';

function useIntialize(dispatch) {
  const [loadingState, setLoadingState] = useState(
    fetchStatus.Loading,
  );

  useEffect(() => {
    // wait for db to initialize... not pretty
    setTimeout(() => {
      async function initState() {
        try {
          const settings = await settingsRepo.get();

          dispatch({
            type: 'setSettings',
            payload: settings,
          });

          const schedules = await scheduleRepo.getAll();
          const currentSchedule =
            schedules &&
            settings &&
            schedules.find(
              (s) => s.id === settings.currentScheduleId,
            );
          if (!currentSchedule) {
            // AppToaster.show({
            //   intent: Intent.DANGER,
            //   message:
            //     'Could not find an active service. Go to the schedule dialog and create a new schedule.',
            // });
            throw Error();
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
              resources: currentSchedule.resources,
            },
          });
          setLoadingState(fetchStatus.Loaded);
        } catch (e) {
          setLoadingState(fetchStatus.Failed);
        }
      }
      initState();
    }, 500);
  }, []);
  return [loadingState];
}

export default useIntialize;
