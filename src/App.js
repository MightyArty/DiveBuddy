import "./App.css";
import { Login } from "./Login";
import { Register } from "./Register";
import React, { useState } from "react";
import Title from "./Title";

function App() {
  const [currentForm, setCurrentForm] = useState("login");

  const toggleForm = (forName) => {
    setCurrentForm(forName);
  };

  return (
    <div className="App">
      {currentForm === "login" ? (
        <Login onFormSwitch={toggleForm} />
      ) : (
        <Register onFormSwitch={toggleForm} />
      )}
    </div>
  );
}

export default App;
