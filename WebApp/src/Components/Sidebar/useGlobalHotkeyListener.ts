import { Context } from '../../Common/Store/Store';
import { useContext, useCallback } from 'react';

import { useState, useEffect } from 'react';
import GoToNextSlideEvent from '../../Events/Domain/goToNextSlideEvent';
import GoToPreviousSlideEvent from '../../Events/Domain/goToPreviousSlideEvent';
import useEventHandler from '../../Events/Handlers/useEventHandler';
import IState from '../../Interfaces/State';

const useGlobalHotkeyListener = () => {
  const [keyPressed, setKeyPressed] = useState(false);
  const [state, dispatch] = useContext(Context);
  const [raiseEvent] = useEventHandler();

  const isSlideShowSelected = useCallback(() => {
    const activeResourcePointer = (state as IState).currentSchedule
      .activeResourcePointer;

    const resource = (state as IState).currentSchedule.resources.find(
      (resource) => resource.id === activeResourcePointer.resourceId,
    );
    return resource?.resourceType === 'SLIDESHOW';
  }, [state]);

  useEffect(() => {
    const upHandler = (e) => {
      if (e.key && e.key.toLowerCase() === 'escape') {
        setKeyPressed(true)
        dispatch({
          type: 'setSearchVisible',
          payload: false,
        });
      }

      if (
        e.key.toLowerCase() === 'arrowright' &&
        state.navigationArrowKeysEnabled &&
        !isSlideShowSelected()
      ) {
        setKeyPressed(true)
        e.preventDefault();
        raiseEvent(new GoToNextSlideEvent(false));
      }

      if (
        e.key.toLowerCase() === 'arrowleft' &&
        state.navigationArrowKeysEnabled &&
        !isSlideShowSelected()
      ) {
        setKeyPressed(true)
        e.preventDefault();
        raiseEvent(new GoToPreviousSlideEvent(false));
      }
      if (e.code === "Backquote") {
        setKeyPressed(true)
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

    // keyup used to prevent text from entering search textbox
    window.addEventListener('keyup', upHandler);
    // Remove event listeners on cleanup
    return () => {
      window.removeEventListener('keyup', upHandler);
    };
  }, [state, dispatch, isSlideShowSelected, raiseEvent]); // Empty array ensures that effect is only run on mount and unmount

  return keyPressed;
}

export default useGlobalHotkeyListener;