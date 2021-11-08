import React, { useContext } from 'react';
import { Context } from 'Common/Store/Store';
import ResourceManager from './resourceManager';
import styled from 'styled-components/macro';
import { Button, Icon, Card } from '@blueprintjs/core';
import { slideWidth } from '../Slides/ActiveSlide/ActiveSongSlide';
import IState from '../../Interfaces/State';

const StyledAddButton = styled(Button)`
  margin-left: 7px;
  margin-right: 7px;
`;

const addIcon = <Icon icon="add" iconSize={20} />;

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

const StyledWelcomeCard = styled(Card)`
  display: flex;
  align-items: center;
  height: 150px;
  margin: auto;
  flex-direction: column;
  justify-content: space-between;
`;

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

export default function () {
  const [state, dispatch] = useContext<any>(Context);

  if (!state || !state.settings || !state.currentSchedule)
    return null;

  const sortResourceInOrder = () => {
    const resourceOrder =
      (state as IState)?.currentSchedule?.resourceOrder || [];
    const resources =
      (state as IState)?.currentSchedule?.resources || [];
    const sortedResources =
      resourceOrder
        .map(
          (r) =>
            resources.find((resource) => resource.id === r) ||
            undefined,
        )
        .filter((r) => r !== undefined) || [];

    const resourcesMissingInSortedArray = resources.filter(
      (r) => !resourceOrder.some((ro) => ro === r.id),
    );

    return sortedResources.concat(resourcesMissingInSortedArray);
  };

  const openSearch = (insertResourceAtIndex) => {
    dispatch({
      type: 'setSearchVisible',
      payload: true,
    });
    dispatch({
      type: 'setInsertResourceAtIndex',
      payload: insertResourceAtIndex,
    });
  };

  const sortedResources = sortResourceInOrder();

  const activeResourcePointer =
    state.currentSchedule.activeResourcePointer;
  console.log({ sortedResources });
  if (!sortedResources || !sortedResources.length) {
    return (
      <StyledWelcomeCard>
        {/* */}
        {/* <StyledNoResourcesButton
          onClick={() => openSearch(0)}
          icon="add"
          large
        > */}
        Press '/' or click search to add your first song, slideshow,
        bible verse, video, image.
        <span
          role="img"
          aria-label="clap"
          style={{ fontSize: '40px' }}
        >
          👏
        </span>
        {/* </StyledNoResourcesButton> */}
      </StyledWelcomeCard>
    );
  }

  return (
    <StyledControllerPage>
      <StyledResourcesContainer>
        {sortedResources &&
          sortedResources.map(
            (r, rInx) =>
              r && (
                <StyledResourceContainer id={'resource' + rInx}>
                  <ResourceManager
                    resource={r}
                    isActiveResource={
                      activeResourcePointer.resourceId === r.id
                    }
                    activeResourcePointer={activeResourcePointer}
                  ></ResourceManager>
                  {rInx < sortedResources.length && (
                    <StyledAddButton
                      icon={addIcon}
                      minimal
                      onClick={() => openSearch(rInx)}
                    ></StyledAddButton>
                  )}
                </StyledResourceContainer>
              ),
          )}
      </StyledResourcesContainer>
      <div style={{ color: 'transparent' }}>.</div>
    </StyledControllerPage>
  );
}
