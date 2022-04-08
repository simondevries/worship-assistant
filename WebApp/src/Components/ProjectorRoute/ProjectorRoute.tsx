import { Context } from 'Common/Store/Store';
import ProjectorView from 'Components/ProjectorView/ProjectorView';
import PongFromProjectorToControllerEventName from 'Events/Domain/pongFromProjectorToControllerEvent';
import useEventHandler from 'Events/Handlers/useEventHandler';
import { debounce } from 'Helpers/debounce';
import {
  ProjectorDimensionsMessage,
  projectorDimensionsMessageKey,
} from 'Interfaces/projectorDimensionsMessage';
import IState from 'Interfaces/State';
import React, { useContext, useLayoutEffect } from 'react';

export default function ProjectorRoute() {
  const [raiseEvent] = useEventHandler();
  useLayoutEffect(() => {
    function updateSize() {
      raiseEvent(new PongFromProjectorToControllerEventName(false));
    }
    window.addEventListener(
      'resize',
      debounce(updateSize, 400, false),
    );
    updateSize();
    // return () => window.removeEventListener('resize', updateSize);
  }, []);
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
