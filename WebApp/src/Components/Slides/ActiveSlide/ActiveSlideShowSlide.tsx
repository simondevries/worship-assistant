import React, { useContext, useState, useEffect } from 'react';
import { Context } from '../../../App';
import styled from 'styled-components';
import ProjectorView from '../../ProjectorView/ProjectorView';
import { Button, Card } from '@blueprintjs/core';
import ResourceReference from '../../../Interfaces/ResourceReference';
import BibleVerse from '../../../Interfaces/BibleVerse';
import ActiveSlideContainer from './ActiveSlideContainer';
import focusOnProjectView from '../../../Hooks/focusOnProjectView';

const StyledBackdrop = styled.div`
  bottom: 0;
  left: 0;
  position: fixed;
  right: 0;
  top: 0;
  opacity: 1;
  background-color: rgba(16, 22, 26, 0.7);
  overflow: auto;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  z-index: 20;
`;

const StyledOverlayContainer = styled.div`
  display: absolute;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
`;

const StyledButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
`;

const StyledProjectorView = styled(ProjectorView)`
  height: 150px;
`;

const StyledIframe = styled.iframe`
  width: 100%;
  height: 100%;
`;

const StyledActiveSlideContainer = styled.div``;

const StyledCloseButton = styled(Button)`
  padding: 19px 40px;
  font-size: 20px;
  margin-bottom: 70px;
`;

export const slideWidth = 300;

type Props = {
  resource: ResourceReference;
};

export default function ({ resource }: Props) {
  const [state, dispatch] = useContext(Context);
  const [isOverlayOpen, setIsOverlayOpen] = useState<boolean>(true);
  const [focusProjector] = focusOnProjectView();

  const overlayClick = () => {
    focusProjector();
  };

  useEffect(() => {
    focusProjector();
  }, []);

  return (
    <ActiveSlideContainer
      slideIndex={
        state.currentSchedule.activeResourcePointer.slideIndex
      }
      resourceId={
        state.currentSchedule.activeResourcePointer.resourceId
      }
    >
      <>
        {state.hasProjectorsAttached && isOverlayOpen && (
          <StyledBackdrop onClick={overlayClick}>
            <StyledOverlayContainer>
              <h3>
                Slide Show is now in focus, use the arrow keys to
                change slides.
              </h3>
              <StyledCloseButton
                onClick={() => {
                  setIsOverlayOpen(false);
                }}
              >
                Go back to schedule
              </StyledCloseButton>
              <small>
                Back to schedule takes the slide show out of focus and
                prevents arrow keys from working.
              </small>
            </StyledOverlayContainer>
          </StyledBackdrop>
        )}
        {/* <StyledIframe
        title={resource.id}
        src={resource.embeddedPowerPointUrl}
      /> */}
        {state.hasProjectorsAttached && (
          <Button
            intent="primary"
            onClick={() => {
              setIsOverlayOpen(true);
              focusProjector();
            }}
          >
            Change focus to slideshow
          </Button>
        )}

        <StyledButtonContainer>
          <Button>Slide Settings</Button>
        </StyledButtonContainer>
      </>
    </ActiveSlideContainer>
  );
}
