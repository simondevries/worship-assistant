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
import HelpText from './HelpText';
import newId from '../../Helpers/newId';
import SongCreatedEvent from '../../Events/Domain/songCreatedEvent';
import type Song from '../../Interfaces/Song';
import useEventHandler from '../../Events/Handlers/useEventHandler';
import SongAddedToScheduleEvent from '../../Events/Domain/songAddedToScheduleEvent';

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

export default ({ setAddSongModalOpen, createSongAtIndex }) => {
  const [raiseEvent] = useEventHandler();

  const [songContent, setSongContent] = useState({
    // lyrics: [{ type: 'verse', content: '' }],
    // properties: {
    //   title: '',
    // },
    id: newId(),
    lyrics: '',
    properties: {
      title: '',
    },
  });

  const updateTitle = (event) => {
    setSongContent({
      ...songContent,
      properties: {
        ...songContent.properties,
        title: event,
      },
    });
  };

  const updateLyrics = (event) => {
    setSongContent({
      ...songContent,
      lyrics: event,
    });
  };

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
    raiseEvent(new SongCreatedEvent(false, song));

    if (addToSchedule) {
      // todo (Sdv) make this raise an event to  add to schedule
      console.log({ createSongAtIndex });
      raiseEvent(
        new SongAddedToScheduleEvent(createSongAtIndex, false, song),
      );
    }
  };

  const saveSong = () => {
    parseAndSaveSong(false);
    setAddSongModalOpen(false);
  };

  const saveSongAndAddToSet = () => {
    parseAndSaveSong(true);
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
          <StyledEditableTextTitle
            multiline={false}
            onConfirm={updateTitle}
          />
          <StyledEditableTextContent
            multiline={true}
            minLines={20}
            onConfirm={updateLyrics}
          />

          <Popover content={<HelpText />} position={Position.TOP}>
            <Button>?</Button>
          </Popover>
          <div className={Classes.DIALOG_FOOTER_ACTIONS}>
            <Button onClick={() => setAddSongModalOpen(false)}>
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
