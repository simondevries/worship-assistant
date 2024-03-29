import React from 'react';
import ISongResourceReference from '../../../Interfaces/SongResourceReference';
import IResourceReference from 'Interfaces/ResourceReference';
import GenericTextHandler from './Common/GenericTextHandler';
import { ITheme } from 'Interfaces/themes';

type Prop = {
  resourceReference: IResourceReference;
  slideIndex: number;
  globalTheme: ITheme;
  isBlank: boolean;
};

const BibleVerseHandler = ({
  resourceReference,
  slideIndex,
  globalTheme,
  isBlank,
}: Prop) => {
  const selectedContent =
    resourceReference.bibleVerseContent &&
    resourceReference.bibleVerseContent[slideIndex];

  const selectedVerse = selectedContent?.text ?? '';
  let selectedPassageReference = '';

  if (
    selectedContent &&
    selectedContent.bookName &&
    selectedContent.chapter &&
    selectedContent?.verse
  ) {
    selectedPassageReference = `${selectedContent?.bookName ?? ''} ${
      selectedContent?.chapter ?? ''
    }:${selectedContent?.verse}`;
  }

  return (
    <GenericTextHandler
      text={selectedVerse}
      globalTheme={globalTheme}
      footer={selectedPassageReference}
      isBlank={isBlank}
    />
  );
};

export default BibleVerseHandler;
