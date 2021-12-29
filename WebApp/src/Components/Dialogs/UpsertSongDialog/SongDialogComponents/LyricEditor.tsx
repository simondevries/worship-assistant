import { Classes } from '@blueprintjs/core';
import { useState } from 'react';
import { plainTextTolyricTagProcessor } from 'Reducers/SongReducers/plainTextTolyricTagProcessor';
import styled from 'styled-components/macro';
const StyledEditableTextContent = styled.textarea<{
  inFocus: boolean;
}>`
  margin-bottom: 30px;
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
      tagsBefore && tagsAfter && tagsBefore < tagsAfter;
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
    // const caret = e.target.selectionStart;
    // const element = e.target;

    const parsedLyrics = plainTextTolyricTagProcessor(e.target.value);
    adjustCursorPositionIfRequired(e, parsedLyrics);

    setLyrics(parsedLyrics);
  };

  return (
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
  );
}
