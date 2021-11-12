import IResourceReference from 'Interfaces/ResourceReference';
import ISongResourceReference from 'Interfaces/SongResourceReference';
import { ITheme } from 'Interfaces/themes';
import React from 'react';
import { SongBuilder } from 'testBuilders/songBuilder';
import Song from '../../../Interfaces/Song';
import ISong from '../../../Interfaces/Song';

export default ({
  resourceReference,
  slideIndex,
  activeSongs,
  globalTheme,
}: {
  resourceReference: IResourceReference;
  slideIndex: number;
  activeSongs: ISong[];
  globalTheme: ITheme;
}) => {
  const song =
    activeSongs.find((s) => s.id === resourceReference.id) ??
    undefined;

  if (!song) {
    console.warn(
      `Could not find song for resource reference ${resourceReference}`,
    );
    return null;
  }

  return (
    <div style={{ fontSize: globalTheme.fontSize + '%' }}>
      {song && song.lyrics[slideIndex].content}
    </div>
  );
};
