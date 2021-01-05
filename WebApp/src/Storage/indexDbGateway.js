export let db;

let dbReq = indexedDB.open('myDatabase', 2);

dbReq.onupgradeneeded = function (event) {
  // Set the db variable to our database so we can use it!
  db = event.target.result;
  // Object stores in databases are where data are stored.

  if (event.oldVersion === 0 || event.oldVersion === 1) {
    db.createObjectStore('userFileHandler', { autoIncrement: true });
  }
  if (event.oldVersion === 0) {
    db.createObjectStore('settings', { autoIncrement: true });
    db.createObjectStore('schedule', { autoIncrement: true });
    db.createObjectStore('songs', { autoIncrement: true });
  }
};

dbReq.onsuccess = function (event) {
  db = event.target.result;
};
dbReq.onerror = function (event) {
  alert('error opening database ' + event.target.errorCode);
};
