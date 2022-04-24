import { useState, useContext } from 'react';
import { Context } from '../../Common/Store/Store';

const useModal = (initialMode = false): Array<any> => {
  const [, dispatch] = useContext(Context);

  const [modalOpen, setModalOpen] = useState(initialMode);

  const localSetModalOpen = (value) => {
    if (value === true) {
      dispatch({
        type: 'navigationArrowKeysEnabled',
        payload: false,
      });
    } else {
      dispatch({ type: 'navigationArrowKeysEnabled', payload: true });
    }
    setModalOpen(value);
  };

  const toggle = () => localSetModalOpen(!modalOpen);
  return [modalOpen, localSetModalOpen, toggle];
};

export default useModal;
