import { Button, Card, Spinner } from '@blueprintjs/core';
import styled from '@emotion/styled';
import React, { useEffect, useState } from 'react';
import { restore, backup } from 'Storage/dbBackupAndRestore';
import { useFilePicker } from 'use-file-picker';

const StyledButtonGroup = styled.div`
  display: flex;
  gap: 15px;
`;

const StyledCard = styled(Card)`
  margin-bottom: 10px;
`;

const StyledTitle = styled.div`
  height: 100%;
`;

const BackupAndRestore = () => {
  const [
    openFileSelector,
    { filesContent, loading: isOpenFileLoading },
  ] = useFilePicker({
    accept: '.bak',
    multiple: false,
  });

  const [restoreCompleteMessage, setRestoreCompleteMessage] =
    useState(false);

  useEffect(() => {
    if (isOpenFileLoading === false && filesContent.length) {
      setRestoreCompleteMessage(false);
      restore(filesContent[0].content);
      setRestoreCompleteMessage(true);
    }
  }, [isOpenFileLoading]);

  const onExport = async () => {
    await backup();
  };

  return (
    <>
      <StyledCard>
        <StyledTitle>Backup and Restore</StyledTitle>
        Worship Assitant stores all songs, bible verses and
        application metadata on the browser. A copy of the database
        can be downloaded for safekeeping as a backup or used to
        transfer your data across to another computer.
      </StyledCard>
      <StyledButtonGroup>
        {' '}
        <Button onClick={onExport}>Export</Button>
        <Button onClick={openFileSelector}>Restore</Button>
        {isOpenFileLoading && <Spinner />}
      </StyledButtonGroup>

      <br />
      {restoreCompleteMessage && (
        <b>Restore completed successfully</b>
      )}
    </>
  );
};

export default BackupAndRestore;
