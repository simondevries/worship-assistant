import useBroadcastMessageEventProcessor from './useBroadcastMessageEventProcessor';
import useAppStateEventProcessors from './useAppStateEventProcessor';
import useIndexDbEventProcessor from './useIndexDbEventProcessor';
import useGoToSlideProcessor from './useGoToSlideProcessor';
import useDomEventsProcessor from './useDomEventsProcessor';

export default () => {
  const raiseEvent = (event: any) => {
    console.info('event raised: ' + event.eventType);
    try {
      broadCastEventProcessors.forEach((handler) => handler(event));
      appStateEventProcessors.forEach((handler) => handler(event));
      indexDbEventProcessors.forEach((handler) => handler(event));
      useSlideChangeEventProcessors.forEach((handler) =>
        handler(event),
      );
      domEventsProcessor.forEach((handler) => handler(event));
    } catch (e) {
      console.error(e);
    }
  };

  const [
    broadCastEventProcessors,
  ] = useBroadcastMessageEventProcessor();
  const [appStateEventProcessors] = useAppStateEventProcessors();
  const [indexDbEventProcessors] = useIndexDbEventProcessor();
  const [domEventsProcessor] = useDomEventsProcessor();
  const [useSlideChangeEventProcessors] = useGoToSlideProcessor(
    raiseEvent,
  );

  return [raiseEvent];
};
