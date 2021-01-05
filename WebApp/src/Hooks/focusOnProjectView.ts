import { useContext } from 'react';
import { Context } from '../App';
import IState from '../Interfaces/State';

export default (openIfNotAlreadyOpen?: boolean) => {
  const [state]: Array<IState> = useContext(Context);

  const openOrFocus = () => {
    if (state.hasProjectorsAttached) {
      // this will focus the window
      window.open('', 'wa');
    } else if (openIfNotAlreadyOpen) {
      {
        !process.env.NODE_ENV ||
        process.env.NODE_ENV === 'development'
          ? window.open('http://localhost:3000/project', 'wa')
          : window.open('https://beamer-62bc7.web.app/project', 'wa');
      }
    }
  };

  return [openOrFocus];
};
