import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import Instructor_Dash from "./Instructor/Instructor_Dash";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Login } from "./StartPage/Login";
import { Chat } from "./Forum/Chat";
import Student_Dash from "./Student/Student_Dash";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route index element={<App />} />
        <Route path="login" element={<Login />} />
        <Route path="forum" element={<Chat />} />
        <Route path="instructor" element={<Instructor_Dash />} />
        <Route path="student" element={<Student_Dash />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
