import React, { useState } from "react";
import Title from "../Title";
import Select from "react-select";

export const Register = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [ID, setID] = useState("");
  const [title, setTitle] = useState("");
  const [isValid, setIsValid] = useState(true);

  const nameChangeHandler = (event) => {
    if (event.target.value.trim().length > 0) {
      setIsValid(true);
    }
    setName(event.target.value);
  };

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

  const idChangeHandler = (event) => {
    if (event.target.value.trim().length > 0) {
      setIsValid(true);
    }
    setID(event.target.value);
  };

  const titleChangeHandler = (event) => {
    if (event.target.value.trim().length > 0) {
      setIsValid(true);
    }
    setTitle(event.target.value);
  };

  const options = [
    { value: "Instructor", label: "Instructor" },
    { value: "Student", label: "Student" },
  ];

  const handlerSubmit = (event) => {
    event.preventDefault();
    if (
      name.trim().length === 0 ||
      email.trim().length === 0 ||
      password.trim().length === 0 ||
      ID.trim().length === 0 ||
      title.trim().length === 0
    ) {
      setIsValid(false);
      return;
    }
  };

  return (
    <div>
      <Title />
      <div className="auth-form-container">
        <h2>Register</h2>
        <form className="register-form" onSubmit={handlerSubmit}>
          <label htmlFor="name">Full name</label>
          <input
            style={{
              borderColor: !isValid ? "red" : "#ccc",
              background: !isValid ? "salmon" : "transparent",
            }}
            autoFocus
            value={name}
            onChange={nameChangeHandler}
            name="name"
            id="name"
            placeholder="Israel Israeli"
          />
          <label htmlFor="email">Email</label>
          <input
            style={{
              borderColor: !isValid ? "red" : "#ccc",
              background: !isValid ? "salmon" : "transparent",
            }}
            value={email}
            onChange={emailChangeHandler}
            type="email"
            placeholder="example@gmail.com"
            id="email"
            name="email"
          />
          <label htmlFor="name">ID</label>
          <input
            style={{
              borderColor: !isValid ? "red" : "#ccc",
              background: !isValid ? "salmon" : "transparent",
            }}
            value={ID}
            onChange={idChangeHandler}
            name="id"
            id="id"
            placeholder="your id"
          />
          <label htmlFor="name">Title</label>
          <Select options={options} />
          <label htmlFor="password">Password</label>
          <input
            style={{
              borderColor: !isValid ? "red" : "#ccc",
              background: !isValid ? "salmon" : "transparent",
            }}
            value={password}
            type="password"
            onChange={passwordChangeHandler}
            placeholder="*******"
            id="password"
            name="password"
          />
          <button type="submit">Register</button>
        </form>
        <button
          className="link-btn"
          onClick={() => props.onFormSwitch("login")}
        >
          Already have an account? Login here
        </button>
      </div>
    </div>
  );
};
