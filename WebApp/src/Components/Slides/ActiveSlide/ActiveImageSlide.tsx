import React, { useContext } from 'react';
import { Context } from '../../../Common/Store/Store';

import ProjectorView from '../../ProjectorView/ProjectorView';
import ActiveResourcePointer from '../../../Interfaces/ActiveResourcePointer';
import ActiveSlideContainer from './ActiveSlideContainer';
import IState from 'Interfaces/State';

const ActiveImageSlide = ({ resource }) => {
  // const [raiseEvent] = useEventHandler();
  const [state] = useContext<Array<IState>>(Context);

  // const [showControls, setShowControls] = useState();
  const activeResourcePointer: ActiveResourcePointer = {
    resourceId: resource.id,
    slideIndex: 0,
  };

  return (
    <ActiveSlideContainer slideIndex={0} resourceId={resource.id}>
      <ProjectorView
        activeResourcePointer={activeResourcePointer}
        previewMode={true}
        globalTheme={state.settings.globalSlideTheme}
      />
    </ActiveSlideContainer>
  );
};

export default ActiveImageSlide;
