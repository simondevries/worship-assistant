import React, { useEffect, useState } from 'react';
import {
  Button,
  EditableText,
  Popover,
  Position,
} from '@blueprintjs/core';
import styled from 'styled-components/macro';
import HelpText from '../../HelpText';
import { Lyrics } from '../../../../Interfaces/Song';

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

export default ({ songContent, songContentSetter, setImportSongButtonDisabled }) => {
  const [titleBeingEdited, setTitleBeingEdited] = useState<string>(songContent?.properties?.title);
  const [lyricsBeingEdited, setLyricsBeingEdited] = useState<string>(songContent?.lyrics?.map(lyric => '[' + lyric.name + ']' + lyric.content).join("\n"));

  useEffect(() => {
    setImportSongButtonDisabled(titleBeingEdited || lyricsBeingEdited)
  }, [setImportSongButtonDisabled, titleBeingEdited, lyricsBeingEdited])
  
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

  // Actually set song content lyrics
  const updateSongContentLyrics = (event) => {
    const verses = event.split('[').filter((v) => !!v);
    const versesMapped = verses.map((v) => {
      const sections = v.split(']');
      const name = sections[0];
      const content = sections[1];

      return {
        name,
        content,
      } as Lyrics;
    })
    songContentSetter({
      ...songContent,
      lyrics: versesMapped,
    });
  };

  return (
    <>
        <StyledEditableTextTitle
        multiline={false}
        value={titleBeingEdited}
        onChange={setTitleBeingEdited} // only update state variable
        onConfirm={updateSongContentTitle}
        placeholder={"Add song title here"}
        />
        <StyledEditableTextContent
        multiline={true}
        minLines={20}
        value={lyricsBeingEdited}
        onChange={setLyricsBeingEdited} // only update state variable
        onConfirm={updateSongContentLyrics}
        placeholder={
          "[v1]\n Add lyrics here, oh, please do \n Type in the song section tags too\n\n" +
          "[v2]\n These define the parts of the song \n The list of tags is frankly, quite long\n\n" +
          "[c]\n See the other tags in the '?' button below\n See the other tags in the '?' button below\n\n"
        }
        />

        <Popover content={<HelpText />} position={Position.TOP}>
        <Button>?</Button>
        </Popover>
    </>
  );
};
