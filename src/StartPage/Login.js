import React, { useEffect, useState } from "react";
import Title from "../Title/Title";
import { Link, useNavigate } from "react-router-dom";
import Select from "react-select";
import {
  auth,
  signInWithEmailAndPassword,
  loginWithEmailAndPassword,
} from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { collection, getFirestore, getDocs } from "firebase/firestore";

export const Login = (props) => {
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, loading, error] = useAuthState(auth);
  
  const [isValid, setIsValid] = useState(true);

  const navigate = useNavigate();

  const emailChangeHandler = (event) => {
    if (event.target.value.trim().length > 0) {
      setIsValid(true);
    }
    setEmail(event.target.value);
  };

  const passwordChangeHandler = (event) => {
    if (event.target.value.trim().length > 0) {
      setIsValid(true);
    }
    setPassword(event.target.value);
  };

  useEffect(() => {
    if (user) {
      const db = getFirestore();
      const colRef = collection(db, "users");
      getDocs(colRef).then((snapshot) => {
        let users = [];
        snapshot.docs.forEach((doc) => {
          var user_data = doc.data();
          var user_uid = user_data.uid;
          if (user_uid === user.uid) {
            navigate("/" + user_data.title.toLowerCase());
          }
        });
      });
    }
  }, [user, loading]);

  const handlerSubmit = (event) => {
    event.preventDefault();
    if (email.trim().length === 0 || password.trim().length === 0) {
      setIsValid(false);
      return;
    }
  };

  return (
    <div>
      <Title />
      <div className="auth-form-container">
        <h2>Login</h2>
        <form className="login-form" onSubmit={handlerSubmit}>
          <label htmlFor="email">Email</label>
          <input
            style={{
              borderColor: !isValid ? "red" : "#ccc",
              background: !isValid ? "salmon" : "transparent",
            }}
            autoFocus
            value={email}
            onChange={emailChangeHandler}
            type="email"
            placeholder="example@gmail.com"
            id="email"
            name="email"
          />
          <label htmlFor="password">Password</label>
          <input
            style={{
              borderColor: !isValid ? "red" : "#ccc",
              background: !isValid ? "salmon" : "transparent",
            }}
            value={password}
            onChange={passwordChangeHandler}
            type="password"
            placeholder="*********"
            id="password"
            name="password"
          />
          <button
            type="submit"
            onClick={() => loginWithEmailAndPassword(email, password)}
          >
            Log In
          </button>
        </form>
        <button
          className="link-btn"
          onClick={() => props.onFormSwitch("register")}
        >
          Don't have an account? Register here
        </button>
      </div>
    </div>
  );
};
