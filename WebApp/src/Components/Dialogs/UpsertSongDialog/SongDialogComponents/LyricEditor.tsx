import { Classes } from '@blueprintjs/core';
import SongPartLabelTag from 'Common/SongPartLabel/SongPartLabelTag';
import { useState } from 'react';
import { plainTextTolyricTagProcessor } from 'Reducers/SongReducers/plainTextTolyricTagProcessor';
import styled from 'styled-components/macro';
const StyledEditableTextContent = styled.textarea<{
  inFocus: boolean;
}>`
  margin-bottom: 5px;
  height: 300px;
  background: ${({ inFocus }) =>
    inFocus ? '#1f2931' : 'transparent'};
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

  const adjustCursorPositionIfRequired = (
    e: any,
    parsedLyrics: string,
  ) => {
    const tagsBefore = lyrics?.match(/\[/g)?.length;
    const tagsAfter = parsedLyrics.match(/\[/g)?.length;

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

  const setLyricsBeingEditedInternal = (e) => {
    const parsedLyrics = plainTextTolyricTagProcessor(e.target.value);
    adjustCursorPositionIfRequired(e, parsedLyrics);

    setLyrics(parsedLyrics);
  };

  const addPartToLyrics = (part: string) => {
    const updatedLyrics = (lyrics += `\n\n[${part}]`);

    setLyrics(updatedLyrics);
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
        inFocus={isEditorInFocus}
        onBlur={() => setIsEditorInFocus(false)}
        onFocus={() => setIsEditorInFocus(true)}
        className={Classes.EDITABLE_TEXT}
        rows={5}
        value={lyrics}
        onChange={setLyricsBeingEditedInternal} // only update state variable
        placeholder={'[Verse 1]\n Amazing Grace'}
      />
    </>
  );
}
