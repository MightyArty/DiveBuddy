import "./Dashboard.css";
import { useEffect, useState } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db, logout } from "./firebase";
import { query, collection, getDocs, where } from "firebase/firestore";

const Dashboard = () => {
  const [user, loading, error] = useAuthState(auth);
  const [name, setName] = useState("");
  const [title, setTitle] = useState("");
  const navigate = useNavigate();
  
  const fetchUserName = async () => {
    try {
      const q = query(collection(db, "users"), where("uid", "==", user?.uid));
      const doc = await getDocs(q);
      const data = doc.docs[0].data();
      setName(data.name);
      setTitle(data.title);
    } catch (err) {
      alert("An error occured while fetching user data");
    }
  };

  useEffect(() => {
    if (!user) return navigate("/");
    fetchUserName();
  }, [user, loading]);

  const move_to_instructor = () => {
    navigate("/instructor");
  };

  const move_to_student = () => {
    navigate("/student");
  };

  return (
    <div className="main-dashboard">
      <div className="title-dashboard">
        <h1>Please choose your title to proceed</h1>
      </div>
      <button
        className="neon-btn-dashboard"
        type="submit"
        onClick={move_to_instructor}
      >
        Instructor
      </button>
      <button
        className="neon-btn-dashboard"
        type="submit"
        onClick={move_to_student}
      >
        Student
      </button>
      <button className="logout-btn" onClick={logout}>
        Logout
      </button>
    </div>
  );
};

export default Dashboard;
