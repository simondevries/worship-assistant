import React, { useContext } from 'react';
import NonActiveSongSlide from './NonActiveSlide/Song/SongSlide';
import { Context } from '../../App';
import State from '../../Interfaces/State';
import ActiveResourcePointer from '../../Interfaces/ActiveResourcePointer';
import Resource from '../../Interfaces/resource';
import ActiveSongSlide from './ActiveSlide/ActiveSongSlide';

interface Props {
  activeResourcePointer: ActiveResourcePointer;
  isActiveResource: boolean;
  updateSlideNumber: Function;
  resource: Resource;
}

export default function ({
  isActiveResource,
  resource,
  updateSlideNumber,
  activeResourcePointer,
}: Props) {
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

  return (
    <>
      {song &&
        song.lyrics &&
        song.lyrics.map((verse, slideIndex) => {
          if (
            isActiveResource &&
            slideIndex === activeResourcePointer.slideIndex
          ) {
            return <ActiveSongSlide />;
          } else {
            return (
              <NonActiveSongSlide
                slideIndex={slideIndex}
                onClick={() => onSlideClick(slideIndex)}
                verse={verse}
                resourceId={resource.id}
                isFirstSlide={slideIndex === 0}
                isLastSlide={slideIndex === song.lyrics.length - 1}
              />
            );
          }
        })}
    </>
  );
}
