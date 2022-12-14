import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

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
      <div>
        <p>Welcome to your Dashboard, Student</p>
      </div>
    );
  }
};
export default Student_Dash;
