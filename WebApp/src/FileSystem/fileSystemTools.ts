
import { userFileHandlerRepo } from '../Storage/userFileHandlerRepository';
import newId from '../Helpers/newId';

export enum FilePickerType {
  Image,
  Video
}

export const hasNativeFileSystem = () => {
  return window?.chooseFileSystemEntries ||
    window?.showOpenFilePicker;
}

export const openFile = async (type: FilePickerType) => {

  if (!hasNativeFileSystem()) {
    alert('This feature is not supported in your browser. Please upgrade your browser to the lastest version of Chrome.');
    throw Error('Not supported on device.');
  }

  let options;
  if (type === FilePickerType.Image) {
    options = imagePickerOptions;
  } else {
    options = videoPickerOptions
  }
  let fileHandle;
  try {
    fileHandle = window.showOpenFilePicker(options).then((handles) => handles[0]);
  } catch (ex: any) {
    if (ex.name === 'AbortError') {
      return null;
    }

    throw Error('An error occured trying to open the file.')
  }

  return fileHandle;

}

export const readFile = async (file, type, fileHandle) => {
  let blob = new Blob([file], { type: type });

  await userFileHandlerRepo.set(fileHandle, newId());

  return URL.createObjectURL(blob);
};

export const verifyFileHandlePermission = async (fileHandle, expectWritePermission) => {
  const options: QueryPermissionsOptions = {};
  if (expectWritePermission) {
    options.writable = true;
    options.mode = 'readwrite';
  }

  if ((await fileHandle.queryPermission(options)) === PERMISSION_GRANTED_STRING) {
    return true;
  }

  if ((await fileHandle.requestPermission(options)) === PERMISSION_GRANTED_STRING) {
    return true;
  }

  return false;
}

const PERMISSION_GRANTED_STRING = 'granted'

const imagePickerOptions = {
  types: [
    {
      description: 'Images',
      accept: {
        'image/*': ['.png', '.gif', '.jpeg', '.jpg']
      }
    },
  ],
  excludeAcceptAllOption: false,
  multiple: false
};

const videoPickerOptions = {
  types: [
    {
      description: 'Videos',
      accept: {
        'video/*': ['.mp4'] // Other types/?
      }
    },
  ],
  excludeAcceptAllOption: true,
  multiple: false
};


declare global {
  interface Window { showOpenFilePicker: any; showSaveFilePicker: any, chooseFileSystemEntries: any }
}

interface QueryPermissionsOptions {
  writable?: boolean, mode?: string
}