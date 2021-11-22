import React, { useContext, useState } from 'react';
import styled, { ThemeProvider } from 'styled-components/macro';
import { Context } from '../../Common/Store/Store';
import IState from '../../Interfaces/State';
import ISongResourceReference from '../../Interfaces/SongResourceReference';
import { fileSystemApp } from '../../FileSystem/fileSystemTools';
import ActiveResourcePointer from '../../Interfaces/ActiveResourcePointer';
import { defaultSongTheme, ITheme } from '../../Interfaces/themes';
import useFitText from 'use-fit-text';
import SongHandler from './Handlers/SongHandler/SongHandler';
import BibleVerseHandler from './Handlers/BibleVerseHandler';
import SlideShowHandler from './Handlers/SlideShowHandler';
import YouTubeHandler from './Handlers/YouTubeHandler';
import { Button, Card } from '@blueprintjs/core';
import VideoHandler from './Handlers/VideoHandler';
import DemoSongHandler from './Handlers/DemoSongHandler';

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

const StyledProjectorView = styled.div<any>`
  background: ${(props) => props.theme.backgroundColor};
  color: ${(props) => props.theme.primary};
  width: 100%;
  height: 100%;
  text-align: ${(props) => props.theme.textAlign};
  white-space: pre;
`;

type Props = {
  activeResourcePointer: ActiveResourcePointer;
  previewMode: boolean;
  className?: string;
  useDemoText?: boolean;
  globalTheme: ITheme;
};

/**
 * Projects the lyrics in a tab
 */
export default function ({
  activeResourcePointer,
  previewMode,
  className,
  globalTheme,
  useDemoText,
}: Props) {
  const [state] = useContext<Array<IState>>(Context);

  if (!state || !state.currentSchedule) return null;

  const resourceReference =
    state &&
    state.currentSchedule &&
    activeResourcePointer &&
    activeResourcePointer.resourceId &&
    state.currentSchedule.resources &&
    state.currentSchedule.resources.find(
      (r) =>
        r &&
        r.id &&
        activeResourcePointer &&
        activeResourcePointer &&
        r.id === activeResourcePointer.resourceId,
    );

  const renderAppropriateHandler = () => {
    if (useDemoText) {
      return <DemoSongHandler globalTheme={globalTheme} />;
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
          />
        );
      case 'slideshow':
        return (
          <SlideShowHandler resourceReference={resourceReference} />
        );
      case 'bibleverse':
        return (
          <BibleVerseHandler resourceReference={resourceReference} />
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
        return <div>Image</div>;
      default:
        return 'not found';
    }
  };

  const isFullScreen = window.innerHeight !== window.screen.height;

  return (
    <ThemeProvider theme={defaultSongTheme}>
      <StyledProjectorView
        previewMode={previewMode}
        className={`${className} projectorView`}
      >
        {renderAppropriateHandler()}
        {!isFullScreen && !resourceReference && !previewMode && (
          <StyledCentering>
            <div>
              Your lyrics will be displayed here. Move this screen to
              your extended deskop and press full screen.
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
  );
}
