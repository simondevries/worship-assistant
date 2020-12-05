import { songsRepo } from '../../Storage/songsRepository';
import { useContext } from 'react';
import AppEvent from '../Domain/appEvent';
import SongCreatedEvent, {
  SongCreated,
} from '../Domain/songCreatedEvent';
import { Context } from '../../App';

const useIndexDbEventProcessor = () => {
  const [state, dispatch] = useContext(Context);

  const SongCreatedEventHandler = (event: SongCreatedEvent) => {
    if (
      event.eventType !== SongCreated ||
      !event.addToSchedule ||
      event.isExternalEvent
    )
      return;

    songsRepo.add(event.song, event.song.id);
  };

  const arr = [SongCreatedEventHandler];
  return [arr];
};

export default useIndexDbEventProcessor;
