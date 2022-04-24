/**
 * Export all data from an IndexedDB database
 *
 * @param {IDBDatabase} idbDatabase The database to export from
 * @return {Promise<string>}
 */
export function exportToJson(idbDatabase) {
  return new Promise((resolve, reject) => {
    const exportObject = {}
    if (idbDatabase.objectStoreNames.length === 0) {
      resolve(JSON.stringify(exportObject))
    } else {
      const transaction = idbDatabase.transaction(
        idbDatabase.objectStoreNames,
        'readonly'
      )

      transaction.addEventListener('error', reject)

      for (const storeName of idbDatabase.objectStoreNames) {
        const allObjects = []
        transaction
          .objectStore(storeName)
          .openCursor()
          .addEventListener('success', event => {
            const cursor = event.target.result
            if (cursor) {
              // Cursor holds value, put it into store data
              allObjects.push(cursor.value)
              cursor.continue()
            } else {
              // No more values, store is done
              exportObject[storeName] = allObjects

              // Last store was handled
              if (
                idbDatabase.objectStoreNames.length ===
                Object.keys(exportObject).length
              ) {
                resolve(JSON.stringify(exportObject))
              }
            }
          })
      }
    }
  })
}

/**
 * Import data from JSON into an IndexedDB database.
 * This does not delete any existing data from the database, so keys may clash.
 *
 * @param {IDBDatabase} idbDatabase Database to import into
 * @param {string}      json        Data to import, one key per object store
 * @return {Promise<void>}
 */
export function importFromJson(idbDatabase, json) {
  return new Promise((resolve, reject) => {
    const transaction = idbDatabase.transaction(
      idbDatabase.objectStoreNames,
      'readwrite'
    )
    transaction.addEventListener('error', reject)

    var importObject = JSON.parse(json)
    let count = 0
    const cb = (storeName, importObject) => {
      if (count === importObject[storeName].length) {
        // Added all objects for this store
        delete importObject[storeName]
        if (Object.keys(importObject).length === 0) {
          // Added all object stores
          resolve()
        }
      }
    }
    for (const storeName of idbDatabase.objectStoreNames) {
      count = 0
      for (const toAdd of importObject[storeName]) {
        const request = transaction.objectStore(storeName).add(toAdd)
        count++
        request.addEventListener('success', cb(storeName, importObject))
      }
    }
  })
}

/**
 * Clear a database
 *
 * @param {IDBDatabase} idbDatabase The database to delete all data from
 * @return {Promise<void>}
 */
export function clearDatabase(idbDatabase) {
  return new Promise((resolve, reject) => {
    const transaction = idbDatabase.transaction(
      idbDatabase.objectStoreNames,
      'readwrite'
    )
    transaction.addEventListener('error', reject)

    let count = 0
    const cb = () => {
      if (count === idbDatabase.objectStoreNames.length) {
        // Cleared all object stores
        resolve()
      }
    }
    for (const storeName of idbDatabase.objectStoreNames) {
      count++
      transaction
        .objectStore(storeName)
        .clear()
        .addEventListener('success', cb)
    }
  })
}