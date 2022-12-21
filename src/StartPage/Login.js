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

export const Login = (props) => {
  const [email, setEmail] = useState("");
  // const [title, setTitle] = useState("");
  const [password, setPassword] = useState("");
  const [user, loading, error] = useAuthState(auth);

  const [isValid, setIsValid] = useState(true);

  const navigate = useNavigate();

  const [authenticated, setAuthenticated] = useState(
    localStorage.getItem(localStorage.getItem("authenticated") || false)
  );

  // for testing, local values
  const users = [
    { email: "example@gmail.com", title: "Instructor", password: "test1234" },
    { email: "student@gmail.com", title: "Student", password: "test1234" },
  ];

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

  // const titleChangeHandler = (event) => {
  //   if (event?.value != null) {
  //     setIsValid(true);
  //   }
  //   setTitle(event.value);
  // };

  const options = [
    { value: "Instructor", label: "Instructor" },
    { value: "Student", label: "Student" },
  ];

  useEffect(() => {
    if (user) {
      navigate("/dashboard");
    }
    // if (user) {
    //   navigate("/student");
    // }
  }, [user, loading]);

  const handlerSubmit = (event) => {
    event.preventDefault();
    if (email.trim().length === 0 || password.trim().length === 0) {
      setIsValid(false);
      return;
    }
    // const account = users.find((user) => user.email === email);
    // if (account && account.password === password && account.title === title) {
    //   setAuthenticated(true);
    //   localStorage.setItem("authenticated", true);
    //   if (title === "Instructor") {
    //     navigate("/instructor");
    //   } else if (title === "Student") {
    //     navigate("/student");
    //   }
    // }
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
