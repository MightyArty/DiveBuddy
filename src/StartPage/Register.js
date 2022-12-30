import React, { useState, useEffect } from "react";
import Title from "../Title/Title";
import { Link, useNavigate } from "react-router-dom";
import Select from "react-select";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, registerWithEmailAndPassword } from "../firebase";

export const Register = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [ID, setID] = useState("");
  const [title, setTitle] = useState("");
  const [user, loading, error] = useAuthState(auth);
  const navigate = useNavigate();

  const [email_validation, setEmail_validation] = useState(true);
  const [password_validation, setPassword_validation] = useState(true);
  const [name_validation, setName_validation] = useState(true);
  const [ID_validation, setID_validation] = useState(true);

  const nameChangeHandler = (event) => {
    if (event.target.value.trim().length > 0) {
      setName_validation(true);
    }
    setName(event.target.value);
  };

  const emailChangeHandler = (event) => {
    if (event.target.value.trim().length > 0) {
      setEmail_validation(true);
    }
    setEmail(event.target.value);
  };

  const passwordChangeHandler = (event) => {
    if (event.target.value.trim().length > 0) {
      setPassword_validation(true);
    }
    setPassword(event.target.value);
  };

  const idChangeHandler = (event) => {
    if (event.target.value.trim().length > 0) {
      setID_validation(true);
    }
    setID(event.target.value);
  };

  const titleChangeHandler = (event) => {
    setTitle(event.value);
  };

  const options = [
    { value: "Instructor", label: "Instructor" },
    { value: "Student", label: "Student" },
  ];

  const register = () => {
    if (!name) alert("Please enter name");
    registerWithEmailAndPassword(email, password, title, name, ID);
  };

  useEffect(() => {
    if (user && title === "Instructor") {
      navigate("/instructor");
    } else if (user && title === "Student") {
      navigate("student");
    }
  }, [user, loading]);

  const handlerSubmit = (event) => {
    event.preventDefault();
    if (email.trim().length === 0 || !email.includes("@")) {
      setEmail_validation(false);
      return;
    }
    if (name.trim().length === 0) {
      setName_validation(false);
      alert("Enter your name!");
      return;
    }
    if (password.trim().length === 0) {
      setPassword_validation(false);
      alert("Enter valid password!");
      return;
    }
    if (ID.trim().length === 0) {
      setID_validation(false);
      alert("Enter ID!");
      return;
    }
    if (title === null) {
      alert("Please choose your title!");
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
              borderColor: !name_validation ? "red" : "#ccc",
              background: !name_validation ? "salmon" : "transparent",
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
              borderColor: !email_validation ? "red" : "#ccc",
              background: !email_validation ? "salmon" : "transparent",
            }}
            value={email}
            onChange={emailChangeHandler}
            type="email"
            placeholder="example@gmail.com"
            id="email"
            name="email"
          />
          <label htmlFor="id">ID</label>
          <input
            style={{
              borderColor: !ID_validation ? "red" : "#ccc",
              background: !ID_validation ? "salmon" : "transparent",
            }}
            value={ID}
            onChange={idChangeHandler}
            name="id"
            id="id"
            placeholder="your id"
          />
          <label htmlFor="title">Title</label>
          <Select
            options={options}
            name="title"
            id="title"
            onChange={titleChangeHandler}
          />
          <label htmlFor="password">Password</label>
          <input
            style={{
              borderColor: !password_validation ? "red" : "#ccc",
              background: !password_validation ? "salmon" : "transparent",
            }}
            value={password}
            type="password"
            onChange={passwordChangeHandler}
            placeholder="*******"
            id="password"
            name="password"
          />
          <button type="submit" onClick={register}>
            Register
          </button>
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
