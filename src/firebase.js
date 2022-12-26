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
  apiKey: "AIzaSyA6kaOF7uBtcM-Vy-bjXuBZp8yRrgCW_JI",
  authDomain: "divebuddy-7b623.firebaseapp.com",
  projectId: "divebuddy-7b623",
  storageBucket: "divebuddy-7b623.appspot.com",
  messagingSenderId: "931491620385",
  appId: "1:931491620385:web:bbb3282b408ba88080e560",
  measurementId: "G-SXGV67PK5V"
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
      dives: [],
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
