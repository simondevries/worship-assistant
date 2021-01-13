import { useContext } from 'react';
import { Context } from '../App';
import useEventHandler from '../Events/Handlers/useEventHandler';
import SlideChangeEvent from '../Events/Domain/slideChangeEvent';
import ProjectorWindowClosedEvent from '../Events/Domain/projectorWindowClosedEvent';

import IState from '../Interfaces/State';

export default (resourceId, slideIndex) => {
  const [state]: Array<IState> = useContext(Context);
  const [raiseEvent] = useEventHandler();

  const openOrFocus = () => {

    const url = (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') ? 'http://localhost:3000/project' : 'https://beamer-62bc7.web.app/project';

    if (state.hasProjectorsAttached) {
      // this will focus the window
      const w = window.open('', 'wa',
      `width=1000px,height=500px`,);
      console.log(w?.location.href)
      if(w?.location.href === 'about:blank')
        w.location.href = 'http://localhost:3000/project';


    } else {
      let projectorWindow;

      projectorWindow = window.open(
        url,
        'wa',
        `width=500px,height=500px`,
      );


      // took me forever to realise 'unload' works but 'beforeunload' does not
      projectorWindow.addEventListener('unload', function (e) {
        // the absence of a returnValue property on the event will guarantee the browser unload happens
        // Chrome REQUIRES returnValue to be set to empty string
        e.returnValue = '';
        raiseEvent(new ProjectorWindowClosedEvent(false));
        delete e['returnValue'];
      });
    }

          // the Open Projector window button is only present
      // in ActiveSlideContainer.The resourceId and slideIndex
      // is provided to the function call there, which re-raises the
      // slidechange event here, AFTER new window is initialised
      // (hence the 2 sec delay). I don't think this timeout
      // should be a permanent solution.
      console.log('a', resourceId, 'b', slideIndex)
      if (resourceId !== undefined && slideIndex !== undefined) {
        console.log('raising slide change1')
        setTimeout(() => {
          console.log('raising slide change2')
          raiseEvent(
            new SlideChangeEvent(false, resourceId, slideIndex),
          );
        }, 2500);
      }
  };

  return [openOrFocus];
};
