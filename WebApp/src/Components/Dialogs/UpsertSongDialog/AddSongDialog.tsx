import React, { useRef, useState } from 'react';
import { Button, FileInput } from '@blueprintjs/core';
import { Dialog, Classes } from '@blueprintjs/core';
import newId from '../../../Helpers/newId';
import SongCreatedEvent from '../../../Events/Domain/songCreatedEvent';
import useEventHandler from '../../../Events/Handlers/useEventHandler';
import SongAddedToScheduleEvent from '../../../Events/Domain/songAddedToScheduleEvent';
import ISong, { songSelectors } from '../../../Interfaces/Song/Song';
import SongContent from './SongDialogComponents/SongEditor';
import useModal from '../useModal';
import styled from '@emotion/styled';
import songReducers from 'Reducers/songReducers';

const AddSongDialog = ({
  setAddSongModalOpen,
  createSongAtIndex,
}) => {
  const [raiseEvent] = useEventHandler();

  const [lyricsBeingEdited, setLyricsBeingEdited] =
    useState<string>('');
  const fileField = useRef<HTMLInputElement>(null);

  function handleFileSelected(
    e: React.ChangeEvent<HTMLInputElement>,
  ): void {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      console.log('files:', files);
    }
  }

  const [song, setSongContent] = useState<ISong>({
    id: newId(),
    lyrics: [],
    resourceType: 'SONG',
    properties: {
      title: '',
      artist: '',
      release_date: '',
      verseOrder: [],
      verseOrderDisplayValue: [],
    },
  } as ISong);

  const saveSong = (shouldAddToSchedule) => {
    const updatedSong = songReducers.updateLyricsFromString(
      song,
      lyricsBeingEdited,
    );
    raiseEvent(new SongCreatedEvent(false, updatedSong));
    if (shouldAddToSchedule) {
      raiseEvent(
        new SongAddedToScheduleEvent(
          createSongAtIndex,
          false,
          updatedSong,
        ),
      );
    }
    setAddSongModalOpen(false);
  };

  return (
    <>
      <Dialog
        className={Classes.DARK}
        isOpen
        title="Create a new song"
        isCloseButtonShown={true}
        onClose={() => setAddSongModalOpen(false)}
      >
        <div className={Classes.DIALOG_BODY}>
          <SongContent
            lyrics={lyricsBeingEdited}
            setLyrics={(l) => setLyricsBeingEdited(l)}
            setSongVerseOrder={(vo) =>
              setSongContent(songReducers.updateVerseOrder(song, vo))
            }
            setTitle={(title) =>
              setSongContent(
                songReducers.updateSongTitle(song, title),
              )
            }
            title={song.properties.title}
            songVerseOrder={
              song.properties.verseOrderDisplayValueFromUser
            }
          />

          <div className={`test ${Classes.DIALOG_FOOTER_ACTIONS}`}>
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
            <Button onClick={() => saveSong(false)}>Save</Button>{' '}
            <Button onClick={() => saveSong(true)} intent="primary">
              Save and Add to Schedule
            </Button>
          </div>
        </div>
      </Dialog>
    </>
  );
};

export default AddSongDialog;
