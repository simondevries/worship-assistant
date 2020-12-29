import { Context } from '../../App';
import { useContext } from 'react';
import IState from '../../Interfaces/State';
import SlideChangeEvent, {
  SlideChangedEventName,
} from '../Domain/slideChangeEvent';

export default () => {
  const SlideChangeEventHandler = (event: SlideChangeEvent) => {
    if (event.eventType !== SlideChangedEventName) return;

    setTimeout(() => {
      document
        .getElementById('focusable-object--' + event.resourceId)
        ?.focus();

      // console.log('worked', { items });
    }, 1000);
  };
  const arr: Function[] = [SlideChangeEventHandler];
  return [arr];
};
