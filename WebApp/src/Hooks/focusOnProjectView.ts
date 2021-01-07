import { useContext } from 'react';
import { Context } from '../App';
import useEventHandler from '../Events/Handlers/useEventHandler';
import SlideChangeEvent from '../Events/Domain/slideChangeEvent';

import IState from '../Interfaces/State';

export default (resourceId=undefined, slideIndex=undefined) => {
  const [state]: Array<IState> = useContext(Context);
  const [raiseEvent] = useEventHandler();

  const openOrFocus = () => {
    if (state.hasProjectorsAttached) {
      // this will focus the window
      window.open('', 'wa');
    } else {
      !process.env.NODE_ENV ||
      process.env.NODE_ENV === 'development'
      ? window.open('http://localhost:3000/project', 'wa', 'width=500px,height=500px')
      : window.open('https://beamer-62bc7.web.app/project', 'wa', 'width=500px,height=500px');
      
      // the Open Projector window button is only present
      // in ActiveSlideContainer.The resourceId and slideIndex 
      // is provided to the function call there, which re-raises the
      // slidechange event here, AFTER new window is initialised 
      // (hence the 2 sec delay). I don't think this timeout 
      // should be a permanent solution.
      if (resourceId && slideIndex) {
        setTimeout(() => {
          raiseEvent(new SlideChangeEvent(false, resourceId, slideIndex));
        }, 2000);
      }
    }
  };

  return [openOrFocus];
};
