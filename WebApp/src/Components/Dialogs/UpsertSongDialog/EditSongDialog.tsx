import React, { useEffect, useState } from 'react';
import { Button, EditableText } from '@blueprintjs/core';
import { Dialog, Classes } from '@blueprintjs/core';
import useEventHandler from '../../../Events/Handlers/useEventHandler';
import SongEditedEvent from '../../../Events/Domain/songEditedEvent';
import ISong from '../../../Interfaces/Song/Song';
import SongEditor from './SongDialogComponents/SongEditor';
import { songsRepo } from '../../../Storage/songsRepository';
import MediumDialog from 'Common/Dialogs/MediumDialog';
import SongPreview from './SongPreview';
import styled from 'styled-components';
import songReducers from 'Reducers/SongReducers/songReducers';

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

const StyledDivider = styled.div`
  background: #6d7982;
  width: 3px;
  border-radius: 5px;
  flex-grow: 1;
`;

const StyledLeftContent = styled.div`
  min-width: 400px;
`;
const StyledRightContent = styled.div`
  display: flex;
  justify-content: column;
`;

const EditSongDialog = ({ setEditSongModalOpen, songId }) => {
  const [raiseEvent] = useEventHandler();
  const [isSongLoaded, setSongLoaded] = useState<Boolean>(false);
  const [song, setSong] = useState<ISong>({} as ISong);
  const [lyricsBeingEdited, setLyricsBeingEdited] =
    useState<string>('');

  const [titleBeingEdited, setTitleBeingEdited] = useState<string>(
    song?.properties?.title ?? '',
  );

  useEffect(() => {
    const loadSong = async () => {
      const initSongContent: ISong = await songsRepo.get(songId);
      setSongLoaded(true);
      setSong(initSongContent);
      setLyricsBeingEdited(
        songReducers.mapFromInternalToHumanReadable(
          initSongContent?.lyrics,
        ),
      );
      setTitleBeingEdited(initSongContent?.properties?.title);
    };
    loadSong();
  }, [songId, setSongLoaded, setSong]);

  const saveSong = () => {
    raiseEvent(new SongEditedEvent(song.id, false, song));
    setEditSongModalOpen(false);
  };

  if (!isSongLoaded) {
    return null;
  }

  return (
    <>
      <MediumDialog
        className={Classes.DARK}
        isOpen
        canEscapeKeyClose={true}
        title="Create a new song"
        isCloseButtonShown={true}
        onClose={() => setEditSongModalOpen(false)}
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
                  song?.properties?.verseOrderDisplayValueFromUser ??
                  ''
                }
              />

              <div
                className={`test ${Classes.DIALOG_FOOTER_ACTIONS}`}
              ></div>
            </StyledLeftContent>
            <StyledDivider />
            <StyledRightContent>
              <SongPreview song={song}></SongPreview>
            </StyledRightContent>
          </StyledBody>

          <div className={Classes.DIALOG_FOOTER_ACTIONS}>
            <Button onClick={() => setEditSongModalOpen(false)}>
              Close
            </Button>
            <Button onClick={saveSong} intent="primary">
              Save
            </Button>{' '}
          </div>
        </div>
      </MediumDialog>
    </>
  );
};

export default EditSongDialog;
