import {
  Button,
  Card,
  Divider,
  Elevation,
  Icon,
} from '@blueprintjs/core';
import MinatureProjectorView from 'Components/MinatureProjectorView/MinatureProjectorView';
import React, { useContext } from 'react';
import styled from 'styled-components';
import AddSongDialog from '../Dialogs/UpsertSongDialog/AddSongDialog';
import SlideSettingsDialog from '../Dialogs/SettingsDialog/SettingsDialog';
import useModal from 'Components/Dialogs/useModal';
import { Context } from 'Common/Store/Store';
import focusOnProjectView from 'Hooks/focusOnProjectView';
import ScheduleManagerDialog from 'Components/Dialogs/ScheduleManagerDialog';
import ActiveSongSlide from 'Components/Slides/ActiveSlide/ActiveSongSlide';
import { Resource } from 'Interfaces/resource';
import IState from 'Interfaces/State';
import ActiveBibleVerseSlide from 'Components/Slides/ActiveSlide/ActiveBibleVerseSlide';
import ActiveVideoSlide from 'Components/Slides/ActiveSlide/ActiveVideoSlide';
import ActiveImageSlide from 'Components/Slides/ActiveSlide/ActiveImageSlide';

const SSidebarSection = styled.div`
  margin-bottom: 30px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const SButtonRow = styled.div`
  display: flex;
`;

const SButton = styled(Button)<{ highlight?: boolean }>`
  width: 100px;
  height: 75px;
  text-align: center;
  ${({ highlight }) =>
    highlight === true ? `background: white;` : ''}
  .bp3-button {
    background: white;
  }
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

// const SButtonContainer = styled.div`
//   display: flex;
//   margin-bottom: 10px;
// `;

const SButtonContainerWithoutMargin = styled.div`
  display: flex;
`;

const SProjectorButtons = styled.div`
  display: flex;
  justify-content: center;
  gap: 10px;
  margin-top: 10px;
`;

const SSidebarContainer = styled(Card)`
  min-width: 300px;
  max-width: 500px;
  background: #1e2124;
  padding: 15px;
  padding-top: 0px;

  display: flex;
  flex-direction: column;
  align-items: center;
`;

// const SSidebarContainer = styled.div`
//   display: flex;
//   gap: 10px;
//   margin-bottom: 15px;
// `;

export default function Sidebar({ className }) {
  const [addSongModalOpen, setAddSongModalOpen] = useModal();
  const [settingsModalOpen, setSettingsModalOpen] = useModal();
  const [scheduleModalOpen, setScheduleModalOpen] = useModal(false);
  const [state, dispatch]: [state: IState, dispatch: any] =
    useContext(Context);
  const [openOrFocus] = focusOnProjectView(
    state?.currentSchedule.activeResourcePointer?.resourceId,
    state?.currentSchedule.activeResourcePointer?.slideIndex,
  );

  const resource = Resource.selectors.getResource(
    state.currentSchedule.activeResourcePointer.resourceId,
    state.currentSchedule.resources,
  );

  return (
    <SSidebarContainer
      className={className}
      elevation={Elevation.FOUR}
    >
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
      <div style={{ marginBottom: '15px' }}>
        {resource?.resourceType === 'SONG' && <ActiveSongSlide />}
        {resource?.resourceType === 'BIBLEVERSE' && (
          <ActiveBibleVerseSlide resource={resource} />
        )}
        {resource?.resourceType === 'VIDEO' && (
          <ActiveVideoSlide resource={resource} />
        )}
        {resource?.resourceType === 'IMAGE' && (
          <ActiveImageSlide resource={resource} />
        )}
      </div>
      <SSidebarSection>
        <h3>Manage</h3>
        <SButtonRow>
          <SButton icon={'draw'}>Theme</SButton>

          <SButton onClick={openOrFocus} icon={'desktop'}>
            {state.hasProjectorsAttached === false
              ? 'Open Output'
              : 'Focus Output'}
          </SButton>
        </SButtonRow>
        <SButtonRow>
          <SButton icon={'folder-open'}>Open Service</SButton>
          <SButton icon={'cog'}>Settings</SButton>
        </SButtonRow>
      </SSidebarSection>
      <SSidebarSection>
        <h3>Schedule</h3>
        <SButtonRow>
          <SButton
            highlight={true}
            icon={'search'}
            onClick={() => {
              dispatch({
                type: 'setSearchVisible',
                payload: true,
              });
            }}
          >
            Search
          </SButton>
          <SButton
            onClick={() => {
              dispatch({
                type: 'setSearchVisible',
                payload: true,
              });
            }}
            icon={'music'}
          >
            Add Song
          </SButton>
        </SButtonRow>
        <SButtonRow>
          <SButton
            icon={'book'}
            onClick={() => {
              dispatch({
                type: 'setSearchVisible',
                payload: true,
              });
            }}
          >
            Add Bible Verse
          </SButton>
          <SButton
            icon={'mobile-video'}
            onClick={() => {
              dispatch({
                type: 'setSearchVisible',
                payload: true,
              });
            }}
          >
            Add Video
          </SButton>
        </SButtonRow>
        <SButtonRow>
          <SButton
            onClick={() => {
              dispatch({
                type: 'setSearchVisible',
                payload: true,
              });
            }}
            icon={'media'}
          >
            Add Image
          </SButton>
          <SButton
            icon={'presentation'}
            onClick={() => {
              dispatch({
                type: 'setSearchVisible',
                payload: true,
              });
            }}
          >
            Add Google slides
          </SButton>
        </SButtonRow>
      </SSidebarSection>
    </SSidebarContainer>
  );
}
