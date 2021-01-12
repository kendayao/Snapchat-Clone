import firebase from 'firebase';

var firebaseConfig = {
    apiKey: "AIzaSyCa0YKz7OOl3-cxvN38obJV1a8gvWwOdtI",
    authDomain: "snapchat-clone-5d40f.firebaseapp.com",
    projectId: "snapchat-clone-5d40f",
    storageBucket: "snapchat-clone-5d40f.appspot.com",
    messagingSenderId: "730776092103",
    appId: "1:730776092103:web:354fbb8fb4b560947cade2",
    measurementId: "G-TW6FT4B6WZ"
  };
  // Initialize Firebase

  const firebaseApp = firebase.initializeApp(firebaseConfig)
  const db = firebaseApp.firestore();
  const auth = firebase.auth();
  const storage = firebase.storage();
  const provider = new firebase.auth.GoogleAuthProvider();

  export { db, auth, storage, provider }