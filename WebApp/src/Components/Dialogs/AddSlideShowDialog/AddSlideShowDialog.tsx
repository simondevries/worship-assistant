import React, { useState, useEffect, useContext } from 'react';
import {
  Button,
  Dialog,
  Classes,
  Callout,
  TextArea,
  Intent,
  Icon,
  Card,
  Collapse,
} from '@blueprintjs/core';
import IState from '../../../Interfaces/State';
import { Context } from '../../../App';
import useEventHandler from '../../../Events/Handlers/useEventHandler';
import SlideShowAddedToScheduleEvent from '../../../Events/Domain/slideShowAddedToScheduleEvent';
import styled from 'styled-components';
import newId from '../../../Helpers/newId';
import ppt from './ppt.png';
import GoogleSlides from './GoogleSlides.png';
import pptInstr from './pptInstr.png';
import pptInstr2 from './pptInstr2.png';
import googleSlideInstructions1 from './googleSlideInstruction1.gif';
import googleSlideInstructions2 from './googleSlideInstruction2.gif';

const StyledDisclaimer = styled.div`
  margin-top: 10px;
  font-style: italic;
  font-size: 10px;
`;

const StyledInstructionContainerGoogle = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  img {
    height: 350px;
    object-fit: contain;
  }
  margin-top: 20px;
  margin-bottom: 13px;
`;

const StyledInstructionContainer = styled.div`
  display: flex;
  gap: 10px;
  img {
    height: 150px;
    object-fit: contain;
  }
  margin-top: 20px;
  margin-bottom: 13px;
`;

const StyledBackButton = styled(Button)`
  margin-bottom: 10px;
`;

const StyledButtonGroup = styled.div`
  margin-top: 10px;
`;

const StyledErrorText = styled.div`
  color: white;
  margin-top: 10px;
  margin-bottom: 30px;
  .bp3-icon {
    color: red;
  }
`;

const StyledTextArea = styled(TextArea)`
  width: 100%;
  margin-top: 15px;
`;

const StyledProviderSelectorContainer = styled.div`
  display: flex;
  gap: 10px;
  justify-content: space-evenly;
`;

const StyledProviderCard = styled(Card)`
  display: flex;
  width: 151px;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  cursor: pointer;
