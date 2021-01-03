import { useState } from 'react';

export default (initialMode = false): Array<any> => {
  const [modalOpen, setModalOpen] = useState<boolean>(initialMode);
  const toggle = () => setModalOpen(!modalOpen);
  return [modalOpen, setModalOpen, toggle];
};
