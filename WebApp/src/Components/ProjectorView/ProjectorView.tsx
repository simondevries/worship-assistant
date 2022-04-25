import React, { useContext, useState } from 'react';
import styled, { ThemeProvider } from 'styled-components/macro';
import { Context } from '../../Common/Store/Store';
import IState from '../../Interfaces/State';
import ISongResourceReference from '../../Interfaces/SongResourceReference';
import ActiveResourcePointer from '../../Interfaces/ActiveResourcePointer';
import { defaultTheme, ITheme } from '../../Interfaces/themes';
import useFitText from 'use-fit-text';
import SongHandler from './Handlers/SongHandler/SongHandler';
import BibleVerseHandler from './Handlers/BibleVerseHandler';
import SlideShowHandler from './Handlers/SlideShowHandler';
import YouTubeHandler from './Handlers/YouTubeHandler';
import { Button, Card } from '@blueprintjs/core';
import VideoHandler from './Handlers/VideoHandler';
import DemoSongHandler from './Handlers/DemoSongHandler';
import { ProjectorViewMode } from 'Interfaces/Schedule';
import SettingsDialog, {
  SettingsDialogTab,
} from 'Components/Dialogs/SettingsDialog/SettingsDialog';
import ImageHandler from './Handlers/ImageHandler';

const StyledCentering = styled.div`
  height: 100%;
  position: fixed;
  margin: 0 auto;
  left: 45%;
  top: 40%;
  position: fixed;
`;

const StyledPowerPointPresenter = styled.iframe`
  width: 100%;
  height: 100%;
`;

const StyledVideo = styled.video``;

const StyledProjectorView = styled.div<{
  isBlackout: boolean;
  blankColor: string;
  previewMode: boolean;
  theme: ITheme;
}>`
  background: ${({ theme, isBlackout, blankColor }) =>
    isBlackout && blankColor?.toLowerCase() !== 'blank'
      ? blankColor
      : theme.backgroundColor};
  color: ${({ theme }) => theme.primary};
  width: 100%;
  height: 100%;
  text-align: ${({ theme }) => theme.textAlign};
  white-space: pre;
`;

type Props = {
  activeResourcePointer: ActiveResourcePointer;
  previewMode: boolean;
  className?: string;
  useDemoText?: boolean;
  globalTheme: ITheme;
  ccliNumber?: string;
};

/**
 * Projects the lyrics in a tab
 */
const ProjectorView = ({
  activeResourcePointer,
  previewMode,
  className,
  globalTheme,
  useDemoText,
  ccliNumber,
}: Props) => {
  const [state] = useContext<Array<IState>>(Context);

  if (!state || !state.currentSchedule) return null;

  const isBlackout =
    state.currentSchedule.currentProjectorViewMode.mode ===
    ProjectorViewMode.Blackout;

  const isBlank =
    state.currentSchedule.currentProjectorViewMode.mode ===
    ProjectorViewMode.Blank;

  const resourceReference =
    state?.currentSchedule &&
    activeResourcePointer?.resourceId &&
    state.currentSchedule.resources?.find(
      (r) =>
        r &&
        r.id &&
        activeResourcePointer &&
        activeResourcePointer &&
        r.id === activeResourcePointer.resourceId,
    );

  const renderAppropriateHandler = () => {
    if (useDemoText) {
      return (
        <DemoSongHandler
          globalTheme={globalTheme}
          ccliNumber={ccliNumber}
        />
      );
    }

    if (!resourceReference || !resourceReference.resourceType) return;

    switch (resourceReference.resourceType.toLowerCase()) {
      case 'song':
        return (
          <SongHandler
            resourceReference={resourceReference}
            slideIndex={activeResourcePointer.slideIndex}
            activeSongs={state?.currentSchedule.activeSongs}
            globalTheme={globalTheme}
            ccliNumber={ccliNumber}
            isBlank={isBlank}
          />
        );
      case 'slideshow':
        return (
          <SlideShowHandler resourceReference={resourceReference} />
        );
      case 'bibleverse':
        return (
          <BibleVerseHandler
            resourceReference={resourceReference}
            slideIndex={activeResourcePointer.slideIndex}
            globalTheme={globalTheme}
            isBlank={isBlank}
          />
        );
      case 'youtube':
        return (
          <YouTubeHandler resourceReference={resourceReference} />
        );
      case 'video':
        return (
          <VideoHandler
            resourceReference={resourceReference}
            previewMode={previewMode}
          ></VideoHandler>
        );
      case 'image':
        return (
          <ImageHandler
            resourceReference={resourceReference}
            previewMode={previewMode}
          ></ImageHandler>
        );
      default:
        return 'not found';
    }
  };

  const isFullScreen = window.innerHeight !== window.screen.height;

  return (
    <>
      <ThemeProvider theme={defaultTheme}>
        <StyledProjectorView
          isBlackout={isBlackout}
          blankColor={
            state.currentSchedule.currentProjectorViewMode
              ?.blankColor ?? 'black'
          }
          previewMode={previewMode}
          className={`${className} projectorView`}
        >
          {!isBlackout && renderAppropriateHandler()}
          {!isFullScreen && !resourceReference && !previewMode && (
            <StyledCentering>
              <div>
                Your lyrics will be displayed here. Move this screen
                to your extended deskop and press full screen.
                <Button
                  intent="primary"
                  onClick={() => {
                    document.documentElement.requestFullscreen();
                  }}
                >
                  Full Screen
                </Button>
              </div>
            </StyledCentering>
          )}
        </StyledProjectorView>
      </ThemeProvider>
    </>
  );
};
export default ProjectorView;
