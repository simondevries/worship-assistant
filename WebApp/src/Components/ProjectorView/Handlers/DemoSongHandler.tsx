import { ITheme } from 'Interfaces/themes';
import React from 'react';
import { ResourceReferenceBuilder } from 'testBuilders/resourceReferenceBuilder';
import { SongBuilder } from 'testBuilders/songBuilder';
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
