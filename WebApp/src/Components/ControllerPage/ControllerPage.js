import React, { useState, useEffect, useContext } from 'react';
import { Context } from '../../App';
import ResourceManager from './resourceManager';
import styled from 'styled-components/macro';
import { Button, Icon } from '@blueprintjs/core';
import { slideWidth } from '../Slides/ActiveSlide/ActiveSongSlide';
import { sidebarWidth, sidebarMargin } from '../Sidebar/Sidebar';
import SlideChangeEvent from '../../Events/Domain/slideChangeEvent';
import useEventHandler from '../../Events/Handlers/useEventHandler';

const StyledAddButton = styled(Button)`
  margin-left: 10px;
  margin-right: 10px;
`;

const addIcon = <Icon icon="add" iconSize="30" />;

const StyledResourceContainer = styled.div`
  display: flex;
  align-items: center;
`;

const StyledResourcesContainer = styled.div`
  display: flex;
  flex-direction: row;
  height: 100%;

  margin-left: calc(50vw - ${slideWidth / 2}px);
  margin-right: calc(50vw + ${slideWidth / 2}px);
`;
// todo (sdv) experimental expires 05/21

// const StyledActiveResource = styled.div`
//   width: ${slideWidth}px;
//   height: 300px;
//   background: red;
//   position: absolute;
//   left: calc(
//     (
//         100vw - (${sidebarWidth}px + ${sidebarMargin}px) -
//           ${slideWidth / 2}px
//       ) / 2
//   );
// `;

const StyledNoResourcesButton = styled(Button)`
  height: 50px;
  position: absolute;
  top: 50vh;
  left: 47vw;
`;

const StyledControllerPage = styled.div`
  height: 100%;
  width: 100%;
  overflow-x: auto;
  display: flex;
  justify-content: stretch;
`;

export default function ({ updateSlideNumber }) {
  const [state, dispatch] = useContext(Context);
  const [raiseEvent] = useEventHandler();
  const [a, seta] = useState();

  if (!state || !state.settings || !state.currentSchedule)
    return null;

  const resources =
    state.currentSchedule.resources &&
    state.currentSchedule.resources.sort((a, b) =>
      a.index < b.index ? -1 : 1,
    );

  const openSearch = () => {
    dispatch({
      type: 'setSearchVisible',
      payload: true,
    });
  };
  const activeResourcePointer =
    state.currentSchedule.activeResourcePointer;

  if (!resources || !resources.length) {
    return (
      <StyledNoResourcesButton onClick={openSearch} icon="add" large>
        Click here to add your first resource
      </StyledNoResourcesButton>
    );
  }

  return (
    <StyledControllerPage>
      <button
        onClick={() => {
          const ref = window.open('http://localhost:3000/project');

          setTimeout(() => {
            let bc = new BroadcastChannel('worshipAssistApp');
            console.log('asd');
            bc.postMessage(
              JSON.stringify({ focusOnPptIframe: 'true' }),
            );
          }, 2000);
          seta(ref);
          ref.focus();
        }}
      >
        open
      </button>
      <button
        onClick={() => {
          a.focus();

          let bc = new BroadcastChannel('worshipAssistApp');
          console.log('asd');
          bc.postMessage(
            JSON.stringify({ focusOnPptIframe: 'true' }),
          );
        }}
      >
        run
      </button>
      <StyledResourcesContainer>
        {resources &&
          resources.map((r, rInx) => (
            <StyledResourceContainer id={'resource' + rInx}>
              <ResourceManager
                resource={r}
                isActiveResource={
                  activeResourcePointer.resourceId === r.id
                }
                activeResourcePointer={activeResourcePointer}
              ></ResourceManager>
              {rInx < resources.length && (
                <StyledAddButton
                  icon={addIcon}
                  minimal
                  inline={false}
                  onClick={openSearch}
                ></StyledAddButton>
              )}
            </StyledResourceContainer>
          ))}
      </StyledResourcesContainer>
      <div>yolo</div>
    </StyledControllerPage>
  );
}
