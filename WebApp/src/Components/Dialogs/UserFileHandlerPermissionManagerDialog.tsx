import React, { useState, useEffect, useContext } from 'react';
import { Context } from '../../App';
import { Button, Card, H5, H3 } from '@blueprintjs/core';
import { Dialog, Classes } from '@blueprintjs/core';
import styled, { css } from 'styled-components/macro';
import { DateInput } from '@blueprintjs/datetime';
import { scheduleRepo } from '../../Storage/scheduleRepository';
import { settingsRepo } from '../../Storage/settingsRepository';
import NewId from '../../Helpers/newId';
import useEventHandler from '../../Events/Handlers/useEventHandler';
import NewScheduleCreatedEvent from '../../Events/Domain/newScheduleCreatedEvent';
import { empty as emptyResource } from '../../Interfaces/Schedule';
import getUrlFromFileHandle from '../../Helpers/getUrlFromFileHandle';
import LoadScheduleEvent from '../../Events/Domain/loadScheduleEvent';
import AddActiveVideoEvent from '../../Events/Domain/addActiveVideoEvent';
import loadScheduleEvent from '../../Events/Domain/loadScheduleEvent';
import IState from '../../Interfaces/State';
import { userFileHandlerRepo } from '../../Storage/userFileHandlerRepository';

const StyledDateInput = styled(DateInput)`
  margin-left: 30px;
`;

const StyledFooterButton = styled(Button)`
  margin-left: 5px;
  margin-right: 5px;
`;

const StyledActionButton = styled(Button)`
  margin-left: 30px;
`;

const StyledAddButton = styled(Button)`
  margin-top: 33px;
  width: 130px;
`;

const SpacerTr = styled.tr`
  height: 20px;
`;
const StyledInput = styled.input``;

const StyledNewButton = styled(Button)`
  padding: 14px 20px;
  margin-bottom: 30px;
  margin-top: 7px;
`;

const StyledTd = styled.td`
  text-align: end;
`;

const StyledTableScroller = styled.div`
  height: 300px;
  overflow-y: auto;
  margin-top: 30px;
`;

const StyledRow = styled.tr`
  margin-top: 10px;
`;

const StyledTable = styled.table`
  width: 100%;
  padding-left: 10px;
  padding-right: 0px;

  th {
    width: 100px;
    text-align: left;
    height: 25px;
    vertical-align: top;
  }
`;

interface IFileHandleMetadata {
  name: string;
  status: string;
  resourceId: string;
  fileHandle: any;
}

