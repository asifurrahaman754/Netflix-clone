import firebase from "firebase";
const firebaseConfig = {
  apiKey: "AIzaSyDJ_KDnXdXFy5-IOTZBKGicRbdcfMkhfY4",
  authDomain: "netflix-clone-10b89.firebaseapp.com",
  projectId: "netflix-clone-10b89",
  storageBucket: "netflix-clone-10b89.appspot.com",
  messagingSenderId: "385251620585",
  appId: "1:385251620585:web:205882f015e8cdd8ea2278",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const auth = firebaseApp.auth();

export { auth };
