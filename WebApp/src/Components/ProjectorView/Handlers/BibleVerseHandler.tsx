import React from 'react';
import ISongResourceReference from '../../../Interfaces/SongResourceReference';
import IResourceReference from 'Interfaces/ResourceReference';

type Prop = {
  resourceReference: IResourceReference;
};

export default ({ resourceReference }: Prop) => {
  return <div data-testid="bibleVerseHandler">{resourceReference.bibleVerseContent}</div>;
};
