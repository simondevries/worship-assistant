import { db } from './indexDbGateway';

export function add(schedule) {
  // Start a database transaction and get the notes object store
  let tx = db.transaction(['schedule'], 'readwrite');
  let store = tx.objectStore('schedule');
  // Put the sticky note into the object store
  store.add(schedule); // todo (Sdv) key for searching?  songContent.properties.title
  // Wait for the database transaction to complete
  tx.oncomplete = function () {};
}

export function set(schedules) {
  // Start a database transaction and get the notes object store
  let tx = db.transaction(['schedule'], 'readwrite');
  let store = tx.objectStore('schedule');
  // Put the sticky note into the object store
  store.put(schedules, 'schedule');
  // Wait for the database transaction to complete
  tx.oncomplete = function () {};
  tx.onerror = function (event) {
    alert('error storing schedule ' + event.target.errorCode);
  };
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

export function getLatest() {
  // getAll().
}
