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
      window.open('http://localhost:3000/project', 'wa');
    }
  };

  return [openOrFocus];
};
