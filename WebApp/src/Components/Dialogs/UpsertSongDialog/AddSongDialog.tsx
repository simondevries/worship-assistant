import React, { useRef, useState } from 'react';
import { Button, EditableText, FileInput } from '@blueprintjs/core';
import { Dialog, Classes } from '@blueprintjs/core';
import newId from '../../../Helpers/newId';
import SongCreatedEvent from '../../../Events/Domain/songCreatedEvent';
import useEventHandler from '../../../Events/Handlers/useEventHandler';
import SongAddedToScheduleEvent from '../../../Events/Domain/songAddedToScheduleEvent';
import ISong, { songSelectors } from '../../../Interfaces/Song/Song';
import SongEditor from './SongDialogComponents/SongEditor';
import useModal from '../useModal';
import styled from '@emotion/styled';
import songReducers from 'Reducers/SongReducers/songReducers';
import SongPreview from './SongPreview';
import MediumDialog from 'Common/Dialogs/MediumDialog';

const StyledEditableTextTitle = styled(EditableText)`
  font-size: 30px;
  height: 50px;
  width: 100%;
  span {
    height: 40px !important;
  }
`;

const StyledBody = styled.div`
  display: flex;
  gap: 25px;
  margin-top: 30px;
`;

const StyledLeftContent = styled.div`
  min-width: 400px;
`;
const StyledRightContent = styled.div``;

const AddSongDialog = ({
  setAddSongModalOpen,
  createSongAtIndex,
}) => {
  const [raiseEvent] = useEventHandler();

  const [lyricsBeingEdited, setLyricsBeingEdited] =
    useState<string>('');

  const [song, setSong] = useState<ISong>({
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
    raiseEvent(new SongCreatedEvent(false, song));
    if (shouldAddToSchedule) {
      raiseEvent(
        new SongAddedToScheduleEvent(createSongAtIndex, false, song),
      );
    }
    setAddSongModalOpen(false);
  };

  const [titleBeingEdited, setTitleBeingEdited] = useState<string>(
    song.properties.title ?? '',
  );

  return (
    <>
      <MediumDialog
        className={Classes.DARK}
        isOpen
        title="Create a new song"
        isCloseButtonShown={true}
        onClose={() => setAddSongModalOpen(false)}
      >
        <div className={Classes.DIALOG_BODY}>
          <StyledEditableTextTitle
            multiline={false}
            value={titleBeingEdited}
            onChange={setTitleBeingEdited} // only update state variable
            onConfirm={(title) => {
              setSong(songReducers.updateSongTitle(song, title));
            }}
            placeholder={'Add song title here'}
          />
          <StyledBody>
            <StyledLeftContent>
              <SongEditor
                lyrics={lyricsBeingEdited}
                setLyrics={(l) => {
                  setLyricsBeingEdited(l);
                  const updatedSong =
                    songReducers.mapFromHumanReadableToInternal(
                      song,
                      l,
                    );

                  setSong(updatedSong);
                }}
                setSongVerseOrder={(vo) =>
                  setSong(songReducers.updateVerseOrder(song, vo))
                }
                songVerseOrder={
                  song.properties.verseOrderDisplayValueFromUser
                }
              />

              <div
                className={`test ${Classes.DIALOG_FOOTER_ACTIONS}`}
              ></div>
            </StyledLeftContent>
            <StyledRightContent>
              <SongPreview song={song}></SongPreview>
            </StyledRightContent>
          </StyledBody>

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
      </MediumDialog>
    </>
  );
};

export default AddSongDialog;

// const fileField = useRef<HTMLInputElement>(null);

// function handleFileSelected(
//   e: React.ChangeEvent<HTMLInputElement>,
// ): void {
//   if (e.target.files) {
//     const files = Array.from(e.target.files);
//     console.log('files:', files);
//   }
// }

{
  /* Todo import songs */
}
{
  /* <FileInput 
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
            /> */
}
