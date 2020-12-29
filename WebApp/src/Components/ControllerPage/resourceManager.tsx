import React from 'react';
import Slide from '../Slides/SlideResolver';
import styled, { css } from 'styled-components/macro';
import { H3, Button, ButtonGroup } from '@blueprintjs/core';
import ActiveSlide, {
  slideWidth,
} from '../Slides/ActiveSlide/ActiveSongSlide';
import SlideResolver from '../Slides/SlideResolver';
import Scrollbar from '../../Common/Scrollbar/Scrollbar';
import RemoveResourceFromScheduleEvent from '../../Events/Domain/removeResourceFromScheduleEvent';
import useEventHandler from '../../Events/Handlers/useEventHandler';

const StyledSlidesContainer = styled.div`
  ${Scrollbar}
  padding-top: calc(50vh - 200px);
  padding-bottom: calc(50vh - 140px);
  overflow-y: auto;
  padding-right: 10px;
`;

const StyledHeader = styled(H3)`
  margin-top: 20px;
  margin-bottom: 20px;
`;

const StyledResourceManager = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

const openEditSongModal = () => {
  // useModal hook to open addSongDialog
  // Add a prop to the upsertDialog to take a song reference
  // -- Create a useEffect in addsong dialog that gets the song from index db and populates the song lyrics and the title
  // Remove the 'save and add to schedule' button if the song prop exits
  // Clicking the save button will update raise the songAddedToScheduleEvent if the song prop does not exists and will raise the songEditiedEvent if song is being updated
  // Create three event handlers: state, broadcast, indexdb
  // ~~rename addsong dialog to upsertSongDialog~~
};

export default function ({
  resource,
  isActiveResource,
  activeResourcePointer,
}) {
  const [raiseEvent] = useEventHandler();

  return (
    <StyledResourceManager>
      <StyledHeader>
        {resource && resource.title}
        <ButtonGroup>
          <Button onClick={openEditSongModal} icon="edit"></Button>
          <Button
            onClick={() =>
              raiseEvent(
                new RemoveResourceFromScheduleEvent(
                  false,
                  resource.id,
                ),
              )
            }
            icon="trash"
          ></Button>
        </ButtonGroup>
      </StyledHeader>
      <StyledSlidesContainer>
        <SlideResolver
          isActiveResource={isActiveResource}
          activeResourcePointer={activeResourcePointer}
          resource={resource}
        />
      </StyledSlidesContainer>
    </StyledResourceManager>
  );
}
