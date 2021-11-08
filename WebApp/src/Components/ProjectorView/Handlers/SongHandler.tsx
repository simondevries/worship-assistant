import React from 'react';
import { SongBuilder } from 'testBuilders/songBuilder';
import ISong from '../../../Interfaces/Song';

export default ({
  resourceReference,
  slideIndex,
  activeSongs,
  isDemo,
}) => {
  const resolveActiveSong = (): ISong => {
    if (isDemo) {
      return new SongBuilder().build();
    }

    return activeSongs.find((s) => s.id === resourceReference.id);
  };

  const song = resolveActiveSong();

  return <div>{song && song.lyrics[slideIndex].content}</div>;
};
