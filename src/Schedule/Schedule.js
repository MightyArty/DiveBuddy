import "./Schedule.css";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import format from "date-fns/format";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import getDay from "date-fns/getDay";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "react-datepicker/dist/react-datepicker.css";
import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import { auth, db } from "../firebase";
import {
  addDoc,
  collection,
  doc,
  getFirestore,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";

// need to add from FIREBASE
const events = [
  {
    title: "Morning Diving",
    start: new Date(2022, 11, 6, 8),
    end: new Date(2022, 11, 6, 10),
  },
  {
    title: "Group Meeting",
    start: new Date(2022, 11, 23),
    end: new Date(2022, 11, 25),
  },
  {
    title: "Closed due to bad sea",
    allDay: true,
    start: new Date(2022, 11, 15),
    end: new Date(2022, 11, 17),
  },
];

const Weekly_Update = () => {
  const [newEvent, setNewEvent] = useState({ title: "", start: "", end: "" });
  const [allEvents, setAllEvents] = useState(events);

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

  // useEffect(() => {
  //   const q = query(collection(db, "Schedule"));
  //   onSnapshot(q, (snapshot) => {
  //     let temp = [];
  //     snapshot.forEach((doc) => {
  //       temp.push(...doc.data())
  //     })
  //     setNewEvent(snapshot.docs), setAllEvents([...allEvents, newEvent]);
  //   }),
  //     [];
  // });

  useEffect(() => {
    const db = getFirestore();
    const q = query(collection(db, "Schedule"));
    onSnapshot(q, (snapshot) => {
      let temp = [];
      snapshot.forEach((doc) => {
        temp.push(...doc.data());
      });
      setNewEvent(temp);
    });
  });

  function handleAddEvent() {
    for (let i = 0; i < allEvents.length; i++) {
      const d1 = new Date(allEvents[i].start);
      const d2 = new Date(newEvent.start);
      const d3 = new Date(allEvents[i].end);
      const d4 = new Date(allEvents.end);

      if ((d1 <= d2 && d2 <= d3) || (d1 <= d4 && d4 <= d3)) {
        alert("CLASH");
        break;
      }
    }
    addDoc(collection(db, "Schedule"), {
      title: newEvent.title,
      start: newEvent.start,
      end: newEvent.end,
    });
    setAllEvents([...allEvents, newEvent]);
  }

  return (
    <div className="main-schedule">
      <h1>Our Schedule</h1>
      <h2>Add New Event</h2>
      <div>
        <input
          type="text"
          placeholder="Add Title"
          style={{ width: "20%", marginRight: "10px" }}
          value={newEvent.title}
          onChange={(event) =>
            setNewEvent({ ...newEvent, title: event.target.value })
          }
        />
        <DatePicker
          placeholderText="Start Date"
          style={{ marginRight: "10px" }}
          selected={newEvent.start}
          onChange={(start) => setNewEvent({ ...newEvent, start })}
        />
        <DatePicker
          placeholderText="End Date"
          selected={newEvent.start}
          onChange={(end) => setNewEvent({ ...newEvent, end })}
        />
        <button style={{ marginTop: "10px" }} onClick={handleAddEvent}>
          Add Event
        </button>
      </div>
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

export default Weekly_Update;
