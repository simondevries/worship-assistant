import React, { useContext, useState } from 'react';
import styled, { ThemeProvider } from 'styled-components/macro';
import { Context } from '../../App';
import IState from '../../Interfaces/State';
import ISongResourceReference from '../../Interfaces/SongResourceReference';
import { fileSystemApp } from '../../FileSystem/fileSystemTools';
import ActiveResourcePointer from '../../Interfaces/ActiveResourcePointer';
import { defaultSongTheme } from '../../Interfaces/themes';
import useFitText from 'use-fit-text';
import SongHandler from './Handlers/SongHandler';
import BibleVerseHandler from './Handlers/BibleVerseHandler';
import SlideShowHandler from './Handlers/SlideShowHandler';
import YouTubeHandler from './Handlers/YouTubeHandler';
import { Button } from '@blueprintjs/core';
import VideoHandler from './Handlers/VideoHandler';

const StyledPowerPointPresenter = styled.iframe`
  width: 100%;
  height: 100%;
`;

const StyledVideo = styled.video``;

const StyledProjectorView = styled.div<any>`
  /* ${(props) => [!props.previewMode ? 'font-size: 100pt;' : '']} */
  background: ${(props) => props.theme.backgroundColor};
  color: ${(props) => props.theme.primary};
  /* font-size: ${(props) => props.theme.fontSize}; */
  width: 100%;
  height: 100%;
  text-align: ${(props) => props.theme.textAlign};
  white-space: pre;
`;

type Props = {
  activeResourcePointer: ActiveResourcePointer;
  previewMode: boolean;
  className?: string;
};

/**
 * Projects the lyrics in a tab
 */
export default function ({
  activeResourcePointer,
  previewMode,
  className,
}: Props) {
  const [state] = useContext<Array<IState>>(Context);
  const { fontSize, ref } = useFitText({ maxFontSize: 10 });

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
    if (!resourceReference || !resourceReference.resourceType) return;

    switch (resourceReference.resourceType.toLowerCase()) {
      case 'song':
        return (
          <SongHandler
            resourceReference={resourceReference}
            slideIndex={activeResourcePointer.slideIndex}
            activeSongs={state?.currentSchedule.activeSongs}
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
          ></VideoHandler>
        );
      case 'image':
        return <div>Image</div>;
      default:
        return 'not found';
    }
  };

  return (
    <ThemeProvider theme={defaultSongTheme}>
      <StyledProjectorView
        ref={ref}
        style={{ fontSize }}
        previewMode={previewMode}
        className={className}
      >
        {renderAppropriateHandler()}
      </StyledProjectorView>
    </ThemeProvider>
  );
}
