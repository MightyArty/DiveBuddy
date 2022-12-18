import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import "./Student_Dash.css";
import Title from "./student_title";

const Student_Dash = () => {
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
        <button className="neon-btn">Recent Dives</button>
        <button className="neon-btn">Schedule</button>
        <button className="neon-btn">Forum</button>
      </div>
    );
  }
};
export default Student_Dash;
