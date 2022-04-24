import SongPartLabelTag from 'Common/SongPartLabel/SongPartLabelTag';
import { Context } from 'Common/Store/Store';
import SongHandler from 'Components/ProjectorView/Handlers/SongHandler/SongHandler';
import Song, { songSelectors } from 'Interfaces/Song/Song';
import IState from 'Interfaces/State';
import React, { useContext } from 'react';
import styled from 'styled-components';
const StyledPreviewsContainer = styled.div`
  flex-grow: 1;
  margin-bottom: 10px;
  background: #303e49;
  margin-top: 10px;
  display: flex;
  overflow-y: auto;
  padding: 15px;
  gap: 10px;
  min-width: 490px;
  flex-wrap: wrap;
  height: 50vh;
  justify-content: center;
  max-width: 510px;
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
  const [state] = useContext(Context);

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
                  globalTheme={
                    (state as IState).settings.globalSlideTheme
                  }
                  ccliNumber={undefined}
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