export default ({ setOpen }) => {
  const [state] = useContext(Context);
  const [fileHandlesMetadata, setFileHandlesMetadata] = useState<
    IFileHandleMetadata[]
  >([]);
  const [showConfirm, setShowConfirm] = useState<string>();
  const [raiseEvent] = useEventHandler();

  useEffect(() => {
    const init = async () => {
      let localFileHandles: IFileHandleMetadata[] = [];
      const resources = (state as IState).currentSchedule.resources.filter(
        (r) => r.resourceType === 'VIDEO',
      );

      for (const res in resources) {
        const r = resources[res];
        const fileHandle = await userFileHandlerRepo.get(r.id);

        if (fileHandle) {
          const isGranted =
            (await fileHandle.queryPermission({
              writable: false,
            })) === 'granted';
          const obj = {
            name: fileHandle?.name || 'Unknown',
            status: isGranted === true ? 'SUCCESS' : 'PENDING',
            resourceId: r.id,
            fileHandle: fileHandle,
          } as IFileHandleMetadata;
          localFileHandles.push(obj);
        }
      }

      const hasFileThatNeedGranting = localFileHandles.some(
        (fh) => fh.status !== 'SUCCESS',
      );

      if (!hasFileThatNeedGranting) {
        onClose();
        return;
      }

      setFileHandlesMetadata(localFileHandles);
    };
    init();
    // await schedule.resources.forEach(async (r) => {
    //   if (r.resourceType !== 'VIDEO') return;

    // });
  }, []);

  const onClose = () => {
    if (fileHandlesMetadata?.some((fh) => fh.status !== 'SUCCESS')) {
      const res = window.confirm(
        'Closing without granting access may cause some video and image content not to load. Are you sure you want to continue?',
      );

      if (res === false) {
        return;
      }
    }

    setOpen(false);
  };

  const grantAll = async () => {
    let updatedFileHandleMetadata = fileHandlesMetadata;

    for (const metadataKey in fileHandlesMetadata) {
      const metadata = fileHandlesMetadata[metadataKey];
      updatedFileHandleMetadata = await attemptGrantPermission(
        metadata,
        updatedFileHandleMetadata,
      );

      if (
        !updatedFileHandleMetadata?.some(
          (h) => h.status !== 'SUCCESS',
        )
      ) {
        setOpen(false);
      }

      setFileHandlesMetadata(updatedFileHandleMetadata);
    }
  };

  const attemptGrantPermission = async (
    fileHandleMetadata: IFileHandleMetadata,
    fileHandlesMetadata: IFileHandleMetadata[],
  ) => {
    const url = await getUrlFromFileHandle(
      fileHandleMetadata.fileHandle,
    );

    if (url) {
      raiseEvent(
        new AddActiveVideoEvent(
          false,
          fileHandleMetadata.resourceId,
          url,
        ),
      );

      const updated = fileHandlesMetadata
        .filter((h) => h.name !== fileHandleMetadata.name)
        .concat({ ...fileHandleMetadata, status: 'SUCCESS' });

      // todo (sdv) there is a bug if the setFileHandleMetadata is done here so responsibility is lifted to caller
      return updated;
    }

    return fileHandlesMetadata;
  };

  const onGrantFileClick = async (fileHandle) => {
    const updated = await attemptGrantPermission(
      fileHandle,
      fileHandlesMetadata,
    );

    if (!updated?.some((h) => h.status !== 'SUCCESS')) {
      setOpen(false);
    }

    setFileHandlesMetadata(updated);
  };

  return (
    <>
      <Dialog
        className={Classes.DARK}
        isOpen
        title="Welcome"
        isCloseButtonShown={true}
        onClose={onClose}
      >
        <div className={Classes.DIALOG_BODY}>
          <Card>
            The schedule uses videos and images from your file system.
            When you reopen a schedule you will need to grant access
            to these files again.
          </Card>
          <StyledTableScroller>
            <StyledTable>
              <tr></tr>
              {fileHandlesMetadata &&
                fileHandlesMetadata
                  .sort((fh, afh) => (fh.name < afh.name ? 1 : -1))
                  .map((fileHandle: IFileHandleMetadata) => (
                    <>
                      <StyledRow>
                        <H5>{fileHandle.name}</H5>
                        <StyledTd>
                          <StyledActionButton
                            intent={
                              fileHandle.status === 'PENDING'
                                ? 'none'
                                : 'success'
                            }
                            onBlur={() => setShowConfirm('')}
                            onClick={() =>
                              onGrantFileClick(fileHandle)
                            }
                            icon={
                              fileHandle.status === 'PENDING'
                                ? 'warning-sign'
                                : 'tick'
                            }
                          ></StyledActionButton>
                        </StyledTd>
                      </StyledRow>
                      <SpacerTr />
                    </>
                  ))}
            </StyledTable>
          </StyledTableScroller>

          <div className={Classes.DIALOG_FOOTER_ACTIONS}>
            <StyledFooterButton onClick={onClose}>
              Close
            </StyledFooterButton>
            {fileHandlesMetadata?.some(
              (h) => h.status !== 'SUCCESS',
            ) && (
              <StyledFooterButton
                onClick={grantAll}
                icon="confirm"
                intent="success"
              >
                Grant access to all
              </StyledFooterButton>
            )}
          </div>
        </div>
      </Dialog>
    </>
  );
};
