 import { initializeApp, getApp, getApps } from 'firebase/app';
 import { getAuth } from 'firebase/auth';
 import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  //config firebase web app
  };



const app = getApps.length > 0 ? getApp() : initializeApp(firebaseConfig);

const auth = getAuth(app);
const storage = getStorage(app);

export {auth, storage};