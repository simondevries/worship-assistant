import BaseNonActiveSlide from 'Common/BaseNonActiveSlide/BaseNonActiveSlide';
import { Context } from 'Common/Store/Store';
import ProjectorView from 'Components/ProjectorView/ProjectorView';
import ActiveResourcePointer from 'Interfaces/ActiveResourcePointer';
import IResource from 'Interfaces/resource';
import IState from 'Interfaces/State';
import React, { useContext } from 'react';

interface Props {
  resource: IResource;
}

export default function NonActiveImageSlide({ resource }: Props) {
  const activeResourcePointer: ActiveResourcePointer = {
    resourceId: resource.id,
    slideIndex: 0,
  };
  const [state] = useContext<Array<IState>>(Context);
  return (
    <BaseNonActiveSlide slideIndex={0} resourceId={resource.id}>
      <ProjectorView
        activeResourcePointer={activeResourcePointer}
        previewMode={true}
        globalTheme={state.settings.globalSlideTheme}
        ccliNumber={state.settings.ccliNumber}
      />
    </BaseNonActiveSlide>
  );
}
