import React from 'react';
import ISong from '../../../Interfaces/Song';

export default ({ resourceReference, slideIndex, activeSongs }) => {
  const activeSong: ISong = activeSongs.find(
    (s) => s.id === resourceReference.id,
  );

  return (
    <div>{activeSong && activeSong.lyrics[slideIndex].content}</div>
  );
};
