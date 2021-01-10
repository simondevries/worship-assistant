import { useContext } from 'react';
import { Context } from '../App';
import useEventHandler from '../Events/Handlers/useEventHandler';
import SlideChangeEvent from '../Events/Domain/slideChangeEvent';
import ProjectorWindowClosedEvent from '../Events/Domain/projectorWindowClosedEvent';

import IState from '../Interfaces/State';

export default (resourceId = undefined, slideIndex = undefined) => {
  const [state]: Array<IState> = useContext(Context);
  const [raiseEvent] = useEventHandler();

  const openOrFocus = () => {
    if (state.hasProjectorsAttached) {
      // this will focus the window
      window.open('', 'wa');
    } else {
      let projectorWindow;
      if (
        !process.env.NODE_ENV ||
        process.env.NODE_ENV === 'development'
      ) {
        projectorWindow = window.open(
          'http://localhost:3000/project',
          'wa',
          `width=500px,height=500px`,
        );
      } else {
        projectorWindow = window.open(
          'https://beamer-62bc7.web.app/project',
          'wa',
          `width=500px,height=500px`,
        );
      }

      // the Open Projector window button is only present
      // in ActiveSlideContainer.The resourceId and slideIndex
      // is provided to the function call there, which re-raises the
      // slidechange event here, AFTER new window is initialised
      // (hence the 2 sec delay). I don't think this timeout
      // should be a permanent solution.
      if (resourceId && slideIndex) {
        setTimeout(() => {
          raiseEvent(
            new SlideChangeEvent(false, resourceId, slideIndex),
          );
        }, 2000);
      }
      // took me forever to realise 'unload' works but 'beforeunload' does not
      projectorWindow.addEventListener('unload', function (e) {
        // the absence of a returnValue property on the event will guarantee the browser unload happens
        // Chrome REQUIRES returnValue to be set to empty string
        e.returnValue = '';
        raiseEvent(new ProjectorWindowClosedEvent(false));
        delete e['returnValue'];
      });
    }
  };

  return [openOrFocus];
};
