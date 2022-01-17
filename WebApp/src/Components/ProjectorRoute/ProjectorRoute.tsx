import { Context } from 'Common/Store/Store';
import ProjectorView from 'Components/ProjectorView/ProjectorView';
import PingToControllerEvent from 'Events/Domain/pingToControllerEvent';
import useEventHandler from 'Events/Handlers/useEventHandler';
import {
  ProjectorDimensionsMessage,
  projectorDimensionsMessageKey,
} from 'Interfaces/projectorDimensionsMessage';
import IState from 'Interfaces/State';
import React, { useContext, useLayoutEffect, useState } from 'react';

// Reference: https://stackoverflow.com/questions/52891199/debounce-and-react-window-resize-this-reference-issue
function debounce(func, wait, immediate) {
  var timeout;
  return function () {
    // @ts-ignore
    var context: any = this as any,
      args = arguments;
    var later = function () {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };
    var callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  };
}

function useWindowSize() {
  const [raiseEvent] = useEventHandler();
  useLayoutEffect(() => {
    function updateSize() {
      raiseEvent(
        new PingToControllerEvent(false, {
          height: window.innerHeight,
          width: window.innerWidth,
          message: projectorDimensionsMessageKey,
        } as ProjectorDimensionsMessage),
      );
    }
    window.addEventListener(
      'resize',
      debounce(updateSize, 400, false),
    );
    updateSize();
    return () => window.removeEventListener('resize', updateSize);
  }, [raiseEvent]);
}

export default function ProjectorRoute() {
  useWindowSize();
  const [state] = useContext(Context);

  const activeResourcePointer = (state as IState)?.currentSchedule
    ?.activeResourcePointer;

  return (
    <>
      <ProjectorView
        previewMode={false}
        activeResourcePointer={activeResourcePointer}
        globalTheme={(state as IState).settings.globalSlideTheme}
      />
    </>
  );
}
