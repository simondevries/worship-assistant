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

export default ({ songContent, songContentSetter }) => {

  const updateTitle = (event) => {
    songContentSetter({
      ...songContent,
      properties: {
        ...songContent.properties,
        title: event,
      },
    });
  };

  const updateLyrics = (event) => {
    songContentSetter({
      ...songContent,
      lyrics: event,
    });
  };

  return (
    <>
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
    </>
  );
};