`;

const StyledPptInstructions = styled(Collapse)``;

export default ({ setModalOpen, index }) => {
  const [state] = useContext<Array<IState>>(Context);
  const [url, setUrl] = useState<string>();
  const [showError, setHasError] = useState<boolean>();
  const [detailedInstructions, setDetailedInstructions] = useState<
    string
  >();
  const [raiseEvent] = useEventHandler();
  const [slideShowProvider, setSlideShowProvider] = useState<string>(
    '',
  );

  if (!state || !state.currentSchedule) return null;

  const addPowerPoint = () => {
    if (!url) return;
    const matches = url?.match(/["].*?["]/g);

    if (!matches || !matches.length || matches.length < 1) {
      setHasError(true);
      return;
    }

    let reference: string = matches[0].replace(/"/g, '');
    console.log({ reference });
    if (reference.indexOf('docs.google.com') !== -1) {
      // hide controls on google power points
      reference += '&rm=minimal';
    }

    raiseEvent(
      new SlideShowAddedToScheduleEvent(
        newId(),
        10,
        false,
        reference,
      ),
    );
    setModalOpen(false);
  };

  return (
    <>
      <Dialog
        className={Classes.DARK}
        isOpen
        title="Add slide show"
        isCloseButtonShown={true}
        onClose={() => setModalOpen(false)}
      >
        <div className={Classes.DIALOG_BODY}>
          {slideShowProvider !== '' && (
            <StyledBackButton
              onClick={() => setSlideShowProvider('')}
              icon="arrow-left"
              minimal
            >
              Back
            </StyledBackButton>
          )}
          {slideShowProvider === '' && (
            <>
              <h4>Select a provider:</h4>
              <StyledProviderSelectorContainer>
                <StyledProviderCard
                  onClick={() =>
                    //   alert(
                    //     'This feature is not yet available. Use google slides',
                    //   )
                    // }
                    setSlideShowProvider('POWERPOINT')
                  }
                >
                  <img src={ppt} alt="powerPoint" />
                  PowerPoint or
                  <br />
                  PowerPoint online
                </StyledProviderCard>

                <StyledProviderCard
                  onClick={() => setSlideShowProvider('GOOGLESLIDES')}
                >
                  <img src={GoogleSlides} alt="Google slides" />
                  Google Slides
                </StyledProviderCard>
              </StyledProviderSelectorContainer>
            </>
          )}
          {slideShowProvider === 'POWERPOINT' && (
            <Callout>
              Retrieve the embeded url from PowerPoint Online and
              paste the link in the text box below:
              <br />
              <br />
              {'>'} Retrieve the embeded url by going to the File menu
              then clicking Share and then clicking Embed. Copy and
              past the url url from the dialog below.
              <br />
              <br />
              {detailedInstructions !== 'ppt' && (
                <Button
                  onClick={() => setDetailedInstructions('ppt')}
                >
                  Show detailed Instructions
                </Button>
              )}
              <StyledPptInstructions
                isOpen={detailedInstructions === 'ppt'}
              >
                <StyledInstructionContainer>
                  <img src={pptInstr} alt="Instructions 1" />
                  <img src={pptInstr2} alt="Instructions 2" />
                </StyledInstructionContainer>
                See the{' '}
                <a
                  rel="noopener noreferrer"
                  target="_blank"
                  href="https://support.microsoft.com/en-us/office/embed-a-presentation-in-a-web-page-or-blog-19668a1d-2299-4af3-91e1-ae57af723a60#:~:text=Open%20your%20presentation%20in%20PowerPoint,Share%2C%20and%20then%20click%20Embed.&text=In%20the%20Embed%20box%2C%20under,the%20blog%20or%20web%20page."
                >
                  Microsoft support documents.
                </a>{' '}
                for more help.
              </StyledPptInstructions>
            </Callout>
          )}
          {slideShowProvider === 'GOOGLESLIDES' && (
            <div>
              <Callout>
                Retrieve the embeded url from Google slides and paste
                the link in the text box below:
                <br />
                <br />
                {'>'} Retrieve the embeded url by going to the File
                menu then clicking 'Publish to the web' and then
                clicking Embed. Copy and past the url url from the
                dialog below.
                <br />
                <br />
                {detailedInstructions !== 'slides' && (
                  <Button
                    onClick={() => setDetailedInstructions('slides')}
                  >
                    Show detailed Instructions
                  </Button>
                )}
                <StyledPptInstructions
                  isOpen={detailedInstructions === 'slides'}
                >
                  <StyledInstructionContainerGoogle>
                    <img
                      src={googleSlideInstructions1}
                      alt="Instructions 1"
                    />
                    <img
                      src={googleSlideInstructions2}
                      alt="Instructions 2"
                    />
                  </StyledInstructionContainerGoogle>
                  See the{' '}
                  <a
                    href="https://support.google.com/docs/answer/183965?co=GENIE.Platform%3DDesktop&hl=en"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    google support documents.
                  </a>{' '}
                  for more help.
                </StyledPptInstructions>
              </Callout>
            </div>
          )}
          {slideShowProvider !== '' && (
            <>
              <StyledTextArea
                placeholder={'Enter embeded url here'}
                growVertically={true}
                large={true}
                intent={Intent.PRIMARY}
                onChange={(res) => setUrl(res.target.value)}
                value={url}
              />

              {showError && (
                <StyledErrorText>
                  <Icon icon="error" /> Invalid - the text you pasted
                  is not recognized. Ensure you are copying the entire
                  embeded link starting from {'<iframe'}
                </StyledErrorText>
              )}
            </>
          )}
          {slideShowProvider !== '' && (
            <StyledDisclaimer>
              This app only stors the link only on your local
              computer.
            </StyledDisclaimer>
          )}
          <StyledButtonGroup
            className={Classes.DIALOG_FOOTER_ACTIONS}
          >
            <Button onClick={() => setModalOpen(false)}>Close</Button>
            {slideShowProvider !== '' && (
              <Button onClick={addPowerPoint} intent="primary">
                Add to schedule
              </Button>
            )}
          </StyledButtonGroup>
        </div>
      </Dialog>
    </>
  );
};
