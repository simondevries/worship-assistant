import React, { useState } from 'react';
import { Button, EditableText } from '@blueprintjs/core';
import { Dialog, Classes } from '@blueprintjs/core';
import styled from 'styled-components/macro';
import addSong from '../../Storage/addSong';

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

export default (setAddSongModalOpen, addSongModalOpen) => {
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

  if (!addSongModalOpen) return;

  const updateTitle = (event) => {
    console.log(JSON.stringify(event));
    setSongContent({
      properties: {
        ...songContent.properties,
        title: event,
      },
      ...songContent,
    });
  };

  const updateLyrics = (event) => {
    setSongContent({
      ...songContent,
      lyrics: event,
    });
  };

  const saveSong = () => {
    addSong(songContent);
  };

  console.log(JSON.stringify(songContent));
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
          <div className={Classes.DIALOG_FOOTER_ACTIONS}>
            <Button onClick={() => setAddSongModalOpen(false)}>
              Close
            </Button>
            <Button onClick={saveSong}>Save</Button>{' '}
            <Button
              onClick={() => setAddSongModalOpen(false)}
              intent="Primary"
            >
              Save and add to Schedule
            </Button>
          </div>
        </div>
      </Dialog>
    </>
  );
};
