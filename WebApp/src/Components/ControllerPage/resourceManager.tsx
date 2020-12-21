import React from 'react';
import Slide from '../Slides/NonActiveSlide/SlideResolver';
import styled, { css } from 'styled-components/macro';
import { H3, Button, ButtonGroup } from '@blueprintjs/core';
import ActiveSlide, {
  slideWidth,
} from '../Slides/ActiveSlide/ActiveSongSlide';
import SlideResolver from '../Slides/NonActiveSlide/SlideResolver';
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

export default function ({
  resource,
  isActiveResource,
  updateSlideNumber,
  activeResourcePointer,
}) {
  const [raiseEvent] = useEventHandler();

  return (
    <StyledResourceManager>
      <StyledHeader>
        {resource && resource.title}
        <ButtonGroup>
          <Button
            onClick={() => console.log('s')}
            icon="edit"
          ></Button>
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
          updateSlideNumber={updateSlideNumber}
        />
      </StyledSlidesContainer>
    </StyledResourceManager>
  );
}
