import React, { useEffect, useState } from 'react';
import {
  Button,
  Classes,
  EditableText,
  Popover,
  Position,
} from '@blueprintjs/core';
import styled from 'styled-components/macro';
import HelpText from '../../HelpText';
import Song, { Lyrics, songSelectors } from 'Interfaces/Song/Song';

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const StyledEditableTextContent = styled(EditableText)`
  margin-bottom: 30px;
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
  songContent: Song;
  songContentSetter: (song: Song) => void;
  setImportSongButtonDisabled: (a: any) => void;
};

const SongContent = ({
  songContent,
  songContentSetter,
  setImportSongButtonDisabled,
}: Props) => {
  const [titleBeingEdited, setTitleBeingEdited] = useState<string>(
    songContent?.properties?.title,
  );
  const [verseOrderBeingEdited, setVerseOrderBeingEdited] =
    useState<string>(
      songContent?.properties?.verseOrderDisplayValueFromUser ?? '',
    );
  const [lyricsBeingEdited, setLyricsBeingEdited] = useState<string>(
    songContent?.lyrics
      ?.map((lyric) => '[' + lyric.name + ']' + lyric.content)
      .join('\n'),
  );

  useEffect(() => {
    setImportSongButtonDisabled(
      titleBeingEdited || lyricsBeingEdited,
    );
  }, [
    setImportSongButtonDisabled,
    titleBeingEdited,
    lyricsBeingEdited,
  ]);

  // Actually set song content title
  const updateSongContentTitle = (event) => {
    songContentSetter({
      ...songContent,
      properties: {
        ...songContent.properties,
        title: event,
      },
    });
  };

  // Actually set song content title
  const updateSongVerseOrder = (event) => {
    const contentArr =
      !!event && event.length ? event.split(',') : [];
    songContentSetter({
      ...songContent,
      properties: {
        ...songContent.properties,
        verseOrder: contentArr.map((item) =>
          songSelectors.toInternalVerseTag(item),
        ),
        verseOrderDisplayValueFromUser: contentArr
          .map((item) => item.trim().replace(/\s\s+/g, ' '))
          .join(', '),
      },
    });
  };

  // Actually set song content lyrics
  const updateSongContentLyrics = (event) => {
    if (event?.indexOf('[') === -1) {
      alert(
        'No verse tags added! \nPlease break up your song into sections using tags (e.g. [v1], [c], etc',
      );
      return;
    }
    const verses = event.split('[').filter((v) => !!v);
    const versesMapped = verses.map((v) => {
      const sections = v.split(']');
      const name = sections[0];
      const content = sections[1];

      return {
        name,
        content,
      } as Lyrics;
    });
    songContentSetter({
      ...songContent,
      lyrics: versesMapped,
    });
  };

  return (
    <StyledContainer>
      <StyledEditableTextTitle
        multiline={false}
        value={titleBeingEdited}
        onChange={setTitleBeingEdited} // only update state variable
        onConfirm={updateSongContentTitle}
        placeholder={'Add song title here'}
      />
      <StyledSongOrder
        multiline={false}
        onChange={setVerseOrderBeingEdited}
        onConfirm={updateSongVerseOrder}
        value={verseOrderBeingEdited}
        placeholder={
          '[Optional] Set the song order here. I.e. v1, v2, c, v1, b, c'
        }
      />

      <StyledEditableTextContent
        multiline={true}
        minLines={20}
        value={lyricsBeingEdited}
        onChange={setLyricsBeingEdited} // only update state variable
        onConfirm={updateSongContentLyrics}
        placeholder={
          '[v1]\n Add lyrics here, oh, please do \n Type in the song section tags too\n\n' +
          '[v2]\n These define the parts of the song \n The list of tags is frankly, quite long\n\n' +
          "[c]\n See the other tags in the '?' button below\n See the other tags in the '?' button below\n\n"
        }
      />

      <Popover content={<HelpText />} position={Position.TOP}>
        <Button>?</Button>
      </Popover>
    </StyledContainer>
  );
};

export default SongContent;
