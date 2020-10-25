import { db } from './indexDbGateway';

export function set(settings) {
  let tx = db.transaction(['settings'], 'readwrite');
  let store = tx.objectStore('settings');
  store.put(settings, 'settings');
  tx.oncomplete = function () {};
  tx.onerror = function (event) {
    alert('error storing note ' + event.target.errorCode);
  };
}

export function get() {
  return new Promise((resolve, reject) => {
    let tx = db.transaction(['settings'], 'readwrite');
    let store = tx.objectStore('settings');
    const objectStoreRequest = store.get('settings');

    tx.oncomplete = function (event) {
      resolve(objectStoreRequest.result);
    };
    tx.onerror = function (event) {
      reject(tx.error);
    };
  });
}

export async function getCurrentService() {
  const settings = await get();
  return settings.currentServiceId;
}

export async function setCurrentService(currentServiceId) {
  const settings = await get();
  const nSettings = {
    ...settings,
    currentServiceId: currentServiceId,
  };
  await set(nSettings);
}
