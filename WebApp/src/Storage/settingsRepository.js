import { db } from './indexDbGateway';

export function set(settings) {
  // Start a database transaction and get the notes object store
  let tx = db.transaction(['settings'], 'readwrite');
  let store = tx.objectStore('settings');
  // Put the sticky note into the object store
  store.put(settings, 'settings');
  // Wait for the database transaction to complete
  tx.oncomplete = function () {
    console.log('stored note!');
  };
  tx.onerror = function (event) {
    alert('error storing note ' + event.target.errorCode);
  };
}

export function get() {
  return new Promise((resolve, reject) => {
    // Start a database transaction and get the notes object store
    let tx = db.transaction(['settings'], 'readwrite');
    let store = tx.objectStore('settings');
    // Put the sticky note into the object store
    const objectStoreRequest = store.get('settings');
    // Wait for the database transaction to complete

    tx.oncomplete = function (event) {
      resolve(objectStoreRequest.result);
    };
    tx.onerror = function (event) {
      reject(tx.error);
    };
  });
}
