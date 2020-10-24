import { db } from './indexDbGateway';

export default function addSong(songContent) {
  const xmlContent = `
    <song xmlns="http://openlyrics.info/namespace/2009/song"
      version="0.9">
  <properties>
    <titles>
      <title>${songContent.properties.title}</title>
    </titles>
  </properties>
  <lyrics>
    <verse name="v1">
      <lines>
      ${songContent.lyrics}
      </lines>
    </verse>
  </lyrics>
</song>
    `;
  console.log('asdasda');
  // Start a database transaction and get the notes object store
  let tx = db.transaction(['songs'], 'readwrite');
  let store = tx.objectStore('songs');
  // Put the sticky note into the object store
  let note = { lyrics: xmlContent, timestamp: Date.now() };
  store.add(note);
  // Wait for the database transaction to complete
  tx.oncomplete = function () {
    console.log('stored note!');
  };
  tx.onerror = function (event) {
    alert('error storing note ' + event.target.errorCode);
  };
}
