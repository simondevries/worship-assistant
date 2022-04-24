import { defaultSettings, ISettings } from './../Interfaces/Settings';
import PongFromProjectorToControllerEvent from '../Events/Domain/pongFromProjectorToControllerEvent';
import PingProjectorEventName from '../Events/Domain/pingProjector';
import { settingsRepo } from './settingsRepository';
import { songsRepo } from './songsRepository';
import { scheduleRepo } from './scheduleRepository';
import { useEffect } from 'react';
import fetchStatus from '../Common/FetchStatus/fetchStatus';
import ISchedule, { emptySchedule, scheduleSchemaMigrator } from '../Interfaces/Schedule';
import ISongResourceReference from '../Interfaces/SongResourceReference';
import newScheduleCreatedEvent from '../Events/Domain/newScheduleCreatedEvent';
import useEventHandler from '../Events/Handlers/useEventHandler';
import UpdateSettingsEvent from 'Events/Domain/updateSettingsEvent';

function useInitializeState(dispatch: (payload: any) => void, setLoadingState: (state: string) => void) {
  const [raiseEvent] = useEventHandler();
  const primeSettings = async () => {
    let settings: ISettings = await settingsRepo.get();

    if (!settings) {
      const schedule = emptySchedule()
      raiseEvent(new newScheduleCreatedEvent(false, schedule));
      settings = { ...defaultSettings, currentScheduleId: schedule.id };
      raiseEvent(new UpdateSettingsEvent(false, settings));
    }

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

  const primeActiveVideos = async (currentSchedule) => {
    // let array = [];
    // const a = currentSchedule.resources.map((resource) => {
    //   if (resource.resourceType !== 'IMAGE') {
    //     continue;
    //   }

    //   await userFileHandlerRepo.get(resource.id);
    // });

    // a.forEach(handle => {

    // })
    return currentSchedule

  }

  const handleNoSchedule = (currentSchedule, raiseEvent) => {
    if (!currentSchedule) {
      // AppToaster.show({
      //   intent: Intent.DANGER,
      //   message:
      //     'Could not find an active service. Go to the schedule dialog and create a new schedule.',
      // });
      // throw Error();

      // todo (sdv) hacks
      raiseEvent(new newScheduleCreatedEvent(false, emptySchedule()));
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

  useEffect(() => {
    // wait for db to initialize... not pretty
    setTimeout(() => {
      async function initState() {
        try {
          const settings = await primeSettings();

          const schedules = await scheduleRepo.getAll();
          let currentSchedule: ISchedule =
            schedules &&
            settings &&
            schedules.find(
              (s) => s.id === settings.currentScheduleId,
            )


          currentSchedule = scheduleSchemaMigrator(currentSchedule)

          handleNoSchedule(currentSchedule, raiseEvent);

          let activeSongs = await primeActiveSongs(currentSchedule);

          primeState(currentSchedule, activeSongs);

          primeActiveVideos(currentSchedule);

          setLoadingState(fetchStatus.Loaded);

        } catch (e) {
          console.warn(e);
          setLoadingState(fetchStatus.Failed);
        }
      }
      initState();
    }, 500);
  }, [raiseEvent, primeSettings, primeState, setLoadingState]);

  return [

  ];
}

export default useInitializeState;
