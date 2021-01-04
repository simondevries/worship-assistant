import { Context } from '../../App';
import { useContext } from 'react';

import { useState, useEffect } from 'react';
import GoToNextSlideEvent from '../../Events/Domain/goToNextSlideEvent';
import GoToPreviousSlideEvent from '../../Events/Domain/goToPreviousSlideEvent';
import useEventHandler from '../../Events/Handlers/useEventHandler';

export default function () {
  const [keyPressed, setKeyPressed] = useState(false);
  const [state, dispatch] = useContext(Context);
  const [raiseEvent] = useEventHandler();

  useEffect(() => {
    const upHandler = (e) => {
      if (e.key && e.key.toLowerCase() === 'escape') {
        dispatch({
          type: 'setSearchVisible',
          payload: false,
        });
      }

      if (
        e.key.toLowerCase() === 'arrowright' &&
        state.navigationArrowKeysEnabled
      ) {
        e.preventDefault();
        raiseEvent(new GoToNextSlideEvent(false));
      }

      if (
        e.key.toLowerCase() === 'arrowleft' &&
        state.navigationArrowKeysEnabled
      ) {
        e.preventDefault();
        raiseEvent(new GoToPreviousSlideEvent(false));
      }

      if (e.key === '/' || e.key === '?') {
        dispatch({
          type: 'setSearchVisible',
          payload: true,
        });
        dispatch({
          type: 'setInsertResourceAtIndex',
          payload: state?.currentSchedule?.resources?.length || 0,
        });
      }
    };

    window.addEventListener('keyup', upHandler);
    // Remove event listeners on cleanup
    return () => {
      window.removeEventListener('keyup', upHandler);
    };
  }, [state, dispatch]); // Empty array ensures that effect is only run on mount and unmount

  return keyPressed;
}
