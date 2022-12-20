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
      <div className="main-instructor">
        <Title />
        <button className="neon-btn-instructor">Recent Dives</button>
        <button className="neon-btn-instructor">Schedule</button>
        <button className="neon-btn-instructor">Forum</button>
      </div>
    );
  }
};
export default Instructor_Dash;
