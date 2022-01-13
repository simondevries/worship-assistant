import { Classes } from '@blueprintjs/core';
import SongPartLabelTag from 'Common/SongPartLabel/SongPartLabelTag';
import { useRef, useState } from 'react';
import { plainTextTolyricTagProcessor } from 'Reducers/SongReducers/plainTextTolyricTagProcessor';
import styled from 'styled-components/macro';
import AceEditor, { IMarker } from 'react-ace';

import 'ace-builds/src-noconflict/mode-xml';
import 'ace-builds/src-noconflict/theme-solarized_dark';
import songReducers, {
  SelectedText,
} from 'Reducers/SongReducers/songReducers';
import { songSelectors } from 'Interfaces/Song/Song';

const StyledEditableTextContent = styled(AceEditor)`
  margin-bottom: 5px;
  /* height: 300px; */
  background: #1f2931;
  /* font-family: inherit; */
  color: white;
  flex-grow: 1;
  border: 0px;
  resize: none;
  /* overflow-y: hidden; */
  /* min-height: 250px; */
  /* height: 50vh; */
  /* max-height: 1000px; */
`;

const StyledInTextTags = styled.div`
  .tag {
    position: absolute;
    background-color: #ffadad;
    opacity: 0.7;
  }
  height: inherit;
  flex: 1;
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

  const aceRef = useRef<any>(undefined);

  const textSelected = (selectedText: any, e: any) => {
    setSelectedLyrics(selectedText);
  };

  const markerPositions = songSelectors.getLineNumbersOfTags(lyrics);

  const adjustCursorPositionIfRequired = (
    e: any,
    parsedLyrics: string,
  ) => {
    const tagsBefore = lyrics?.match(/\]/g)?.length;
    const tagsAfter = parsedLyrics.match(/\]/g)?.length;

    const column =
      aceRef?.current?.editor?.getCursorPosition().column;
    const row = aceRef?.current?.editor?.getCursorPosition().row;

    if (!column || !row) return;

    const hasATagJustBeenAdded =
      !tagsBefore ||
      (tagsBefore && tagsAfter && tagsBefore < tagsAfter);
    if (hasATagJustBeenAdded) {
      const hasATagJustBeenAdded =
        !tagsBefore ||
        (tagsBefore && tagsAfter && tagsBefore < tagsAfter);
      if (hasATagJustBeenAdded) {
        aceRef.current.editor.moveCursorTo(row, column + 1);
      }
    }
  };

  const setLyricsBeingEditedInternal = (value, e) => {
    const parsedLyrics = plainTextTolyricTagProcessor(value);
    adjustCursorPositionIfRequired(e, parsedLyrics);

    setLyrics(parsedLyrics);
  };

  const addPartToLyrics = (partTagName: string) => {
    if (!selectedLyrics) {
      setLyrics(lyrics.concat(`\n[${partTagName}]`));
    }

    const textSelections = selectedLyrics
      ?.getAllRanges()
      ?.map((range) => {
        return {
          startRow: range.start['row'],
          endRow: range.end['row'],
        } as SelectedText;
      });

    if (!selectedLyrics) {
      setLyrics(lyrics.concat(`\n[${partTagName}]`));
    }

    const updatedLyrics = songReducers.addPartToLyrics(
      lyrics,
      partTagName,
      textSelections,
    );

    const row = aceRef?.current?.editor?.getCursorPosition().row;
    aceRef.current.editor.moveCursorTo(row + 1, 0);

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
      <StyledInTextTags>
        <StyledEditableTextContent
          mode="xml"
          theme="solarized_dark"
          fontSize={14}
          ref={aceRef}
          showPrintMargin={true}
          showGutter={false}
          highlightActiveLine={true}
          focus={isEditorInFocus}
          value={lyrics}
          onBlur={() => setIsEditorInFocus(false)}
          onFocus={() => setIsEditorInFocus(true)}
          onChange={setLyricsBeingEditedInternal} // only update state variable
          width={'100%'}
          height={'100%'}
          // wrapEnabled={true}
          markers={
            (markerPositions?.map((pos) => {
              return {
                startRow: pos,
                startCol: 0,
                endRow: pos,
                endCol: 999,
                className: 'tag',
                type: 'text',
              };
            }) as IMarker[]) ?? ([] as IMarker[])
          }
          onSelectionChange={textSelected}
          placeholder={'[Verse 1]\n Amazing Grace'}
        />
      </StyledInTextTags>
    </>
  );
}
