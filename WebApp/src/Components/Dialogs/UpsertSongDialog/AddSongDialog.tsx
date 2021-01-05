import React, { useRef, useState } from 'react';
import { Button, FileInput } from '@blueprintjs/core';
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
import useModal from '../useModal';

export default ({ setAddSongModalOpen, createSongAtIndex }) => {
  const [raiseEvent] = useEventHandler();
  const [
    importSongButtonDisabled,
    setImportSongButtonDisabled,
  ] = useState<boolean>(false);
  const fileField = useRef<HTMLInputElement>(null);

  function handleFileSelected(
    e: React.ChangeEvent<HTMLInputElement>,
  ): void {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      console.log('files:', files);
    }
  }
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
    setAddSongModalOpen(false);
  };

  const saveSongAndAddToSet = () => {
    raiseEvent(new SongCreatedEvent(false, songContent));
    raiseEvent(
      new SongAddedToScheduleEvent(
        createSongAtIndex,
        false,
        songContent,
      ),
    );
    setAddSongModalOpen(false);
  };

  return (
    <>
      <Dialog
        className={Classes.DARK}
        isOpen
        title="Add Song"
        isCloseButtonShown={true}
        onClose={() => setAddSongModalOpen(false)}
      >
        <div className={Classes.DIALOG_BODY}>
          <SongContent
            songContent={songContent}
            songContentSetter={setSongContent}
            setImportSongButtonDisabled={setImportSongButtonDisabled}
          />
          <div className={Classes.DIALOG_FOOTER_ACTIONS}>
            {/* Todo import songs */}
            {/* <FileInput 
              disabled={importSongButtonDisabled} 
              text={"Select file"}
              buttonText={"Import File"}
              fill={true}
              large={true}
              inputProps={
                {
                  id: "file",
                  accept:".sng, .song, .swg, .sbsong, .wow-song, .xml",
                  ref: fileField,
                  onChange: handleFileSelected
                }
              }
            /> */}
          </div>
          <div className={Classes.DIALOG_FOOTER_ACTIONS}>
            <Button onClick={() => setAddSongModalOpen(false)}>
              Close
            </Button>
            <Button onClick={saveSong}>Save</Button>{' '}
            <Button onClick={saveSongAndAddToSet} intent="primary">
              Save and Add to Schedule
            </Button>
          </div>
        </div>
      </Dialog>
    </>
  );
};
