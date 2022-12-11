import React, { useState } from "react";
import Title from "../Title/Title";

export const Login = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isValid, setIsValid] = useState(true);

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
          <button type="submit">Log In</button>
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
