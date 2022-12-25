import "./Schedule.css";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import format from "date-fns/format";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import getDay from "date-fns/getDay";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "react-datepicker/dist/react-datepicker.css";
import React, { useEffect, useState } from "react";
import { auth, db } from "../firebase";
import {
  addDoc,
  collection,
  doc,
  getDocs,
  getFirestore,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";

const Student_Schedule = () => {
  const [allEvents, setAllEvents] = useState();

  const locales = {
    "en-US": require("date-fns/locale/en-US"),
  };

  const localizer = dateFnsLocalizer({
    format,
    parse,
    startOfWeek,
    getDay,
    locales,
  });

  useEffect(() => {
    const fetchData = async () => {
      let tempData = [];
      // getting all docs from Schedule collection
      const querySnapshot = await getDocs(collection(db, "Schedule"));
      querySnapshot.forEach((doc) => {
        // going throwgh each doc to get tha values
        let docData = doc.data();
        // convert firebase timestap to valid date
        let start = new Date(docData.start.seconds * 1000);
        let end = new Date(docData.end.seconds * 1000);
        tempData.push({
          title: docData.title,
          start: start,
          end: end,
          id: doc.id,
        });
      });
      setAllEvents(tempData);
    };
    fetchData();
  }, []);

  return (
    <div className="main-schedule">
      <h1>Our Schedule</h1>
      <Calendar
        localizer={localizer}
        events={allEvents}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 500, margin: "50px" }}
      />
    </div>
  );
};

export default Student_Schedule;
