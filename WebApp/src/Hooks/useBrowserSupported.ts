import { useState, useEffect } from 'react';
import { fileSystemApp } from '../FileSystem/fileSystemTools';

export const useBrowserSupported = () => {
  const [isSupported, setIsSupported] = useState<any>(null);

  useEffect(() => {
    const fileSystemSupported = fileSystemApp.hasNativeFS;

    var raw = navigator.userAgent.match(/Chrom(e|ium)\/([0-9]+)\./);

    const chromeVersion = raw ? parseInt(raw[2], 10) : false;

    const isSupported = fileSystemSupported && chromeVersion > 50;

    setIsSupported(isSupported);
  }, []);

  return [isSupported];
};
