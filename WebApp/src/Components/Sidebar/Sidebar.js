import React from 'react';
import { Button, Card, Elevation, Icon } from '@blueprintjs/core';
import styled from 'styled-components/macro';
import useModal from '../Dialogs/useModal';
import AddSongDialog from '../Dialogs/AddSongDialog';
import SettingsDialog from '../Dialogs/SettingsDialog';

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
  width: 70px;
  height: 100%;
  margin-right: 15px;
  align-item: center;
  padding: 0px;
  padding-top: 20px;
`;

const addIcon = <StyledIcon icon={'add'} iconSize="26"></StyledIcon>;
const cogIcon = <StyledIcon icon={'cog'} iconSize="26"></StyledIcon>;

export default function () {
  const [addSongModalOpen, setAddSongModalOpen] = useModal();
  const [settingsModalOpen, setSettingsModalOpen] = useModal();

  return (
    <StyledContainer elevation={Elevation.FOUR}>
      {addSongModalOpen && (
        <AddSongDialog setAddSongModalOpen={setAddSongModalOpen} />
      )}
      {settingsModalOpen && (
        <SettingsDialog setSettingsModalOpen={setSettingsModalOpen} />
      )}

      <StyledIconButton
        onClick={() => setAddSongModalOpen(true)}
        icon={addIcon}
        minimal
      >
        <div>Add</div>
      </StyledIconButton>

      <StyledIconButton
        icon={cogIcon}
        onClick={() => setSettingsModalOpen(true)}
        minimal
      >
        <div>Settings</div>
      </StyledIconButton>

      <StyledIconButton alignText="center" icon={addIcon} minimal>
        <div>Add</div>
      </StyledIconButton>

      <StyledIconButton alignText="center" icon={addIcon} minimal>
        <div>Add</div>
      </StyledIconButton>
    </StyledContainer>
  );
}
