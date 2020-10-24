import { db } from './indexDbGateway';

export function add(songContent) {
  // Start a database transaction and get the notes object store
  let tx = db.transaction(['songs'], 'readwrite');
  let store = tx.objectStore('songs');
  // Put the sticky note into the object store
  store.add(songContent); // todo (Sdv) key for searching?  songContent.properties.title
  // Wait for the database transaction to complete
  tx.oncomplete = function () {};
}

export function getAll() {
  return new Promise((resolve, reject) => {
    // // Start a database transaction and get the notes object store
    let tx = db.transaction(['songs'], 'readwrite');
    let store = tx.objectStore('songs');
    // // Put the sticky note into the object store
    const objectStoreRequest = store.getAll();
    // Wait for the database transaction to complete

    tx.oncomplete = function (event) {
      resolve(objectStoreRequest.result);
    };
    tx.onerror = function (event) {
      reject(tx.error);
    };
  });
}
