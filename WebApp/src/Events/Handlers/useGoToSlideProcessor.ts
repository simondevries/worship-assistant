import { useContext } from 'react';
import { Context } from '../../Common/Store/Store';
import ISchedule from '../../Interfaces/Schedule';
import {
  isLastSlideSelected as isLastSlideShowSlideSelected,
  lastSlideIndex as slideShowLastSlideIndex,
} from '../../Interfaces/SlideShow';
import {
  isLastSlideSelected as isLastBibleVerseSelected,
  lastSlideIndex as bibleVerseLastSlideIndex,
} from '../../Interfaces/BibleVerse';
import Song, {
  isLastSlideSelected as isLastSongSelected,
  lastSlideIndex as songLastSlideIndex,
} from '../../Interfaces/Song/Song';
import {
  isLastSlideSelected as isLastVideoSelected,
  lastSlideIndex as videoLastSlideIndex,
} from '../../Interfaces/Video';
import IResourceReference from '../../Interfaces/ResourceReference';
import ActiveResourcePointer from '../../Interfaces/ActiveResourcePointer';
import GoToNextSlideEvent, {
  GoToNextSlideEventName,
} from '../Domain/goToNextSlideEvent';
import GoToPreviousSlideEvent, {
  GoToPreviousSlideEventName,
} from '../Domain/goToPreviousSlideEvent';
import slideChangeEvent from '../Domain/slideChangeEvent';

const getResource = (id, currentSchedule) => {
  const resource = currentSchedule.resources.find((r) => r.id === id);
  if (!resource) {
    console.warn(`Could not find resource ${id}`);
    return;
  }
  return resource;
};

const useGoToSlideProcessor = (raiseEvent) => {
  const [state] = useContext(Context);

  const currentSchedule: ISchedule = state.currentSchedule;

  const GoToNextSlideEventHandler = (event: GoToNextSlideEvent) => {
    if (event.eventType !== GoToNextSlideEventName) return;

    let toResourceId;
    let toSlideId;

    const resourceId =
      currentSchedule.activeResourcePointer.resourceId;
    const resource = getResource(resourceId, currentSchedule);
    if (
      isLastSlideSelected(
        currentSchedule.activeResourcePointer.slideIndex,
        resource,
        currentSchedule.activeSongs,
      )
    ) {
      if (
        !isThereAnotherResourceAhead(
          currentSchedule.activeResourcePointer,
          currentSchedule.resourceOrder,
        )
      ) {
        return;
      }

      toResourceId = getNextResourceId(
        currentSchedule.activeResourcePointer,
        currentSchedule.resourceOrder,
      );
      toSlideId = 0;
    } else {
      toResourceId = currentSchedule.activeResourcePointer.resourceId;
      toSlideId =
        currentSchedule.activeResourcePointer.slideIndex + 1;
    }

    if (toResourceId && !isNaN(toSlideId)) {
      raiseEvent(
        new slideChangeEvent(false, toResourceId, toSlideId),
      );
    }
  };

  const goToPreviousSlideEventHandler = (
    goToPreviousSlideEvent: GoToPreviousSlideEvent,
  ) => {
    if (
      goToPreviousSlideEvent.eventType !== GoToPreviousSlideEventName
    )
      return;

    let toResourceId;
    let toSlideId;

    if (
      isFirstSlideIndexSelected(currentSchedule.activeResourcePointer)
    ) {
      if (
        !isThereAnotherResourceBehind(
          currentSchedule.activeResourcePointer,
          currentSchedule.resourceOrder,
        )
      ) {
        return;
      }

      toResourceId = getPreviousResourceId(
        currentSchedule.activeResourcePointer,
        currentSchedule.resourceOrder,
      );
      const previousResource = getResource(
        toResourceId,
        currentSchedule,
      );
      toSlideId = getLastSlideIndexOfResource(
        previousResource,
        currentSchedule.activeSongs,
      );
    } else {
      toResourceId = currentSchedule.activeResourcePointer.resourceId;
      toSlideId =
        currentSchedule.activeResourcePointer.slideIndex - 1;
    }

    if (toResourceId && !isNaN(toSlideId)) {
      raiseEvent(
        new slideChangeEvent(false, toResourceId, toSlideId),
      );
    }
  };

  const arr: Function[] = [
    goToPreviousSlideEventHandler,
    GoToNextSlideEventHandler,
  ];
  return [arr];
};

const isLastSlideSelected = (
  slideIndex: number,
  resource: IResourceReference,
  activeSongs: Song[],
) => {
  switch (resource.resourceType) {
    case 'SLIDESHOW':
      return isLastSlideShowSlideSelected();
    case 'VIDEO':
      return isLastVideoSelected();
    case 'SONG':
      return isLastSongSelected(activeSongs, resource.id, slideIndex);
    case 'BIBLEVERSE':
      return isLastBibleVerseSelected(resource.bibleVerseContent, slideIndex);
    default:
      throw Error(
        `No isListSlideSelected handler for ${resource.resourceType}`,
      );
  }
};

const getLastSlideIndexOfResource = (
  resource: IResourceReference,
  activeSongs: Song[],
) => {
  switch (resource.resourceType) {
    case 'SLIDESHOW':
      return slideShowLastSlideIndex();
    case 'VIDEO':
      return videoLastSlideIndex();
    case 'SONG':
      return songLastSlideIndex(activeSongs, resource.id);
    case 'BIBLEVERSE':
      return bibleVerseLastSlideIndex(resource.bibleVerseContent);
    default:
      throw Error(
        `No isListSlideSelected handler for ${resource.resourceType}`,
      );
  }
};

const isFirstSlideIndexSelected = (
  activeResourcePointer: ActiveResourcePointer,
) => {
  return activeResourcePointer.slideIndex <= 0;
};

const isThereAnotherResourceBehind = (
  activeResourcePointer: ActiveResourcePointer,
  resourceOrder: string[],
) => {
  const position = resourceOrder.findIndex(
    (r) => r === activeResourcePointer.resourceId,
  );
  if (!resourceOrder) {
    console.warn(
      `Could not find resource ${activeResourcePointer.resourceId} in resource order`,
    );
    return false;
  }

  return position >= 1;
};

const isThereAnotherResourceAhead = (
  activeResourcePointer: ActiveResourcePointer,
  resourceOrder: string[],
) => {
  const position = resourceOrder.findIndex(
    (r) => r === activeResourcePointer.resourceId,
  );
  if (!resourceOrder) {
    console.warn(
      `Could not find resource ${activeResourcePointer.resourceId} in resource order`,
    );
    return false;
  }

  return position + 1 < resourceOrder.length;
};

const getPreviousResourceId = (
  activeResourcePointer,
  resourceOrder,
) => {
  const position = resourceOrder.findIndex(
    (r) => r === activeResourcePointer.resourceId,
  );
  if (!resourceOrder) {
    console.warn(
      `Could not find resource ${activeResourcePointer.resourceId} in resource order`,
    );
    return undefined;
  }

  return resourceOrder[position - 1];
};

const getNextResourceId = (activeResourcePointer, resourceOrder) => {
  const position = resourceOrder.findIndex(
    (r) => r === activeResourcePointer.resourceId,
  );
  if (!resourceOrder) {
    console.warn(
      `Could not find resource ${activeResourcePointer.resourceId} in resource order`,
    );
    return undefined;
  }

  return resourceOrder[position + 1];
};

export default useGoToSlideProcessor;