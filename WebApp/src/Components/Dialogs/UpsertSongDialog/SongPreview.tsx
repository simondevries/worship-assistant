import SongPartLabelTag from 'Common/SongPartLabel/SongPartLabelTag';
import SongHandler from 'Components/ProjectorView/Handlers/SongHandler/SongHandler';
import Song, { songSelectors } from 'Interfaces/Song/Song';
import React from 'react';
import styled from 'styled-components';
import { ThemeBuilder } from 'testBuilders/themeBuilder';
const StyledPreviewsContainer = styled.div`
  flex-grow: 1;
  margin-bottom: 10px;
  background: #303e49;
  margin-top: 10px;
  display: flex;
  overflow-y: auto;
  padding: 15px;
  max-width: 490px;
  gap: 10px;
  width: 490px;
  flex-wrap: wrap;
  height: 50vh;
  justify-content: center;
`;

const SongHandlerContainer = styled.div`
  height: 150px;
  aspect-ratio: 4/3;
`;

const StyledContainer = styled.div`
  box-shadow: #1b2024 0 0 7px 2px;
  padding: 4px;
  height: fit-content;
`;

interface Props {
  song: Song;
}

const SongPreview = ({ song }: Props) => {
  const lyricsInUserOrder =
    songSelectors.lyricsInUserSpecificedOrder(song);
  return (
    <div>
      <b>Preview</b>
      <StyledPreviewsContainer>
        {lyricsInUserOrder?.map((lyricPart, index) => {
          return (
            <StyledContainer>
              <SongPartLabelTag
                index={index}
                verseName={lyricPart?.name}
              />
              <SongHandlerContainer>
                <SongHandler
                  slideIndex={index}
                  activeSongs={[song]}
                  resourceReference={{ id: song.id }}
                  globalTheme={new ThemeBuilder().build()}
                ></SongHandler>
              </SongHandlerContainer>
            </StyledContainer>
          );
        })}
      </StyledPreviewsContainer>
    </div>
  );
};

export default SongPreview;
