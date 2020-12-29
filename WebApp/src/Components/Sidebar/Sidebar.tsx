import React, { useContext } from 'react';
import { Button, Card, Elevation, Icon } from '@blueprintjs/core';
import styled from 'styled-components/macro';
import useModal from '../Dialogs/useModal';
import AddSongDialog from '../Dialogs/AddSongDialog';
import SlideSettingsDialog from '../Dialogs/SlideSettingsDialog/SlideSettingsDialog';
import { Context } from '../../App';
import ScheduleManagerDialog from '../Dialogs/ScheduleManagerDialog';
import IState from '../../Interfaces/State';

export const sidebarWidth = 70;
export const sidebarMargin = 15;

const StyledIconButton = styled(Button)`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 10px;
  padding-bottom: 10px;
`;

const StyledIcon = styled(Icon)`
  margin: auto;
  margin-bottom: 10px;
`;
const StyledContainer = styled(Card)`
  display: flex;
  flex-direction: column;
  width: ${sidebarWidth}px;
  height: 100%;
  margin-right: ${sidebarMargin}px;
  align-items: center;
  padding: 0px;
  padding-top: 20px;
`;

const addIcon = <StyledIcon icon={'add'} iconSize={26}></StyledIcon>;
const eventIcon = (
  <StyledIcon icon={'timeline-events'} iconSize={26}></StyledIcon>
);
const cogIcon = <StyledIcon icon={'cog'} iconSize={26}></StyledIcon>;

export default function () {
  const [addSongModalOpen, setAddSongModalOpen] = useModal();
  const [settingsModalOpen, setSettingsModalOpen] = useModal();
  const [scheduleModalOpen, setScheduleModalOpen] = useModal(false);
  const [state, dispatch] = useContext<Array<IState>>(Context);

  const setScheduleModalOpenHacks = setScheduleModalOpen as Function;
  const setSettingsModalOpenHacks = setSettingsModalOpen as Function;
  const setAddSongModalOpenHacks = setAddSongModalOpen as Function;

  return (
    <StyledContainer elevation={Elevation.FOUR}>
      {addSongModalOpen && (
        <AddSongDialog
          setAddSongModalOpen={setAddSongModalOpen}
          createSongAtIndex={state.currentSchedule.resources.length}
        />
      )}
      {settingsModalOpen && (
        <SlideSettingsDialog
          setSettingsModalOpen={setSettingsModalOpen}
          activeResourcePointer={
            state.currentSchedule.activeResourcePointer
          }
        />
      )}
      {scheduleModalOpen && (
        <ScheduleManagerDialog setOpen={setScheduleModalOpen} />
      )}
      <StyledIconButton
        onClick={() => setScheduleModalOpenHacks(true)}
        icon={eventIcon}
        minimal
      >
        <div>Schedules</div>
      </StyledIconButton>
      <StyledIconButton
        className="side-bar_add-schedule"
        onClick={() => setAddSongModalOpenHacks(true)}
        icon={addIcon}
        minimal
      >
        <div>Add Song</div>
      </StyledIconButton>
      <StyledIconButton
        icon={cogIcon}
        onClick={() => setSettingsModalOpenHacks(true)}
        minimal
      >
        <div>Settings</div>
      </StyledIconButton>
      <StyledIconButton icon={addIcon} minimal>
        <div>Add</div>
      </StyledIconButton>
    </StyledContainer>
  );
}
