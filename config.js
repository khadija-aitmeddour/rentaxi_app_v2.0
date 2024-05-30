 import { initializeApp, getApp, getApps } from 'firebase/app';
 import { getAuth } from 'firebase/auth';
 import { getStorage } from 'firebase/storage';
import {messaging} from 'firebase/messaging';

 const firebaseConfig = {
  apiKey: "AIzaSyA3uheLUyf204-8TxUx8jKxHHGEdl1jOp8",
  authDomain: "rentaxi-backend.firebaseapp.com",
  projectId: "rentaxi-backend",
  storageBucket: "rentaxi-backend.appspot.com",
  messagingSenderId: "1001956018581",
  appId: "1:1001956018581:web:ca34723792a7c29f370e9c"
 };




const app = getApps.length > 0 ? getApp() : initializeApp(firebaseConfig);

const auth = getAuth(app);
const storage = getStorage(app);

export {auth, storage};