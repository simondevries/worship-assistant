import React from 'react';
import ISongResourceReference from '../../../Interfaces/SongResourceReference';
import IResourceReference from 'Interfaces/ResourceReference';
import GenericTextHandler from './Common/GenericTextHandler';
import { ITheme } from 'Interfaces/themes';

type Prop = {
  resourceReference: IResourceReference;
  slideIndex: number;
  globalTheme: ITheme;
};

const BibleVerseHandler = ({
  resourceReference,
  slideIndex,
  globalTheme,
}: Prop) => {
  const selectedVerse =
    (resourceReference.bibleVerseContent &&
      resourceReference.bibleVerseContent[slideIndex]?.text) ??
    '';

  return (
    <GenericTextHandler
      text={selectedVerse}
      globalTheme={globalTheme}
    />
  );
};

export default BibleVerseHandler;
