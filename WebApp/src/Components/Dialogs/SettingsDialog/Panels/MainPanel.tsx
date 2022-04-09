import { Classes, Divider } from '@blueprintjs/core';
import styled from '@emotion/styled';
import UpdateSettingsEvent from 'Events/Domain/updateSettingsEvent';
import useEventHandler from 'Events/Handlers/useEventHandler';
import { ISettings } from 'Interfaces/Settings';
import { settingsRepo } from 'Storage/settingsRepository';
import BackupAndRestore from './BackupAndRestore';
import React from 'react';

const StyledTitle = styled.div`
  height: 100%;
  font-weight: bold;
`;

const MainPanel = () => {
  const [raiseEvent] = useEventHandler();
  const setCcliNumber = async (ccliNumber: string) => {
    const settings = await settingsRepo.get();
    const newSettings: ISettings = {
      ...settings,
      ccliNumber,
    };

    raiseEvent(new UpdateSettingsEvent(false, newSettings));
  };

  return (
    <div>
      <StyledTitle>Backup and restore</StyledTitle>
      <br />
      <BackupAndRestore />
      <Divider></Divider>
      <StyledTitle>CCLI</StyledTitle>

      <span>
        Enter your CCLI number below to display it at the bottom of
        your screen
      </span>
      <input
        className={Classes.INPUT}
        onBlur={(e) => setCcliNumber(e.target.value)}
      />
    </div>
  );
};

export default MainPanel;
