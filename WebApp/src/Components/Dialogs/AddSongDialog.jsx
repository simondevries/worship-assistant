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
import { songsRepo } from '../../Storage/songsRepository';
import HelpText from './HelpText';

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

export default ({ setAddSongModalOpen }) => {
  const [songContent, setSongContent] = useState({
    // lyrics: [{ type: 'verse', content: '' }],
    // properties: {
    //   title: '',
    // },
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

  const parseAndSaveSong = () => {
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

    const updatedSongContent = {
      ...songContent,
      lyrics: versesMapped,
    };
    songsRepo.add(updatedSongContent, songContent.id);
  };

  const saveSong = () => {
    parseAndSaveSong();
    setAddSongModalOpen(false);
  };

  const saveSongAndAddToSet = () => {
    parseAndSaveSong();
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
            minLines="20"
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
            <Button onClick={saveSongAndAddToSet} intent="Primary">
              Save and add to Schedule (todo)
            </Button>
          </div>
        </div>
      </Dialog>
    </>
  );
};
