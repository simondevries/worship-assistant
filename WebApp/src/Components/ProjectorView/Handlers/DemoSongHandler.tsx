import IResourceReference from 'Interfaces/ResourceReference';
import ISongResourceReference from 'Interfaces/SongResourceReference';
import { ITheme } from 'Interfaces/themes';
import React from 'react';
import { ResourceReferenceBuilder } from 'testBuilders/resourceReferenceBuilder';
import { SongBuilder } from 'testBuilders/songBuilder';
import Song from '../../../Interfaces/Song/Song';
import ISong from '../../../Interfaces/Song/Song';
import SongHandler from './SongHandler/SongHandler';
const DemoSongHandler = ({
  globalTheme,
  ccliNumber,
}: {
  globalTheme: ITheme;
  ccliNumber: string | undefined;
}) => {
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
      ccliNumber={ccliNumber}
    ></SongHandler>
  );
};

export default DemoSongHandler;
