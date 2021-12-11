import React, { useContext } from 'react';
import { Button, Card, Elevation, Icon } from '@blueprintjs/core';
import styled from 'styled-components/macro';
import useModal from '../Dialogs/useModal';
import AddSongDialog from '../Dialogs/UpsertSongDialog/AddSongDialog';
import SlideSettingsDialog from '../Dialogs/SlideSettingsDialog/SlideSettingsDialog';
import { Context } from '../../Common/Store/Store';
import ScheduleManagerDialog from '../Dialogs/ScheduleManagerDialog';
import IState from '../../Interfaces/State';
import focusOnProjectView from '../../Hooks/focusOnProjectView';
import castIcon from './cast.svg';
export const sidebarWidth = 70;
export const sidebarMargin = 15;

const StyledIconButton = styled(Button)`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 10px;
  padding-bottom: 10px;
  text-align: center;
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
  gap: 5px;
`;

const addIcon = (
  <StyledIcon icon={'new-object'} iconSize={20}></StyledIcon>
);
const folderOpenIcon = (
  <StyledIcon icon={'folder-open'} iconSize={20}></StyledIcon>
);
const searchIcon = (
  <StyledIcon icon={'search'} iconSize={20}></StyledIcon>
);
const cogIcon = <StyledIcon icon={'cog'} iconSize={20}></StyledIcon>;
const googleDriveBackup = (
  <StyledIcon icon={'cloud-upload'} iconSize={20}></StyledIcon>
);
const alertIcon = (
  <StyledIcon icon={'send-message'} iconSize={20}></StyledIcon>
);
const logIcon = (
  <StyledIcon icon={'console'} iconSize={20}></StyledIcon>
);
const desktopIcon = (
  <StyledIcon icon={'desktop'} iconSize={20}></StyledIcon>
);

const Sidebar = () => {
  const [addSongModalOpen, setAddSongModalOpen] = useModal();
  const [settingsModalOpen, setSettingsModalOpen] = useModal();
  const [scheduleModalOpen, setScheduleModalOpen] = useModal(false);
  const [state, dispatch] = useContext(Context);
  const [openOrFocus] = focusOnProjectView(
    state?.activeResourcePointer?.resourceId,
    state?.activeResourcePointer?.slideIndex,
  );

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
        className="SearchButton"
        onClick={() => {
          dispatch({
            type: 'setSearchVisible',
            payload: true,
          });
        }}
        icon={searchIcon}
        minimal
      >
        Add to schedule
      </StyledIconButton>
      <StyledIconButton
        className="side-bar_add-schedule"
        onClick={() => setAddSongModalOpenHacks(true)}
        icon={addIcon}
        minimal
      >
        New song
      </StyledIconButton>
      <StyledIconButton
        onClick={() => setScheduleModalOpenHacks(true)}
        icon={folderOpenIcon}
        minimal
      >
        Previous service
      </StyledIconButton>
      <StyledIconButton
        icon={desktopIcon}
        onClick={openOrFocus}
        minimal
      >
        New projector screen
      </StyledIconButton>

      <StyledIconButton
        icon={cogIcon}
        onClick={() => setSettingsModalOpenHacks(true)}
        minimal
      >
        Settings
      </StyledIconButton>

      {window.location.origin.indexOf('localhost') !== -1 && (
        <StyledIconButton
          icon={logIcon}
          onClick={() => console.log({ state })}
          minimal
        >
          Log state
        </StyledIconButton>
      )}
      {/* <StyledIconButton
        icon={<Icon icon={<img src={castIcon} />} />}
        onClick={() => {
          alert('todo');
        }}
        minimal
      >
        Cast
      </StyledIconButton>
      <StyledIconButton
        icon={googleDriveBackup}
        onClick={() => {
          alert('todo');
        }}
        minimal
      >
        Google drive backup
      </StyledIconButton>
      <StyledIconButton
        icon={alertIcon}
        onClick={() => {
          alert('todo');
        }}
        minimal
      >
        Alerts
      </StyledIconButton> */}
    </StyledContainer>
  );
};

export default Sidebar;
