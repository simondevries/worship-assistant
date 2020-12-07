import { settingsRepo } from './Storage/settingsRepository';
import { scheduleRepo } from './Storage/scheduleRepository';
import { AppToaster } from './Toaster';
import React, { useContext, useState, useEffect } from 'react';
import fetchStatus from './Common/FetchStatus/fetchStatus';
import { Intent } from '@blueprintjs/core';
import useModal from './Components/Dialogs/useModal';
import Schedule from './Interfaces/Schedule';
import { songsRepo } from './Storage/songsRepository';
import SongResourceReference from './Interfaces/SongResourceReference';
import Song from './Interfaces/Song';
import Resource from './Interfaces/resource';
import ResourceReference from './Interfaces/ResourceReference';

function useIntialize(dispatch) {
  const [loadingState, setLoadingState] = useState(
    fetchStatus.Loading,
  );

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
        return;
      }

      const doo = await songsRepo.get(
        (currentSchedule.resources[index] as SongResourceReference)
          .id,
      );
      array = array.concat(doo);
    }
    return array;
  };

  const warnIfNoSchedule = (currentSchedule) => {
    if (!currentSchedule) {
      AppToaster.show({
        intent: Intent.DANGER,
        message:
          'Could not find an active service. Go to the schedule dialog and create a new schedule.',
      });
      throw Error();
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
          resourceIndex: 0,
        },
        resources: currentSchedule.resources,
        activeSongs: activeSongs,
      } as Schedule,
    });
  };

  useEffect(() => {
    // wait for db to initialize... not pretty
    setTimeout(() => {
      async function initState() {
        try {
          const settings = await primeSettings();

          const schedules = await scheduleRepo.getAll();
          const currentSchedule: Schedule =
            schedules &&
            settings &&
            schedules.find(
              (s) => s.id === settings.currentScheduleId,
            );

          warnIfNoSchedule(currentSchedule);

          let activeSongs = await primeActiveSongs(currentSchedule);

          primeState(currentSchedule, activeSongs);

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
