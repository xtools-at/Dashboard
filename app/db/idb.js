import idb from 'idb';

const DB_NAME = 'APP';
const VERSION = 1;

export const idbPromise = idb.open(DB_NAME, VERSION, upgradeDB => {
  upgradeDB.createObjectStore('keyval');
});

export const idbRef = {
  get(key) {
    return idbPromise.then(db => {
      return db.transaction('keyval')
        .objectStore('keyval').get(key);
    });
  },
  set(key, val) {
    return idbPromise.then(db => {
      const tx = db.transaction('keyval', 'readwrite');
      tx.objectStore('keyval').put(val, key);
      return tx.complete;
    });
  },
  delete(key) {
    return idbPromise.then(db => {
      const tx = db.transaction('keyval', 'readwrite');
      tx.objectStore('keyval').delete(key);
      return tx.complete;
    });
  },
  clear() {
    return idbPromise.then(db => {
      const tx = db.transaction('keyval', 'readwrite');
      tx.objectStore('keyval').clear(key);
      return tx.complete;
    });
  },
  keys() {
    return idbPromise.then(db => {
      const tx = db.transaction('keyval');
      const keys = [];
      const store = tx.objectStore('keyval');

      // This would be store.getAllKeys(), but it isn't supported by Edge or Safari.
      // openKeyCursor isn't supported by Safari, so we fall back
      (store.iterateKeyCursor || store.iterateCursor).call(store, cursor => {
        if (!cursor) return;
        keys.push(cursor.key);
        cursor.continue();
      });

      return tx.complete.then(() => keys);
    });
  }
};

export default idbRef;