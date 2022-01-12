import { Classes } from '@blueprintjs/core';
import SongPartLabelTag from 'Common/SongPartLabel/SongPartLabelTag';
import { useState } from 'react';
import { plainTextTolyricTagProcessor } from 'Reducers/SongReducers/plainTextTolyricTagProcessor';
import styled from 'styled-components/macro';
import AceEditor from "react-ace";

import "ace-builds/src-noconflict/mode-xml";
import "ace-builds/src-noconflict/theme-solarized_dark";

const StyledEditableTextContent = styled(AceEditor)`
  margin-bottom: 5px;
  height: 300px;
  background: true: '#1f2931' : 'transparent'};
  color: white;
  flex-grow: 1;
  border: 0px;
  resize: none;
  /* overflow-y: hidden; */
  min-height: 250px;
  height: 50vh;
  max-height: 1000px;
`;

const StyledSongPartLabel = styled(SongPartLabelTag)`
  cursor: pointer;
`;

const StyledTagContainer = styled.div`
  display: flex;
  gap: 3px;
  width: 100%;
  flex-wrap: wrap;
`;

interface Props {
  lyrics: string;
  setLyrics: (lyrics: string) => void;
}

export default function LyricEditor({ lyrics, setLyrics }: Props) {
  const [isEditorInFocus, setIsEditorInFocus] = useState(false);
  const [selectedLyrics, setSelectedLyrics] = useState<any>();

  const textSelected = (
    selectedText: any,
    e: any,
  ) => {
    setSelectedLyrics(selectedText);
  };

  const adjustCursorPositionIfRequired = (
    e: any,
    parsedLyrics: string,
  ) => {
    const tagsBefore = lyrics?.match(/\]/g)?.length;
    const tagsAfter = parsedLyrics.match(/\]/g)?.length;

    let caret = e.target.selectionStart;
    const element = e.target;
    const hasATagJustBeenAdded =
      !tagsBefore ||
      (tagsBefore && tagsAfter && tagsBefore < tagsAfter);
    if (hasATagJustBeenAdded) {
      // Move cursor one to the right to account for '[' char added just before current cursor
      caret += 1;
    }

    window.requestAnimationFrame(() => {
      element.selectionStart = caret;
      element.selectionEnd = caret;
    });
  };

  const setLyricsBeingEditedInternal = (value, e) => {
    // const parsedLyrics = plainTextTolyricTagProcessor(value);
    // adjustCursorPositionIfRequired(e, parsedLyrics);

    // setLyrics(parsedLyrics);
    setLyrics(value)
  };

  const addPartToLyrics = (part: string) => {
    // mutate lyrics by adding parts in a new line
    let editorTextArray = lyrics.split('\n');
    let n = 0;
    if (selectedLyrics) {
      for (var cursorRange of selectedLyrics.getAllRanges()) {
        // add part in inserted new line just before the start of selection
        editorTextArray.splice(cursorRange.start['row'] + n, 0, `\n[${part}]`);
        // insert new line just after the end of selection
        n += 2;
        editorTextArray.splice(cursorRange.end['row'] + n, 0, `\n`);
      }
    }
    editorTextArray = editorTextArray.filter(e => e)
    setLyrics(editorTextArray.join('\n'));
  };

  return (
    <>
      <StyledTagContainer>
        <StyledSongPartLabel
          onClick={() => addPartToLyrics('Chorus')}
          verseName={'C'}
        />
        <StyledSongPartLabel
          onClick={() => addPartToLyrics('Verse')}
          verseName={'V'}
        />
        <StyledSongPartLabel
          onClick={() => addPartToLyrics('Pre Chorus')}
          verseName={'P'}
        />
        <StyledSongPartLabel
          onClick={() => addPartToLyrics('Bridge')}
          verseName={'B'}
        />
        <StyledSongPartLabel
          onClick={() => addPartToLyrics('Intro')}
          verseName={'I'}
        />
        <StyledSongPartLabel
          onClick={() => addPartToLyrics('Solo')}
          verseName={'S'}
        />
        <StyledSongPartLabel
          onClick={() => addPartToLyrics('Outro')}
          verseName={'O'}
        />
        <StyledSongPartLabel
          onClick={() => addPartToLyrics('Middle')}
          verseName={'M'}
        />
        <StyledSongPartLabel
          onClick={() => addPartToLyrics('Ending')}
          verseName={'E'}
        />
      </StyledTagContainer>
      <StyledEditableTextContent
        mode="xml"
        theme="solarized_dark"
        fontSize={14}
        showPrintMargin={true}
        showGutter={false}
        highlightActiveLine={true}
        focus={isEditorInFocus}
        value={lyrics}
        onBlur={() => setIsEditorInFocus(false)}
        onFocus={() => setIsEditorInFocus(true)}
        onChange={setLyricsBeingEditedInternal} // only update state variable
        onSelectionChange={textSelected}
        placeholder={'[Verse 1]\n Amazing Grace'}
      />
    </>
  );
}
