import { Classes } from '@blueprintjs/core';
import { useState } from 'react';
import styled from 'styled-components/macro';
import { plainTextTolyricTagProcessor } from './plainTextTolyricTagProcessor';
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
  const setLyricsBeingEditedInternal = (e) => {
    // const caret = e.target.selectionStart;
    // const element = e.target;

    const parsed = plainTextTolyricTagProcessor(e.target.value);
    const tagsBefore = lyrics?.match(/\[/g)?.length;
    const tagsAfter = parsed.match(/\[/g)?.length;

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

    setLyrics(parsed);
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
      placeholder={
        '[Verse 1]\n Add lyrics here, oh, please do \n Type in the song section tags too' +
        '[v2]\n These define the parts of the song \n The list of tags is frankly, quite long\n\n' +
        "[c]\n See the other tags in the '?' button below\n See the other tags in the '?' button below\n\n"
      }
    />
  );
}
