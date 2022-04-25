import {
  Button,
  Card,
  Divider,
  Elevation,
  Icon,
} from '@blueprintjs/core';
import MinatureProjectorView from 'Components/MinatureProjectorView/MinatureProjectorView';
import React, { useContext, useState } from 'react';
import styled from 'styled-components';
import AddSongDialog from '../Dialogs/UpsertSongDialog/AddSongDialog';
import SlideSettingsDialog, {
  SettingsDialogTab,
} from '../Dialogs/SettingsDialog/SettingsDialog';
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
import IResourceReference from 'Interfaces/ResourceReference';
import BlankActiveSlideForSidebar from 'Components/Slides/ActiveSlide/BlankActiveSlideForSidebar';
import useAddVideo from 'Hooks/useAddVideo';
import AddSlideShowDialog from 'Components/Dialogs/AddSlideShowDialog/AddSlideShowDialog';
import useAddImage from 'Hooks/useAddImage';

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

const SidebarProjector = (props) => {
  const { resource } = props;
  return (
    <>
      {!resource && <BlankActiveSlideForSidebar />}
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
    </>
  );
};

export default function Sidebar({ className }) {
  const [settingsDialogTabToOpen, setSettingsDialogTabToOpen] =
    useState<SettingsDialogTab>();
  const [addSongModalOpen, setAddSongModalOpen] = useModal();
  const [isSlideShowModalOpen, setIsSlideShowModalOpen] = useModal();
  const [settingsModalOpen, setSettingsModalOpen] = useModal();
  const [scheduleModalOpen, setScheduleModalOpen] = useModal(false);
  const [state, dispatch]: [state: IState, dispatch: any] =
    useContext(Context);
  const [addImage] = useAddImage();
  const [openOrFocus] = focusOnProjectView(
    state?.currentSchedule.activeResourcePointer?.resourceId,
    state?.currentSchedule.activeResourcePointer?.slideIndex,
  );
  const [addVideo] = useAddVideo();

  const activeResource = Resource.selectors.getResource(
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
          openTab={settingsDialogTabToOpen}
        />
      )}
      {scheduleModalOpen && (
        <ScheduleManagerDialog setOpen={setScheduleModalOpen} />
      )}
      {isSlideShowModalOpen && (
        <AddSlideShowDialog
          setModalOpen={setIsSlideShowModalOpen}
          index={1} // todo (sdv)
        />
      )}
      <div style={{ marginBottom: '15px' }}>
        <SidebarProjector resource={activeResource} />
      </div>
      <SSidebarSection>
        <h3>Manage</h3>
        <SButtonRow>
          <SButton
            icon={'draw'}
            onClick={() => {
              setSettingsDialogTabToOpen(SettingsDialogTab.Theme);
              setSettingsModalOpen(true);
            }}
          >
            Theme
          </SButton>

          <SButton onClick={openOrFocus} icon={'desktop'}>
            {state.hasProjectorsAttached === false
              ? 'Open Output'
              : 'Focus Output'}
          </SButton>
        </SButtonRow>
        <SButtonRow>
          <SButton
            icon={'folder-open'}
            onClick={() => {
              setScheduleModalOpen(true);
            }}
          >
            Open Service
          </SButton>
          <SButton
            onClick={() => {
              setSettingsDialogTabToOpen(SettingsDialogTab.Main);
              setSettingsModalOpen(true);
            }}
            icon={'cog'}
          >
            Settings
          </SButton>
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
              addVideo(state?.currentSchedule?.resources?.length);
            }}
          >
            Add Video
          </SButton>
        </SButtonRow>
        <SButtonRow>
          <SButton
            onClick={() => {
              addImage(state?.currentSchedule?.resources?.length);
            }}
            icon={'media'}
          >
            Add Image
          </SButton>
          <SButton
            icon={'presentation'}
            onClick={() => {
              setIsSlideShowModalOpen(true);
            }}
          >
            Add Google slides
          </SButton>
        </SButtonRow>

        <SButtonRow>
          {window.location.origin.indexOf('localhost') !== -1 && (
            <SButton
              icon={'console'}
              onClick={() => console.log({ state })}
              minimal
            >
              Log state
            </SButton>
          )}
        </SButtonRow>
      </SSidebarSection>
    </SSidebarContainer>
  );
}
