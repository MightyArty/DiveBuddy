import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut,
} from "firebase/auth";
import {
  getFirestore,
  query,
  getDocs,
  collection,
  where,
  addDoc,
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCu6gHqfkOOiIo9KbNQEoIOfdy70YGuseg",
  authDomain: "buddydivet.firebaseapp.com",
  projectId: "buddydivet",
  storageBucket: "buddydivet.appspot.com",
  messagingSenderId: "27362223185",
  appId: "1:27362223185:web:30ffa0acd297d6d268c470"
};
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// function for the LOGIN
const loginWithEmailAndPassword = async (email, password, title) => {
  try {
    await signInWithEmailAndPassword(auth, email, password, title);
  } catch (err) {
    alert(err.message);
  }
};

// function for the REGISTER
const registerWithEmailAndPassword = async (
  email,
  password,
  title,
  name,
  ID
) => {
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password, title);
    const user = res.user;
    await addDoc(collection(db, "users"), {
      uid: user.uid,
      name,
      ID,
      title,
      authProvider: "local",
      email,
    });
  } catch (err) {
    alert(err.message);
  }
};

// function to password rest (OPTIONAL)
const sendPasswordReset = async (email) => {
  try {
    await sendPasswordResetEmail(auth, email);
    alert("Password reset link sent!");
  } catch (err) {
    alert(err.message);
  }
};

// function for LOGOUT
const logout = () => {
  signOut(auth);
};

export {
  auth,
  db,
  signInWithEmailAndPassword,
  loginWithEmailAndPassword,
  registerWithEmailAndPassword,
  sendPasswordReset,
  logout,
};
