import { db } from './indexDbGateway';

export function add(schedule) {
  let tx = db.transaction(['schedule'], 'readwrite');
  let store = tx.objectStore('schedule');
  store.add(schedule, schedule.id); // todo (Sdv) key for searching?  songContent.properties.title
  tx.oncomplete = function () {};
}

export function getAll() {
  return new Promise((resolve, reject) => {
    // // Start a database transaction and get the notes object store
    let tx = db.transaction(['schedule'], 'readwrite');
    let store = tx.objectStore('schedule');
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

export async function set(schedule) {
  let tx = db.transaction(['schedule'], 'readwrite');
  let store = tx.objectStore('schedule');
  store.put(schedule, schedule.id);
  tx.oncomplete = function () {};
  tx.onerror = function (event) {
    alert('error storing note ' + event.target.errorCode);
  };
}

export function getLatest() {
  // getAll().
}
