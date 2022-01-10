import SongPartLabel from 'Common/SongPartLabel/SongPartLabel';
import SongHandler from 'Components/ProjectorView/Handlers/SongHandler/SongHandler';
import Song, { songSelectors } from 'Interfaces/Song/Song';
import React from 'react';
import styled from 'styled-components';
import { ThemeBuilder } from 'testBuilders/themeBuilder';
const StyledPreviewsContainer = styled.div`
  background: #303e49;
  margin-top: 10px;
  display: flex;
  overflow-y: auto;
  gap: 20px;
  padding: 20px;
  max-width: 490px;
  min-width: 240px;
  flex-wrap: wrap;
  height: 50vh;
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
    <>
      <b>Preview</b>
      <StyledPreviewsContainer>
        {lyricsInUserOrder?.map((lyricPart, index) => {
          return (
            <StyledContainer>
              <SongPartLabel
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
    </>
  );
};

export default SongPreview;
