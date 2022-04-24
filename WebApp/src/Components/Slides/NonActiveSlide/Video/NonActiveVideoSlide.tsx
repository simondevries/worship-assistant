import React, { useContext } from 'react';
import BaseNonActiveSlide from 'Common/BaseNonActiveSlide/BaseNonActiveSlide';
import ResourceReference from '../../../../Interfaces/ResourceReference';
import ActiveResourcePointer from '../../../../Interfaces/ActiveResourcePointer';
import ProjectorView from '../../../ProjectorView/ProjectorView';
import { Context } from 'Common/Store/Store';
import IState from 'Interfaces/State';

interface Props {
  slideIndex: number;
  resourceId: string;
  resource: ResourceReference;
}

export default function NonActiveVideoSlide({ resource }: Props) {
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
