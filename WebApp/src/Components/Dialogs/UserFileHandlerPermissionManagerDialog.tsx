import { useState, useEffect, useContext } from 'react';
import { Context } from '../../Common/Store/Store';
import { Button, Card, H5 } from '@blueprintjs/core';
import { Dialog, Classes } from '@blueprintjs/core';
import styled from 'styled-components/macro';
import useEventHandler from '../../Events/Handlers/useEventHandler';
import getUrlFromFileHandle from '../../Helpers/getUrlFromFileHandle';
import AddActiveVideoEvent from '../../Events/Domain/addActiveVideoEvent';
import IState from '../../Interfaces/State';
import { userFileHandlerRepo } from '../../Storage/userFileHandlerRepository';
import addActiveImageEvent from 'Events/Domain/addActiveImageEvent';
import { ResourceType } from 'Interfaces/ResourceReference';

// todo (Sdv)

const StyledFooterButton = styled(Button)`
  margin-left: 5px;
  margin-right: 5px;
`;

const StyledActionButton = styled(Button)`
  margin-left: 30px;
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
  resourceType: 'VIDEO' | 'IMAGE';
}

const UserFileHandlerPermissionManagerDialog = ({ setOpen }) => {
  const [state] = useContext(Context);
  const [fileHandlesMetadata, setFileHandlesMetadata] = useState<
    IFileHandleMetadata[]
  >([]);
  const [showConfirm, setShowConfirm] = useState<string>();
  const [raiseEvent] = useEventHandler();

  useEffect(() => {
    const init = async () => {
      let localFileHandles: IFileHandleMetadata[] = [];
      const resources = (
        state as IState
      ).currentSchedule.resources.filter(
        (r) =>
          r.resourceType === 'VIDEO' || r.resourceType === 'IMAGE',
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
            resourceType: r.resourceType,
          } as IFileHandleMetadata;
          localFileHandles.push(obj);

          if (isGranted && r.resourceType === 'VIDEO') {
            const url = await getUrlFromFileHandle(fileHandle);
            raiseEvent(new AddActiveVideoEvent(false, r.id, url));
          }

          if (isGranted && r.resourceType === 'IMAGE') {
            const url = await getUrlFromFileHandle(fileHandle);
            raiseEvent(new addActiveImageEvent(false, r.id, url));
          }
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
      if (fileHandleMetadata.resourceType === 'VIDEO') {
        raiseEvent(
          new AddActiveVideoEvent(
            false,
            fileHandleMetadata.resourceId,
            url,
          ),
        );
      } else if (fileHandleMetadata.resourceType === 'IMAGE') {
        raiseEvent(
          new addActiveImageEvent(
            false,
            fileHandleMetadata.resourceId,
            url,
          ),
        );
      }

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

  // Do not show anything if it is busy loading the files
  // This makes the component more than just a dialog though, maybe it's name should be updated to reflect that
  if (!fileHandlesMetadata || fileHandlesMetadata.length === 0) {
    return null;
  }

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
            When you re Worship Studio you will need to grant access
            to these files again.
            <br />
            <small>
              These files are stored on your computer, we need
              temporary access in order to display it
            </small>
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

export default UserFileHandlerPermissionManagerDialog;
