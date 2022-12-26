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
  apiKey: "AIzaSyB-EcBPXx3UdNDJIW5SF9GWEX0tnj2nDQU",
  authDomain: "dive-buddy-a0b62.firebaseapp.com",
  projectId: "dive-buddy-a0b62",
  storageBucket: "dive-buddy-a0b62.appspot.com",
  messagingSenderId: "591432718206",
  appId: "1:591432718206:web:74dc52f7838ecb94f2052f",
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
    const res = await createUserWithEmailAndPassword(
      auth,
      email,
      password,
      title
    );
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
