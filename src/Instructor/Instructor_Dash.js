import { useEffect, useState } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import "./Instructor_Dash.css";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db, logout } from "../firebase";
import { query, collection, getDocs, where } from "firebase/firestore";
import { async } from "@firebase/util";
import { useAuthContext } from "../hooks/useAuthContext";

const Instructor_Dash = () => {
  // const [user, loading, error] = useAuthState(auth);
  const [name, setName] = useState("");
  const [title, setTitle] = useState("");
  const navigate = useNavigate();
  const { user, dispatch } = useAuthContext();

  // const fetchUserName = async () => {
  //   try {
  //     const q = query(collection(db, "users"), where("uid", "==", user?.uid));
  //     const doc = await getDocs(q);
  //     const data = doc.docs[0].data();
  //     setName(data.name);
  //     setTitle(data.title);
  //   } catch (err) {
  //     alert("An error occured while fetching user data");
  //   }
  // };

  // useEffect(() => {
  //   if (!user) return navigate("/");
  //   fetchUserName();
  // }, [user, loading]);

  const move_to_forum = () => {
    navigate("/forum");
  };

  const move_to_schedule = () => {
    navigate("/schedule");
  };

  const move_to_recent_dives = () => {
    navigate("/recent_dives");
  };

  const logout = () => {
    dispatch({ type: "LOGOUT", payload: null });
    navigate("/"); // go to login
  };

  return (
    <div className="main-instructor">
      <div className="title-instructor">
        <h1>Welcome Instructor</h1>
      </div>
      <button className="neon-btn-instructor" onClick={move_to_recent_dives}>
        Students dive log
      </button>
      <button className="neon-btn-instructor" onClick={move_to_schedule}>
        Schedule
      </button>
      <button className="neon-btn-instructor" onClick={move_to_forum}>
        Forum
      </button>
      <button className="logout-btn" onClick={logout}>
        Logout
      </button>
    </div>
  );
};
export default Instructor_Dash;
