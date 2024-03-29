import React, { useContext } from 'react';
import SongSlide from './NonActiveSlide/Song/SongSlide';
import { Context } from '../../Common/Store/Store';
import State from '../../Interfaces/State';
import ActiveResourcePointer from '../../Interfaces/ActiveResourcePointer';
import Resource from '../../Interfaces/resource';
import ActiveSongSlide from './ActiveSlide/ActiveSongSlide';
import { songSelectors } from 'Interfaces/Song/Song';

interface Props {
  activeResourcePointer: ActiveResourcePointer;
  isActiveResource: boolean;
  updateSlideNumber: Function;
  resource: Resource;
}

const SongResourceManager = ({
  isActiveResource,
  resource,
  updateSlideNumber,
  activeResourcePointer,
}: Props) => {
  const [state]: Array<State> = useContext(Context);
  if (
    !(
      state &&
      state.currentSchedule &&
      state.currentSchedule.activeSongs
    )
  )
    return null;

  const song = state.currentSchedule.activeSongs.find(
    (s) => s && resource && s.id === resource.id,
  );

  if (!song)
    return <div>Unable to find song with id {resource.id}</div>;

  const onSlideClick = (slideIndex) => {
    updateSlideNumber(slideIndex);
  };

  const songsInUserSpecifiedOrder =
    (song && songSelectors.lyricsInUserSpecificedOrder(song)) ?? [];

  return (
    <>
      {songsInUserSpecifiedOrder &&
        songsInUserSpecifiedOrder.map((verse, slideIndex) => (
          <SongSlide
            slideIndex={slideIndex}
            onClick={() => onSlideClick(slideIndex)}
            verse={verse}
            resourceId={resource.id}
            isFirstSlide={slideIndex === 0}
            isLastSlide={slideIndex === song.lyrics.length - 1}
            isSelected={
              isActiveResource &&
              slideIndex === activeResourcePointer.slideIndex
            }
          />
        ))}
    </>
  );
};

export default SongResourceManager;
