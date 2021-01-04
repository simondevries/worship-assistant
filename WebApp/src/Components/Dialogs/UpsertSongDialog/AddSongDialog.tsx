import React, { useState } from 'react';
import {
  Button,
} from '@blueprintjs/core';
import { Dialog, Classes } from '@blueprintjs/core';
import newId from '../../../Helpers/newId';
import SongCreatedEvent from '../../../Events/Domain/songCreatedEvent';
import useEventHandler from '../../../Events/Handlers/useEventHandler';
import SongAddedToScheduleEvent from '../../../Events/Domain/songAddedToScheduleEvent';
import {
  defaultSongTheme,
  lightSongTheme,
} from '../../../Interfaces/themes';
import ISong from '../../../Interfaces/Song';
import SongContent from './SongDialogComponents/SongContent';

export default ({ setSongModalOpen, createSongAtIndex }) => {
  const [raiseEvent] = useEventHandler();

  const [songContent, setSongContent] = useState<any>({
    id: newId(),
    lyrics: [],
    resourceType: 'SONG',
    theme: lightSongTheme,
    properties: {
      title: '',
      artist: '',
      release_date: '',
    },
  } as ISong);

  const saveSong = () => {
    raiseEvent(new SongCreatedEvent(false, songContent));
    setSongModalOpen(false);
  };

  const saveSongAndAddToSet = () => {
    raiseEvent(new SongCreatedEvent(false, songContent));
    raiseEvent(new SongAddedToScheduleEvent(createSongAtIndex, false, songContent));
    setSongModalOpen(false);
  };

  return (
    <>
      <Dialog
        className={Classes.DARK}
        isOpen
        title="Add Song"
        isCloseButtonShown={true}
        onClose={() => setSongModalOpen(false)}
      >
        <div className={Classes.DIALOG_BODY}>
          <SongContent songContent={songContent} songContentSetter={setSongContent}/>
          <div className={Classes.DIALOG_FOOTER_ACTIONS}>
            <Button onClick={() => setSongModalOpen(false)}>
              Close
            </Button>
            <Button onClick={saveSong}>Save</Button>{' '}
            <Button onClick={saveSongAndAddToSet} intent="primary">
              Save and add to Schedule (todo)
            </Button>
          </div>
        </div>
      </Dialog>
    </>
  );
};
