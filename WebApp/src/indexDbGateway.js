let db;

let dbReq = indexedDB.open('myDatabase', 1);

dbReq.onupgradeneeded = function (event) {
  // Set the db variable to our database so we can use it!
  db = event.target.result;

  // Create an object store named notes. Object stores
  // in databases are where data are stored.
  let notes = db.createObjectStore('songs', { autoIncrement: true });
};
dbReq.onsuccess = function (event) {
  db = event.target.result;

  // Add some sticky notes
  addSong(db, 'Sloths are awesome!');
  addSong(db, 'Order more hibiscus tea');
  addSong(
    db,
    'And Green Sheen shampoo, the best for sloth fur algae grooming!',
  );
};
dbReq.onerror = function (event) {
  alert('error opening database ' + event.target.errorCode);
};

export function addSongLyrics(lyrics) {
  addSong(db, lyrics);
}

export function addSong(db, lyrics) {
  // Start a database transaction and get the notes object store
  let tx = db.transaction(['songs'], 'readwrite');
  let store = tx.objectStore('songs');
  // Put the sticky note into the object store
  let note = { lyrics: lyrics, timestamp: Date.now() };
  store.add(note);
  // Wait for the database transaction to complete
  tx.oncomplete = function () {
    console.log('stored note!');
  };
  tx.onerror = function (event) {
    alert('error storing note ' + event.target.errorCode);
  };
}
