import { Button } from '@blueprintjs/core';
import styled from '@emotion/styled';
import React, { useEffect, useState } from 'react';
import { restore, backup } from 'Storage/dbBackupAndRestore';
import { useFilePicker } from 'use-file-picker';
import BackupAndRestore from './BackupAndRestore';

const StyledTitle = styled.div`
  height: 100%;
`;

const MainPanel = () => {
  return (
    <div>
      <StyledTitle>Settings</StyledTitle>
      <br />
      <BackupAndRestore />
    </div>
  );
};

export default MainPanel;
