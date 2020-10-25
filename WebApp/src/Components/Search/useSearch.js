import { useState } from 'react';

export default (initialMode = false) => {
  const [searchOpen, setSearchOpen] = useState(initialMode);
  const toggle = () => setSearchOpen(!searchOpen);
  return [searchOpen, setSearchOpen, toggle];
};
