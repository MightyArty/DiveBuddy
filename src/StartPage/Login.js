import React, { useState } from "react";
import Title from "../Title/Title";
import { useNavigate } from "react-router-dom";
import Select from "react-select";

export const Login = (props) => {
  const [email, setEmail] = useState("");
  const [title, setTitle] = useState("");
  const [password, setPassword] = useState("");
  const [isValid, setIsValid] = useState(true);

  const navigate = useNavigate();

  const [authenticated, setAuthenticated] = useState(
    localStorage.getItem(localStorage.getItem("authenticated") || false)
  );

  const users = [
    { email: "example@gmail.com", title: "Instructor", password: "test1234" },
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

  const titleChangeHandler = (event) => {
    if (event?.value != null) {
      setIsValid(true);
    }
    setTitle(event.value);
  };

  const options = [
    { value: "Instructor", label: "Instructor" },
    { value: "Student", label: "Student" },
  ];

  const handlerSubmit = (event) => {
    event.preventDefault();
    if (
      email.trim().length === 0 ||
      password.trim().length === 0 ||
      title === null
    ) {
      setIsValid(false);
      return;
    }
    const account = users.find((user) => user.email === email);
    if (account && account.password === password && account.title === title) {
      setAuthenticated(true);
      localStorage.setItem("authenticated", true);
      navigate("/dashboard");
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
          <label htmlFor="title">Title</label>
          <Select
            options={options}
            name="title"
            id="title"
            onChange={titleChangeHandler}
          />
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
