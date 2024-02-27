import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

//Functionality to add data to the jate database
export const putDb = async (content) => {
  const noteDb = await openDB('jate', 1);
  const tx = noteDb.transaction('jate', 'readwrite');
  const store = tx.objectStore('jate');
  const request = store.put({ id: 1, value: content});
  const result = await request;
  console.log('Data saved to the database', result);
};

//Functionality to get all data from jate databse and display it on screen
export const getDb = async () => {
  console.log("Get data from database")
  const noteDb = await openDB('jate', 1);
  const tx = noteDb.transaction('jate', 'readonly');
  const store = tx.objectStore('jate');
  const request = store.get(1);
  const result = await request;
  console.log('result.value', result);
  return result?.value;
};

initdb();
