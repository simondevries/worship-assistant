import { hasNativeFileSystem } from './../FileSystem/fileSystemTools';
import { useState, useEffect } from 'react';

export const useBrowserSupported = () => {
  const [isSupported, setIsSupported] = useState<any>(null);

  useEffect(() => {
    const fileSystemSupported = hasNativeFileSystem();

    var raw = navigator.userAgent.match(/Chrom(e|ium)\/([0-9]+)\./);
    const chromeVersion = raw ? parseInt(raw[2], 10) : false;

    const isSupported = fileSystemSupported && chromeVersion > 50;
    console.log(fileSystemSupported);
    setIsSupported(isSupported);
  }, []);

  return [isSupported];
};
