import useBroadcastMessageEventProcessor from './useBroadcastMessageEventProcessor';
import useAppStateEventProcessors from './useAppStateEventProcessor';
import useIndexDbEventProcessor from './useIndexDbEventProcessor';

export default () => {
  const [
    broadCastEventProcessors,
  ] = useBroadcastMessageEventProcessor();
  const [appStateEventProcessors] = useAppStateEventProcessors();
  const [indexDbEventProcessors] = useIndexDbEventProcessor();

  const raiseEvent = (event) => {
    broadCastEventProcessors.forEach((handler) => handler(event));
    appStateEventProcessors.forEach((handler) => handler(event));
    indexDbEventProcessors.forEach((handler) => handler(event));
  };

  return [raiseEvent];
};
