import {
  verifyPermission,
  getFileHandle,
  getNewFileHandle,
  writeFile,
} from './fs-helpers';
import { scheduleRepo } from '../Storage/scheduleRepository';
import { userFileHandlerRepo } from '../Storage/userFileHandlerRepository';
import newId from '../Helpers/newId';

// eslint-disable-next-line no-redeclare
export const fileSystemApp = {
  fileSystemAppName: 'Text Editor',
  file: {
    handle: null,
    name: null,
    isModified: false,
  },
  options: {
    captureTabs: true,
    fontSize: 14,
    monoSpace: false,
    wordWrap: true,
  },
  hasNativeFS:
    'chooseFileSystemEntries' in window ||
    'showOpenFilePicker' in window,
  isMac: navigator.userAgent.includes('Mac OS X'),
};

/**
 * Creates an empty notepad with no details in it.
 */
fileSystemApp.newFile = () => {
  //   if (!fileSystemApp.confirmDiscard()) {
  //     return;
  //   }
  fileSystemApp.setText();
  fileSystemApp.setFile();
  fileSystemApp.setModified(false);
  fileSystemApp.setFocus(true);
};

/**
 * Opens a file for reading.
 *
 * @param {FileSystemFileHandle} fileHandle File handle to read from.
 */
fileSystemApp.openFile = async (fileHandle) => {
  //   if (!fileSystemApp.confirmDiscard()) {
  //     return;
  //   }

  // If the Native File System API is not supported, use the legacy file apis.
  if (!fileSystemApp.hasNativeFS) {
    const file = await fileSystemApp.getFileLegacy();
    if (file) {
      fileSystemApp.readFile(file);
    }
    return;
  }

  // If a fileHandle is provided, verify we have permission to read/write it,
  // otherwise, show the file open prompt and allow the user to select the file.
  if (fileHandle) {
    if ((await verifyPermission(fileHandle, true)) === false) {
      console.error(
        `User did not grant permission to '${fileHandle.name}'`,
      );
      return;
    }
  } else {
    try {
      fileHandle = await getFileHandle();
    } catch (ex) {
      if (ex.name === 'AbortError') {
        return;
      }

      const msg = 'An error occured trying to open the file1.';
      console.error(msg, ex);
      alert(msg);
    }
  }

  if (!fileHandle) {
    return;
  }

  return fileHandle;
};

/**
 * Read the file from disk.
 *
 *  @param {File} file File to read from.
 *  @param {FileSystemFileHandle} fileHandle File handle to read from.
 */
fileSystemApp.readFile = async (file, fileHandle) => {
  // const file = await fileHandle.getFile();

  try {
    let blob = new Blob([file], { type: 'video/mp4' });

    console.log('FILE IS ', fileHandle);

    await userFileHandlerRepo.set(fileHandle, newId());

    return URL.createObjectURL(blob);

    // console.log('This is the blob url', uzz);

    // const videoPlayer = document.getElementById('videoPlayer');
    // videoPlayer.src = uzz;
    // fileSystemApp.setText(res);
    // fileSystemApp.setFile(fileHandle || file.name);
    // fileSystemApp.setModified(false);
    // fileSystemApp.setFocus(true);
  } catch (ex) {
    const msg = `An error occured reading ${fileSystemApp.fileName}`;
    console.error(msg, ex);
    alert(msg);
  }
};

/**
 * Saves a file to disk.
 */
fileSystemApp.saveFile = async () => {
  try {
    if (!fileSystemApp.file.handle) {
      return await fileSystemApp.saveFileAs();
    }

    await writeFile(
      fileSystemApp.file.handle,
      fileSystemApp.getText(),
    );
    fileSystemApp.setModified(false);
  } catch (ex) {
    const msg = 'Unable to save file';
    console.error(msg, ex);
    alert(msg);
  }
  fileSystemApp.setFocus();
};

/**
 * fileSystemApp.js:

 * Saves a new file to disk.
 */
fileSystemApp.saveFileAs = async () => {
  if (!fileSystemApp.hasNativeFS) {
    fileSystemApp.saveAsLegacy(
      fileSystemApp.file.name,
      fileSystemApp.getText(),
    );
    fileSystemApp.setFocus();
    return;
  }

  let fileHandle;
  try {
    fileHandle = await getNewFileHandle();
  } catch (ex) {
    if (ex.name === 'AbortError') {
      return;
    }

    const msg = 'An error occured trying to open the file.';
    console.error(msg, ex);
    alert(msg);
    return;
  }
  try {
    await writeFile(fileHandle, fileSystemApp.getText());
    fileSystemApp.setFile(fileHandle);
    fileSystemApp.setModified(false);
  } catch (ex) {
    const msg = 'Unable to save file.';
    console.error(msg, ex);
    alert(msg);

    return;
  }
  fileSystemApp.setFocus();
};

/**
 * Attempts to close the window
 */
fileSystemApp.quitfileSystemApp = () => {
  //   if (!fileSystemApp.confirmDiscard()) {
  //     return;
  //   }

  window.close();
};
