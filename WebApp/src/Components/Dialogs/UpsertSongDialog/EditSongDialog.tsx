import React, { useEffect, useState } from 'react';
import {
  Button,
} from '@blueprintjs/core';
import { Dialog, Classes } from '@blueprintjs/core';
import useEventHandler from '../../../Events/Handlers/useEventHandler';
import SongEditedEvent from '../../../Events/Domain/songEditedEvent';
import ISong from '../../../Interfaces/Song';
import SongContent from './SongDialogComponents/SongContent';
import { songsRepo } from '../../../Storage/songsRepository';

export default ({ setEditSongModalOpen, songId }) => {
  const [raiseEvent] = useEventHandler();
  const [isSongLoaded, setSongLoaded] = useState<Boolean>(false);
  const [songContent, setSongContent] = useState<ISong>({} as ISong);
  
  useEffect(() => {
    const loadSong = async () => {
      const initSongContent = await songsRepo.get(songId);
      setSongLoaded(true);
      setSongContent(initSongContent);
    }
    loadSong();
  }, [songId, setSongLoaded, setSongContent])

  const saveSong = () => {
    raiseEvent(new SongEditedEvent(songContent.id, false, songContent));
    setEditSongModalOpen(false);
  };

  if (!isSongLoaded) {
    return null;
  }

  return (
    <>
      <Dialog
        className={Classes.DARK}
        isOpen
        title="Edit Song"
        isCloseButtonShown={true}
        onClose={() => setEditSongModalOpen(false)}
      >
        <div className={Classes.DIALOG_BODY}>
        {songContent && 
        songContent.properties && 
        songContent.properties.title &&
        songContent.lyrics && 
        <SongContent songContent={songContent} songContentSetter={setSongContent}/>}
          <div className={Classes.DIALOG_FOOTER_ACTIONS}>
            <Button onClick={() => setEditSongModalOpen(false)}>
              Close
            </Button>
            <Button onClick={saveSong}>Save</Button>{' '}
          </div>
        </div>
      </Dialog>
    </>
  );
};
