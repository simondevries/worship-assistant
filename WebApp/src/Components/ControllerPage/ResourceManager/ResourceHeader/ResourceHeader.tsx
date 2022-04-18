import { Intent, Tooltip, Position } from '@blueprintjs/core';
import React, { useContext, useState } from 'react';
import styled from 'styled-components/macro';
import { H3, Button, ButtonGroup } from '@blueprintjs/core';
import RemoveResourceFromScheduleEvent from '../../../../Events/Domain/removeResourceFromScheduleEvent';
import MoveResourceEvent from '../../../../Events/Domain/moveResourceEvent';
import IState from 'Interfaces/State';
import useEventHandler from 'Events/Handlers/useEventHandler';
import EditSongDialog from 'Components/Dialogs/UpsertSongDialog/EditSongDialog';
import { Context } from 'Common/Store/Store';
import useModal from '../../../Dialogs/useModal';
import IResource, { Resource } from 'Interfaces/resource';
const StyledTooltip = styled(Tooltip)`
  width: 100%;
  .bp3-popover-target {
    width: 100%;
  }
`;

const StyledHeader = styled.div`
  margin-top: 10px;
  margin-bottom: 10px;
  width: 300px;
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  -webkit-flex-direction: column;
  -ms-flex-direction: column;
  flex-direction: column;
  -webkit-align-items: center;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  gap: 0px;
`;

const StyledTitle = styled(H3)`
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  width: 100%;
  height: 28px;
  text-align: center;
`;
const ResourceHeader = ({ resource }: { resource: IResource }) => {
  const [raiseEvent] = useEventHandler();
  const [state]: Array<IState> = useContext(Context);
  const [isTrashHighlighed, setTrashHighlighted] = useState(false);
  const [isMoveLeftHighlighted, setIsMoveLeftHighlighted] =
    useState(false);
  const [isMoveRightHighlighted, setIsMoveRightHighlighted] =
    useState(false);
  const [editSongModalOpen, setEditSongModalOpen] = useModal();

  const title = Resource.selectors.getTitle(state, resource);
  return (
    <StyledHeader>
      {editSongModalOpen && (
        <EditSongDialog
          setEditSongModalOpen={setEditSongModalOpen}
          songId={resource.id}
        />
      )}

      {title && title.length > 25 ? (
        <StyledTooltip content={title} position={Position.BOTTOM}>
          <StyledTitle>{title}</StyledTitle>
        </StyledTooltip>
      ) : (
        <StyledTitle>{title}</StyledTitle>
      )}
      <ButtonGroup>
        {resource.resourceType === 'SONG' && (
          <Button
            onClick={() => setEditSongModalOpen(true)}
            icon="edit"
          ></Button>
        )}
        <Button
          onBlur={() => setTrashHighlighted(false)}
          onClick={() => {
            if (!isTrashHighlighed) {
              setTrashHighlighted(true);
              return;
            }
            raiseEvent(
              new RemoveResourceFromScheduleEvent(false, resource.id),
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
            raiseEvent(new MoveResourceEvent(false, resource.id, -1));

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
            raiseEvent(new MoveResourceEvent(false, resource.id, 1));

            setIsMoveRightHighlighted(false);
          }}
          intent={
            isMoveRightHighlighted ? Intent.WARNING : Intent.NONE
          }
          icon="arrow-right"
        ></Button>
      </ButtonGroup>
    </StyledHeader>
  );
};

export default ResourceHeader;
