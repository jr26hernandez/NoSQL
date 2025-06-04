import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBVNhZ9M49dsxwvstgyM0N0JMXAlW9Eh-0",
  authDomain: "crud-9cd5a.firebaseapp.com",
  projectId: "crud-9cd5a",
  storageBucket: "crud-9cd5a.appspot.com",
  messagingSenderId: "892830386856",
  appId: "1:892830386856:web:b8e310ae9efd23ac97909d"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default db;
