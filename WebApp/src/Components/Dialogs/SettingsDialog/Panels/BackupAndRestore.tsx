import {
  Button,
  Callout,
  Card,
  Classes,
  Intent,
  Spinner,
} from '@blueprintjs/core';
import styled from '@emotion/styled';
import React, { useEffect, useState } from 'react';
import {
  restore,
  backup,
  clearAll,
} from 'Storage/dbBackupAndRestore';
import { useFilePicker } from 'use-file-picker';

const StyledButtonGroup = styled.div`
  display: flex;
  gap: 15px;
`;

const StyledCallout = styled(Callout)`
  margin-bottom: 10px;
`;

const StyledDeleteAllCard = styled(Card)`
  margin-top: 10px;
  margin-bottom: 10px;
  display: flex;
  gap: 20px;
  flex-direction: column;
  margin-bottom: 10px;
`;

declare var confirm;

const BackupAndRestore = () => {
  const [
    openFileSelector,
    { filesContent, loading: isOpenFileLoading },
  ] = useFilePicker({
    accept: '.bak',
    multiple: false,
  });
  const [currentDeleteAllDataStage, setCurrentDeleteAllDataStage] =
    useState<Number>(0);

  const [deleteAllText, setDeleteAllText] = useState('');
  const [exportCompleteMessage, setExportCompleteMessage] =
    useState<boolean>(false);

  useEffect(() => {
    const processFileSelected = async () => {
      if (isOpenFileLoading === false && filesContent.length) {
        await clearAll();
        restore(filesContent[0].content);
        window.location.reload();
      }
    };
    processFileSelected();
  }, [isOpenFileLoading, filesContent]);

  const onExport = async () => {
    setExportCompleteMessage(false);
    await backup();
    setExportCompleteMessage(true);
  };

  const onRestoreClick = () => {
    if (
      confirm(
        'WARNING! Restoring will cause all your data to be deleted including all songs. Are you sure you want to continue?',
      ) === true
    ) {
      openFileSelector();
    }
  };

  const clearAllDataStageOne = async () => {
    setCurrentDeleteAllDataStage(1);
  };

  const clearAllDataStageTwo = async () => {
    if (deleteAllText.toLocaleLowerCase().trim() === 'delete all') {
      await clearAll();
      window.location.reload();
    }
  };

  return (
    <>
      <StyledCallout intent={Intent.PRIMARY}>
        Worship Assitant stores all songs, bible verses and
        application metadata on the browser. A copy of the database
        can be downloaded for safekeeping as a backup or used to
        transfer your data across to another computer.
      </StyledCallout>
      <StyledButtonGroup>
        {' '}
        <Button onClick={onExport}>Export</Button>
        <Button onClick={onRestoreClick}>Restore</Button>
        <Button onClick={clearAllDataStageOne}>Clear all data</Button>
        {isOpenFileLoading && <Spinner />}
      </StyledButtonGroup>

      {currentDeleteAllDataStage === 1 && (
        <StyledDeleteAllCard>
          Are you sure you really want to delete ALL data stored on
          Worship Assistant? You will lose all Songs, Services,
          Configuration, Themes etc. THIS OPERATION IS NOT REVERSABLE.
          To confirm you 'Delete all' in the box below.
          <br />
          <input
            className={Classes.INPUT}
            value={deleteAllText}
            onChange={(e) => setDeleteAllText(e.target.value)}
          />
          <br />
          <StyledButtonGroup>
            <Button
              onClick={() => clearAllDataStageTwo()}
              intent={Intent.DANGER}
            >
              Confirm Delete all
            </Button>
            <Button onClick={() => setCurrentDeleteAllDataStage(0)}>
              Go back
            </Button>
          </StyledButtonGroup>
        </StyledDeleteAllCard>
      )}

      <br />
      {exportCompleteMessage && <b>Export completed successfully</b>}
    </>
  );
};

export default BackupAndRestore;
