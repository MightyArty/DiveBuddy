import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import "./Instructor_Dash.css";
import Title from "./instructor_title";

const Instructor_Dash = () => {
  const [authenticated, setauthenticated] = useState(null);
  useEffect(() => {
    const loggedInUser = localStorage.getItem("authenticated");
    if (loggedInUser) {
      setauthenticated(loggedInUser);
    }
  }, []);

  if (!authenticated) {
    // REDIRECT TO LOGIN PAGE
    return;
  } else {
    return (
      <div className="main">
        <Title />
      </div>
    );
  }
};
export default Instructor_Dash;
