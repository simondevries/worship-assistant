import React, { useState, useEffect, useContext } from 'react';
import {
  Button,
  Dialog,
  Classes,
  MenuItem,
  Menu,
  Callout,
  TextArea,
  Intent,
} from '@blueprintjs/core';
import IState from '../../../Interfaces/State';
import { Context } from '../../../App';
import ISongResourceReference from '../../../Interfaces/SongResourceReference';
import useEventHandler from '../../../Events/Handlers/useEventHandler';
import SlideShowAddedToScheduleEvent from '../../../Events/Domain/slideShowAddedToScheduleEvent';
import styled from 'styled-components';
import newId from '../../../Helpers/newId';

const StyledTextArea = styled(TextArea)`
  width: 100%;
  margin-top: 15px;
`;

export default ({ setModalOpen, index }) => {
  const [state] = useContext<Array<IState>>(Context);
  const [url, setUrl] = useState<string>();
  const [raiseEvent] = useEventHandler();

  if (!state || !state.currentSchedule) return null;

  const addPowerPoint = () => {
    if (!url) return;
    const matches = url?.match(/["].*?["]/g);
    const reference =
      matches && matches.length && matches[0].replace(/"/g, '');

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
        title="Settings"
        isCloseButtonShown={true}
        onClose={() => setModalOpen(false)}
      >
        <div className={Classes.DIALOG_BODY}>
          <Callout>
            Enter embeded url from either power point online or google
            slides online. <br />
            <b>PowerPoint online:</b> File then Share then <br />
            <b>Google slides:</b> File then 'Publish to web' then
            embed
          </Callout>

          <StyledTextArea
            growVertically={true}
            large={true}
            intent={Intent.PRIMARY}
            onChange={(res) => setUrl(res.target.value)}
            value={url}
          />
        </div>

        <div className={Classes.DIALOG_FOOTER_ACTIONS}>
          <Button onClick={() => setModalOpen(false)}>Close</Button>
          <Button onClick={addPowerPoint} intent="primary">
            Add to schedule
          </Button>
        </div>
      </Dialog>
    </>
  );
};
