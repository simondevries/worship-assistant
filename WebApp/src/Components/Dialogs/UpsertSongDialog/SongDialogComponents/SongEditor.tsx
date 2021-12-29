import React, { useState } from 'react';
import {
  Button,
  EditableText,
  Popover,
  Position,
} from '@blueprintjs/core';
import styled from 'styled-components/macro';
import HelpText from '../../HelpText';
import LyricEditor from './LyricEditor';

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const StyledEditableTextTitle = styled(EditableText)`
  font-size: 30px;
  height: 50px;
  width: 100%;
  span {
    height: 40px !important;
  }
`;

const StyledSongOrder = styled(EditableText)`
  width: 100%;
  padding: 0px 3px;
`;

type Props = {
  setLyrics: (lyrics: string) => void;
  lyrics: string;
  setTitle: (title: string) => void;
  title: string | undefined;
  songVerseOrder: string | undefined;
  setSongVerseOrder: (verseOrder: string) => void;
};

const SongContent = ({
  setLyrics,
  lyrics,
  setTitle,
  title,
  songVerseOrder,
  setSongVerseOrder,
}: Props) => {
  const [titleBeingEdited, setTitleBeingEdited] = useState<string>(
    title ?? '',
  );
  const [verseOrderBeingEdited, setVerseOrderBeingEdited] =
    useState<string>(songVerseOrder ?? '');

  return (
    <StyledContainer>
      <StyledEditableTextTitle
        multiline={false}
        value={titleBeingEdited}
        onChange={setTitleBeingEdited} // only update state variable
        onConfirm={setTitle}
        placeholder={'Add song title here'}
      />

      <LyricEditor lyrics={lyrics} setLyrics={setLyrics} />
      <StyledSongOrder
        multiline={false}
        onChange={setVerseOrderBeingEdited}
        onConfirm={setSongVerseOrder}
        value={verseOrderBeingEdited}
        placeholder={
          '[Optional] Set the song order here. I.e. v1, v2, c, v1, b, c'
        }
      />
      <Popover content={<HelpText />} position={Position.TOP}>
        <Button>?</Button>
      </Popover>
    </StyledContainer>
  );
};

export default SongContent;
