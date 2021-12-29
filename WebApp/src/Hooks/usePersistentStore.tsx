// Ensures the user has approved the browser to persist data without it being cleared

import { useEffect, useState } from 'react';

// See https://web.dev/persistent-storage/ for details
export const usePersistentStore = () => {
  const [isApproved, setIsApproved] = useState(false);

  const checkIfApproved = async () => {
    // @ts-ignore
    if (navigator.storage && navigator.storage.persist) {
      const isPersisted = await navigator.storage.persisted();
      setIsApproved(isPersisted);
    }
  };

  useEffect(() => {
    checkIfApproved();
  }, []);

  const requestAccess = async () => {
    if (navigator.storage && navigator.storage.persist) {
      const isPersisted = await navigator.storage.persist();
      if (!isPersisted) {
        alert('An error occured, please try again later.');
      }
      console.log(`Persisted storage granted: ${isPersisted}`);
    }
    await checkIfApproved();
  };

  return { isApproved, requestAccess };
};
