import React, { useState } from 'react';
import {
  Button,
  EditableText,
  Popover,
  Position,
  Tooltip,
} from '@blueprintjs/core';
import { Dialog, Classes } from '@blueprintjs/core';
import styled from 'styled-components/macro';
import HelpText from '../HelpText';
import newId from '../../../Helpers/newId';
import useEventHandler from '../../../Events/Handlers/useEventHandler';
import SongAddedToScheduleEvent from '../../../Events/Domain/songAddedToScheduleEvent';
import SongEditedEvent from '../../../Events/Domain/songEditedEvent';
import {
  defaultSongTheme,
  lightSongTheme,
} from '../../../Interfaces/themes';
import ISong from '../../../Interfaces/Song';
import SongDialog from './SongDialog';

const StyledEditableTextContent = styled(EditableText)`
  margin-bottom: 30px;
`;

const StyledEditableTextTitle = styled(EditableText)`
  font-size: 30px;
  margin-bottom: 20px;
  height: 50px;
  width: 100%;
  span {
    height: 40px !important;
  }
`;

export default ({ setEditSongModalOpen, initSongContent }) => {
  const [raiseEvent] = useEventHandler();

  const [songContent, setSongContent] = useState<any>(initSongContent);


  const parseAndSaveSong = (addToSchedule) => {
    const verses = songContent.lyrics.split('[').filter((v) => !!v);

    const versesMapped = verses.map((v) => {
      const sections = v.split(']');
      const name = sections[0];
      const content = sections[1];

      return {
        name,
        content,
      };
    });

    const song = {
      ...songContent,
      lyrics: versesMapped,
    };
    raiseEvent(new SongEditedEvent(song.index, false, song));
  };

  const saveSong = () => {
    parseAndSaveSong(false);
    setEditSongModalOpen(false);
  };

//   const saveSongAndAddToSet = () => {
//     setEditSongModalOpen(false);
//   };

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
          <SongDialog songContent={songContent} songContentSetter={setSongContent}/>
          <div className={Classes.DIALOG_FOOTER_ACTIONS}>
            <Button onClick={() => setEditSongModalOpen(false)}>
              Close
            </Button>
            <Button onClick={saveSong}>Save</Button>{' '}
            {/* <Button onClick={saveSongAndAddToSet} intent="primary">
              Save and add to Schedule (todo)
            </Button> */}
          </div>
        </div>
      </Dialog>
    </>
  );
};
