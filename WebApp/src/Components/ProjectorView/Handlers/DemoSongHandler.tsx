import IResourceReference from 'Interfaces/ResourceReference';
import ISongResourceReference from 'Interfaces/SongResourceReference';
import { ITheme } from 'Interfaces/themes';
import React from 'react';
import { ResourceReferenceBuilder } from 'testBuilders/resourceReferenceBuilder';
import { SongBuilder } from 'testBuilders/songBuilder';
import Song from '../../../Interfaces/Song';
import ISong from '../../../Interfaces/Song';
import SongHandler from './SongHandler';

export default ({ globalTheme }: { globalTheme: ITheme }) => {
  return (
    <SongHandler
      activeSongs={[
        new SongBuilder().withReference('asongreference').build(),
      ]}
      resourceReference={new ResourceReferenceBuilder()
        .withId('asongreference')
        .build()}
      slideIndex={1}
      globalTheme={globalTheme}
    ></SongHandler>
  );
};
