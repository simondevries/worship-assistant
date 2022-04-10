import { FilePickerType, verifyFileHandlePermission } from 'FileSystem/fileSystemTools';
import { userFileHandlerRepo } from '../Storage/userFileHandlerRepository';

const getUrlFromFileHandle = async (fileHandle) => {
  if ((await verifyFileHandlePermission(fileHandle, false)) === false) {
    console.error(
      `User did not grant permission to '${fileHandle.name}'`,
    );
    return;
  }

  const file = await fileHandle.getFile();
  let blob = new Blob([file], { type: 'video/mp4' }); // Not sure if file type actually matters here?
  return URL.createObjectURL(blob);
};

export default getUrlFromFileHandle;