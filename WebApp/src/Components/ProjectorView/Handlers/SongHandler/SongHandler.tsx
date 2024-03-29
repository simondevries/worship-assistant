import styled from '@emotion/styled';
import IResourceReference from 'Interfaces/ResourceReference';
import Song, { songSelectors } from 'Interfaces/Song/Song';
import { ITheme } from 'Interfaces/themes';
import React from 'react';
import GenericTextHandler from '../Common/GenericTextHandler';

const SongHandler = ({
  resourceReference,
  slideIndex,
  activeSongs,
  globalTheme,
  ccliNumber,
  isBlank,
}: {
  resourceReference: IResourceReference;
  slideIndex: number;
  activeSongs: Song[];
  globalTheme: ITheme;
  ccliNumber: string | undefined;
  isBlank: boolean;
}) => {
  const song =
    activeSongs.find((s) => s.id === resourceReference.id) ??
    undefined;

  const lyricsInUserOrder =
    songSelectors.lyricsInUserSpecificedOrder(song);

  if (!lyricsInUserOrder || lyricsInUserOrder.length <= slideIndex) {
    console.warn(
      `Could not find song for resource reference ${resourceReference} at index ${slideIndex}`,
    );
    return null;
  }

  const content = lyricsInUserOrder[slideIndex]?.content ?? '';

  const footer =
    ccliNumber && ccliNumber.trim() !== ''
      ? `CCLI number: ${ccliNumber}`
      : undefined;

  return (
    <GenericTextHandler
      globalTheme={globalTheme}
      text={content}
      footer={footer}
      isBlank={isBlank}
    />
  );
};

export default SongHandler;
