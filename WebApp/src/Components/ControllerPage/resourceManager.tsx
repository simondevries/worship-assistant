import React, { useContext, useState } from 'react';
import Slide from '../Slides/SlideResolver';
import styled, { css } from 'styled-components/macro';
import {
  H3,
  Button,
  ButtonGroup,
  Intent,
  Popover,
  Tooltip,
  Position,
} from '@blueprintjs/core';
import ActiveSlide, {
  slideWidth,
} from '../Slides/ActiveSlide/ActiveSongSlide';
import SlideResolver from '../Slides/SlideResolver';
import Scrollbar from '../../Common/Scrollbar/Scrollbar';
import RemoveResourceFromScheduleEvent from '../../Events/Domain/removeResourceFromScheduleEvent';
import useEventHandler from '../../Events/Handlers/useEventHandler';
import { Context } from '../../App';
import IState from '../../Interfaces/State';
import ResourceReference from '../../Interfaces/ResourceReference';
import MoveResourceEvent from '../../Events/Domain/moveResourceEvent';

const StyledSlidesContainer = styled.div`
  ${Scrollbar}
  padding-top: calc(50vh - 200px);
  padding-bottom: calc(50vh - 140px);
  overflow-y: auto;
  padding-right: 10px;
`;

const StyledHeader = styled.div`
  margin-top: 20px;
  margin-bottom: 20px;
  width: 300px;

  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 7px;
`;

const StyledResourceManager = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

const StyledTitle = styled(H3)`
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  width: 100%;
  height: 28px;
  text-align: center;
`;

export default function ({
  resource,
  isActiveResource,
  activeResourcePointer,
}) {
  const [raiseEvent] = useEventHandler();
  const [state]: Array<IState> = useContext(Context);
  const [isTrashHighlighed, setTrashHighlighted] = useState(false);
  const [isMoveLeftHighlighted, setIsMoveLeftHighlighted] = useState(
    false,
  );
  const [
    isMoveRightHighlighted,
    setIsMoveRightHighlighted,
  ] = useState(false);

  const resolveTitle = (resourceReference: ResourceReference) => {
    switch (resourceReference.resourceType.toLowerCase()) {
      case 'song':
        const song = state.currentSchedule.activeSongs.find(
          (s) => s.id === resourceReference.id,
        );
        return song?.properties.title;
      case 'bibleverse':
        const bibleVerse = state.currentSchedule.resources.find(
          (s) => s.id === resourceReference.id,
        );
        return `${bibleVerse?.book}  ${bibleVerse?.chapter}:${bibleVerse?.verse}`;

      default:
        return '';
    }
  };

  const title = resolveTitle(resource);

  return (
    <StyledResourceManager>
      <StyledHeader>
        {title && title.length > 25 ? (
          <Tooltip content={title} position={Position.BOTTOM}>
            <StyledTitle>{title}</StyledTitle>
          </Tooltip>
        ) : (
          <StyledTitle>{title}</StyledTitle>
        )}
        <ButtonGroup>
          <Button
            onClick={() => console.log('s')}
            icon="edit"
          ></Button>
          <Button
            onBlur={() => setTrashHighlighted(false)}
            onClick={() => {
              if (!isTrashHighlighed) {
                setTrashHighlighted(true);
                return;
              }
              raiseEvent(
                new RemoveResourceFromScheduleEvent(
                  false,
                  resource.id,
                ),
              );

              setTrashHighlighted(false);
            }}
            icon="trash"
            intent={isTrashHighlighed ? Intent.DANGER : Intent.NONE}
          ></Button>
          <Button
            onBlur={() => setIsMoveLeftHighlighted(false)}
            onClick={() => {
              if (!isMoveLeftHighlighted) {
                setIsMoveLeftHighlighted(true);
                return;
              }
              raiseEvent(
                new MoveResourceEvent(false, resource.id, -1),
              );

              setIsMoveLeftHighlighted(false);
            }}
            intent={
              isMoveLeftHighlighted ? Intent.WARNING : Intent.NONE
            }
            icon="arrow-left"
          ></Button>
          <Button
            onBlur={() => setIsMoveRightHighlighted(false)}
            onClick={() => {
              if (!isMoveRightHighlighted) {
                setIsMoveRightHighlighted(true);
                return;
              }
              raiseEvent(
                new MoveResourceEvent(false, resource.id, 1),
              );

              setIsMoveRightHighlighted(false);
            }}
            intent={
              isMoveRightHighlighted ? Intent.WARNING : Intent.NONE
            }
            icon="arrow-right"
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
