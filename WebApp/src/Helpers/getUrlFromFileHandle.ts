import { userFileHandlerRepo } from '../Storage/userFileHandlerRepository';

export default async (fileHandle) => {
  if ((await verifyPermission(fileHandle, true)) === false) {
    console.error(
      `User did not grant permission to '${fileHandle.name}'`,
    );
    return;
  }

  const file = await fileHandle.getFile();
  let blob = new Blob([file], { type: 'video/mp4' });
  return URL.createObjectURL(blob);
};

async function verifyPermission(fileHandle, withWrite) {
  const opts = {} as any;
  if (withWrite) {
    opts.writable = false;
    // For Chrome 86 and later...
    opts.mode = 'read';
  }
  // Check if we already have permission, if so, return true.
  if ((await fileHandle.queryPermission(opts)) === 'granted') {
    return true;
  }
  // Request permission to the file, if the user grants permission, return true.
  if ((await fileHandle.requestPermission(opts)) === 'granted') {
    return true;
  }
  // The user did nt grant permission, return false.
  return false;
}
