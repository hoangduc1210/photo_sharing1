// import { initializeApp } from "firebase/app";
// import {getStorage} from 'firebase/storage'

// const firebaseConfig = {
//   apiKey: "AIzaSyBt3MAkx72RfMwqu2aI-zyH-6GFPzDHCFQ",
//   authDomain: "photo-sharing-aa8ef.firebaseapp.com",
//   projectId: "photo-sharing-aa8ef",
//   storageBucket: "photo-sharing-aa8ef.appspot.com",
//   messagingSenderId: "774667601400",
//   appId: "1:774667601400:web:5a7ace92588be208e9420d",
//   measurementId: "G-EV3D8WETD0"
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// export const storage = getStorage(app)



// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getStorage} from 'firebase/storage'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCE4o07poIgeYD4orNl9c_LkRLeHQBC6ps",
  authDomain: "baif6-9a541.firebaseapp.com",
  databaseURL: "https://baif6-9a541-default-rtdb.firebaseio.com",
  projectId: "baif6-9a541",
  storageBucket: "baif6-9a541.appspot.com",
  messagingSenderId: "921735506998",
  appId: "1:921735506998:web:6928be8fda04561441bc97"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app)