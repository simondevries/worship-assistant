import { db } from './indexDbGateway';

export function initTransaction (state) {
    const tx = db.transaction([state.objectStoreType], state.permissions);
    const store = tx.objectStore(state.objectStoreType);
    return { tx, store };
}


// add -er to each verb (behaviour) following a compositional pattern: https://ui.dev/javascript-inheritance-vs-composition/
export const getByKeyer = (state) =>({
    getByKey(itemKey) {
        return new Promise((resolve, reject) => {
            const { tx, store } = initTransaction(state);
            const objectStoreRequest = store.get(itemKey);
            tx.oncomplete = function (event) {
              resolve(objectStoreRequest.result);
            };
            tx.onerror = function (event) {
              reject(tx.error);
            };
          });
    }
})

export const getAller = (state) => ({
    getAll() {
        return new Promise((resolve, reject) => {
            const { tx, store } = initTransaction(state);
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
})

export const deleter = (state) => ({
    delete(itemKeys) { // itemKey or IDBKeyRange type for a range of keys
        return new Promise((resolve, reject) => {
            const { tx, store } = initTransaction(state);

            const objectStoreRequest = store.delete(itemKeys);
            tx.oncomplete = function (event) {
              resolve(objectStoreRequest.result);
            };
            tx.onerror = function (event) {
              reject(tx.error);
            };
          });
    }
})

export const adder = (state) => ({
    add(item, itemKey=null) {
        return new Promise((resolve, reject) => {
            const { tx, store } = initTransaction(state);
            let objectStoreRequest;
            if (itemKey) {
              objectStoreRequest = store.add(item, itemKey);
            } else {
              objectStoreRequest = store.add(item);
            };
            tx.oncomplete = function (event) {
              resolve(objectStoreRequest.result);
            };
            tx.onerror = function (event) {
              reject(tx.error);
            };
          });
    }
})

export const setter = (state) => ({
  set(item, itemKey=null) {
      return new Promise((resolve, reject) => {
          const { tx, store } = initTransaction(state);
          let objectStoreRequest;
          if (itemKey) {
            objectStoreRequest = store.put(item, itemKey);
          } else {
            objectStoreRequest = store.put(item);
          }
          tx.oncomplete = function (event) {
            resolve(objectStoreRequest.result);
          };
          tx.onerror = function (event) {
            reject(tx.error);
          };
        });
  }
})
