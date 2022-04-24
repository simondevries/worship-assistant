import React from 'react';
import {
  EditableText,
} from '@blueprintjs/core';
import styled from 'styled-components/macro';
import LyricEditor from './LyricEditor';

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  height: 100%;
`;

const StyledSongOrder = styled(EditableText)`
  width: 100%;
  padding: 0px 3px;
`;

type Props = {
  setLyrics: (lyrics: string) => void;
  lyrics: string;
  songVerseOrder: string | undefined;
  setSongVerseOrder: (verseOrder: string) => void;
};

const SongEditor = ({
  setLyrics,
  lyrics,
  songVerseOrder,
  setSongVerseOrder,
}: Props) => {
  return (
    <StyledContainer>
      <LyricEditor lyrics={lyrics} setLyrics={setLyrics} />
      <b>Verse Order</b>
      <StyledSongOrder
        multiline={false}
        onChange={setSongVerseOrder}
        value={songVerseOrder ?? ''}
        placeholder={
          '[Optional] Set the song order here. I.e. v1, v2, c, v1, b, c'
        }
      />
      {/* <Popover content={<HelpText />} position={Position.TOP}>
        <Button>?</Button>
      </Popover> */}
    </StyledContainer>
  );
};

export default SongEditor;
