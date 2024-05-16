import { initializeApp } from "firebase/app";
import { getStorage} from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDBOOdqwNSlYPjGx42NbJZH3qHWjFzVmwA",
  authDomain: "book-dash-1ec8c.firebaseapp.com",
  projectId: "book-dash-1ec8c",
  storageBucket: "book-dash-1ec8c.appspot.com",
  messagingSenderId: "532379370826",
  appId: "1:532379370826:web:2c3e442dbbe1591ed4adb3",
  measurementId: "G-W3533LXWQG"
};


const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

export {storage};