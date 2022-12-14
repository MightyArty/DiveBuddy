import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

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
      <div>
        <p>Welcome to your Dashboard, Instructor</p>
      </div>
    );
  }
};
export default Instructor_Dash;
