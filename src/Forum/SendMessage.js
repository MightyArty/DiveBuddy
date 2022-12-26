import React, { useState } from "react";
import { auth, db } from "../firebase";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import "./Forum.css";

const style = {
  form: `h-14 w-full max-w-[728px]  flex text-xl absolute bottom-0`,
  input: `w-full text-xl p-3 bg-gray-900 text-white outline-none border-none`,
  button: `w-[20%] bg-red-500`,
};

const SendMessage = () => {
  const [input, setInput] = useState("");
  /// await beacuse we are talking to the firebase server but its gonna tale a littele bit time,
  const send_func = (event) => {
    event.preventDefault(); ///  ומה שנכתב נעלם HTMLלמנוע את ההתנהגות הדיפולטיבית בשליחה טופס שהיא סימן שאלה בראש הדף כמו ב
    const { uid, displayName } = auth.currentUser;
    addDoc(collection(db, "messages"), {
      text: input,
      name: displayName,
      uid,
      timestamp: serverTimestamp(),
    });
  };
  //By setting an onChange event handler, the handler function will get called whenever the text in the input field changes.
  ///  !לפני השליחה עצמה אלא רק בעצם הכתיבה
  // onChange is a listiner for the gray text window - setInput(event.target.value)} will work every time we write in the gray window
  // when we press a button its fire a submit event . the onSubmit  defines a listiner function which work every time an event has fired
  return (
    <form onSubmit={send_func} className="form-forum">
      Enter your message
      <input
        className={style.input}
        onChange={(event) => setInput(event.target.value)} ///change ths state of input to the value of what a user writen
        value={input}
        type="text"
        placeholder="Message"
      />
      <button className="button-forum">Send</button>
    </form>
  );
};

export default SendMessage;
