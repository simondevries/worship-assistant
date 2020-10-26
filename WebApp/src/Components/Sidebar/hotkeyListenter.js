import { Context } from '../../App';
import { useContext } from 'react';

import { useState, useEffect } from 'react';

// Hook
export default function () {
  // State for keeping track of whether key is pressed
  const [keyPressed, setKeyPressed] = useState(false);
  const [state, dispatch] = useContext(Context);

  // If released key is our target key then set to false
  const upHandler = ({ key }) => {
    if (key && key.toLowerCase() === 'escape') {
      dispatch({
        type: 'setSearchVisible',
        payload: false,
      });
    }

    if (key === '/' || key === '?') {
      dispatch({
        type: 'setSearchVisible',
        payload: true,
      });
    }
  };

  // Add event listeners
  useEffect(() => {
    window.addEventListener('keyup', upHandler);
    // Remove event listeners on cleanup
    return () => {
      window.removeEventListener('keyup', upHandler);
    };
  }, []); // Empty array ensures that effect is only run on mount and unmount

  return keyPressed;
}
