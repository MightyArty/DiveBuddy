import React, { useState } from "react";
import { useEffect, useRef } from "react";
import { db, auth } from "../firebase";
import { getDocs, collection, where, doc } from "firebase/firestore";
import { query } from "firebase/firestore";
import "./ShowDives.css";
import { useApiContext } from "../hooks/useApiContext";
import { useAuthContext } from "../hooks/useAuthContext";

export const FetchDivers = () => {
  const [data, setData] = useState([]);

  const { apiCall } = useApiContext();
  const { user } = useAuthContext();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { dive_data } = await apiCall("dives");
        let rDives = [];
        rDives.push({ ...dive_data });
        console.log(rDives);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  // useEffect(() => {
  //   const colRef = query(
  //     collection(db, "users"),
  //     where("email", "==", auth.currentUser.email)
  //   );
  //   getDocs(colRef).then((snapshot) => {
  //     let rDives = [];
  //     snapshot.docs.forEach((doc) => {
  //       // snap.val() is the dictionary with all your keys/values from the 'students-list' path
  //       rDives.push({ ...doc.data() });
  //     });
  //     console.log(rDives);
  //     let DivesOfThisUser = rDives[0].dives;
  //     setData(DivesOfThisUser); /// only the array full of dives of the current user
  //   });
  // }, []);

  return (
    <div className="main-DivesOfStudents">
      <table>
        <tr>
          <th>Confirmed</th>
          <th>name</th>
          <th>Date</th>
          <th>Site</th>
          <th>Dive Duration</th>
          <th>Depth</th>
          <th>Special Equipment</th>
          <th>Note</th>
        </tr>
        {data.map((data) => {
          return (
            <tr key={data._id}>
              <td>{data.confirmed}</td>
              <td>{data.name}</td>
              <td>{data.date}</td>
              <td>{data.site}</td>
              <td>{data.dive_duration}</td>
              <td>{data.depth}</td>
              <td>{data.equipment}</td>
              <td>{data.node}</td>
            </tr>
          );
        })}
      </table>
    </div>
  );
};
export default FetchDivers;
